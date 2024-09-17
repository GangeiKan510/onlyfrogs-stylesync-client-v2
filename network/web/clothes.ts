import { uploadWithFirebaseJwt } from "../firebase/requests-with-firebase";

export const uploadClothing = async (formData: FormData) => {
  try {
    const response = await uploadWithFirebaseJwt(
      "/web/images/upload",
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
