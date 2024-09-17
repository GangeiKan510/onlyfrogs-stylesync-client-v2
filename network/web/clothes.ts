import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";

export const uploadClothing = async (image: FormData) => {
  try {
    const response = await postWithFirebaseJwt("/web/images/upload", {
      file: image,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating closet: ${errorText}`);
    }

    const newCloset = await response.json();
    return newCloset;
  } catch (error) {
    console.error("Failed to create closet", error);
    throw error;
  }
};
