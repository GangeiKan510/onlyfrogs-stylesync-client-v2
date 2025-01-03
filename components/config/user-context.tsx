/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { getMe } from "@/network/web/user";
import { Notification } from "@/app/(tabs)/notifications";
import { FitsType } from "@/utils/types/FitType";

type Closet = {
  id: string;
  name: string;
  description: string;
  serial: number;
  user_id: string;
  clothes: Clothes[];
};

type Clothes = {
  pattern: null;
  material: null;
  occasion: never[];
  season: never[];
  color: string | string[];
  brand: string | string[];
  name: string;
  id: string;
  serial: number;
  image_url: string;
  user_id: string;
  closet_id: string;
  category: {
    name: string | null;
    type: string | null;
  };
  tags: string[];
  worn: any;
};

type PromptSettings = {
  id: string;
  user_id: string;
  consider_skin_tone: boolean;
  prioritize_preferences: boolean;
  createdAt: string;
  updatedAt: string;
};

type ChatSession = {
  id: string;
  created_at: string;
  user_id: string;
  messages: { id: string; role: string; content: string; created_at: string }[];
};

type Token = {
  id: string;
  amount: number;
  created_at: string;
  updated_at: string;
  user_id: string;
};

type UserDetails = {
  birth_date: string | null;
  body_type: string | null;
  budget_min: number | null;
  budget_max: number | null;
  chat_session: ChatSession | null;
  closets: Closet[];
  clothes: Clothes[];
  email: string;
  favorite_colors: string[];
  first_name: string;
  fits: FitsType[];
  gender: "Male" | "Female" | "Non-Binary" | "Rather Not Say" | null;
  height: number | null;
  id: string;
  last_name: string;
  notifications: Notification[];
  preferred_brands: string[];
  preferred_styles: string[];
  profile_url: string | null;
  prompt_settings: PromptSettings;
  role: string | null;
  season: string | null;
  serial: number;
  skin_tone_classification: string | null;
  skin_tone_complements: string[];
  style_preferences: string[];
  sub_season: string | null;
  tokens: Token[];
  weight: string | null;
};
interface UserContextProps {
  user: UserDetails | null;
  updateUser: (userData: UserDetails | null) => void;
  refetchMe: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDetails | null>(null);

  const updateUser = useCallback((userData: UserDetails | null) => {
    setUser(userData);
  }, []);

  const retryFetchUser = async (email: string, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const userInfo = await getMe({ email });
        if (userInfo) {
          updateUser(userInfo);
          return;
        }
      } catch (error) {
        console.error(`Error fetching user info, attempt ${i + 1}:`, error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    throw new Error("Failed to fetch user after retries");
  };

  const refetchMe = useCallback(async () => {
    if (auth.currentUser?.email) {
      try {
        await auth.currentUser.reload();

        const firebaseUser = auth.currentUser;
        console.log("Updated Firebase User:", firebaseUser);

        await retryFetchUser(firebaseUser.email as string);
      } catch (error) {
        console.error("Error refreshing user details:", error);
      }
    }
  }, [updateUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await retryFetchUser(firebaseUser.email as string);
        } catch (error) {
          console.error("Error fetching user info after retries:", error);
        }
      } else {
        updateUser(null);
      }
    });

    return () => unsubscribe();
  }, [updateUser]);

  return (
    <UserContext.Provider value={{ user, updateUser, refetchMe }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
