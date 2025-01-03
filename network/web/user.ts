import { CreateUserData } from "@/utils/types/CreateUser";
import {
  UpdatePersonalInformationData,
  UpdateUserBodyType,
  UpdateUserData,
  UpdateUserName,
  UpdateUserPreferencesAndBudgetData,
  UpdateUserSkinToneDetailsData,
} from "@/utils/types/UpdateUser";
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
    console.log("GET ME", me);
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

export const updatePersonalInformation = async (
  userData: UpdatePersonalInformationData
) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-personal-information",
      userData
    );

    if (!response.ok) {
      throw new Error(
        `Error updating personal information: ${response.statusText}`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update personal information", error);
    throw error;
  }
};

export const updateBodyType = async (userData: UpdateUserBodyType) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-body-type",
      userData
    );

    if (!response.ok) {
      throw new Error(
        `Error updating personal information: ${response.statusText}`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update personal information", error);
    throw error;
  }
};

export const uploadUserProfileImage = async (formData: FormData) => {
  try {
    const response = await uploadWithFirebaseJwt(
      "/web/images/upload-profile-picture",
      formData
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error uploading profile image: ${errorText}`);
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to upload profile image", error);
    throw error;
  }
};

export const updateConsiderSkinTone = async ({
  userId,
  considerSkinTone,
}: {
  userId: string;
  considerSkinTone: boolean;
}) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-consider-skin-tone",
      {
        id: userId,
        consider_skin_tone: considerSkinTone,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error updating consider skin tone: ${response.statusText}`
      );
    }

    const updatedSettings = await response.json();
    return updatedSettings;
  } catch (error) {
    console.error("Failed to update consider skin tone", error);
    throw error;
  }
};

export const updatePrioritizePreferences = async ({
  userId,
  prioritizePreferences,
}: {
  userId: string;
  prioritizePreferences: boolean;
}) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-prioritize-preferences",
      {
        id: userId,
        prioritize_preferences: prioritizePreferences,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error updating prioritize preferences: ${response.statusText}`
      );
    }

    const updatedSettings = await response.json();
    return updatedSettings;
  } catch (error) {
    console.error("Failed to update prioritize preferences", error);
    throw error;
  }
};

export const updateUserSkinToneDetails = async (
  userData: UpdateUserSkinToneDetailsData
) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-skin-tone-analysis",
      userData
    );

    if (!response.ok) {
      throw new Error(
        `Error updating skin tone details: ${response.statusText}`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update skin tone details", error);
    throw error;
  }
};

export const updateUserPreferences = async (
  userData: UpdateUserPreferencesAndBudgetData
) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/users/update-preferences",
      userData
    );

    if (!response.ok) {
      throw new Error(
        `Error updating preferences and budget: ${response.statusText}`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update preferences and budget", error);
    throw error;
  }
};
