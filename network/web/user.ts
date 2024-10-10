import { CreateUserData } from "@/utils/types/CreateUser";
import { UpdateUserData, UpdateUserName } from "@/utils/types/UpdateUser";
import {
  postWithFirebaseJwt,
  uploadWithFirebaseJwt,
} from "../firebase/requests-with-firebase";

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
      userData
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

export const analyzeUserSkinTone = async (formData: FormData) => {
  try {
    const response = await uploadWithFirebaseJwt(
      "/web/images/analyze-skin-tone",
      formData
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error uploading clothing: ${errorText}`);
    }

    const newClothing = await response.json();
    return newClothing;
  } catch (error) {
    console.error("Failed to upload clothing", error);
    throw error;
  }
};

export const updateUser = async (userData: UpdateUserData) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-user",
      userData
    );

    if (!response.ok) {
      throw new Error(`Error updating user: ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user", error);
    throw error;
  }
};

export const updateUserName = async (userData: UpdateUserName) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-name",
      userData
    );

    if (!response.ok) {
      throw new Error(`Error updating user name: ${response.statusText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user name", error);
    throw error;
  }
};
