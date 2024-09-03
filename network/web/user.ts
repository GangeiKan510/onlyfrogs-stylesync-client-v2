import { CreateUserData } from "@/utils/types/CreateUser";
import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";

export const getMe = async ({ email }: { email: string }) => {
  try {
    const response = await postWithFirebaseJwt("/web/users/get-me", {
      email: email,
    });
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const me = await response.json();
    return me;
  } catch (error) {
    console.error("Failed to get user", error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserData) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/create-user",
      userData,
    );

    if (!response.ok) {
      throw new Error(`Error creating user: ${response.statusText}`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Failed to create user", error);
    throw error;
  }
};
