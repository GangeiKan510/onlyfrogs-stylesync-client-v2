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

type UserDetails = {
  birth_date: string | null;
  budget_preferences: object;
  email: string;
  favorite_color: string | null;
  first_name: string;
  gender: string | null;
  height: number | null;
  id: string;
  last_name: string;
  serial: number;
  skin_tone_classification: string | null;
  style_preferences: string[];
  tokens: number;
  closets: Closet[];
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

  const refetchMe = useCallback(async () => {
    if (auth.currentUser?.email) {
      try {
        const userInfo = await getMe({ email: auth.currentUser.email });
        updateUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  }, [updateUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userInfo = await getMe({ email: firebaseUser.email as string });
          updateUser(userInfo);
        } catch (error) {
          console.error("Error fetching user info:", error);
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
