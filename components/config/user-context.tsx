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

type Closet = {
  id: string;
  name: string;
  description: string;
  serial: number;
  user_id: string;
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

type UserDetails = {
  birth_date: string | null;
  budget_preferences: object;
  email: string;
  favorite_color: string | null;
  first_name: string;
  gender: "Male" | "Female" | "Non-Binary" | "Rather Not Say" | null;
  height: number | null;
  id: string;
  last_name: string;
  serial: number;
  skin_tone_classification: string | null;
  style_preferences: string[];
  tokens: number;
  closets: Closet[];
  clothes: Clothes[];
  weight: string;
  body_type: string;
  profile_url: string;
  consider_skin_tone: boolean;
  prioritize_preferences: boolean;
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
          const {
            consider_skin_tone = false,
            prioritize_preferences = false,
            ...rest
          } = userInfo;

          updateUser({
            ...rest,
            consider_skin_tone,
            prioritize_preferences,
          });
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
        await retryFetchUser(auth.currentUser.email);
      } catch (error) {
        console.error("Error fetching user info after retries:", error);
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
