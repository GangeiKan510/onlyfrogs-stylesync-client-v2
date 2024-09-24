import { UpdateClothingData } from "@/utils/types/UpdateClothingType";
import {
  postWithFirebaseJwt,
  uploadWithFirebaseJwt,
} from "../firebase/requests-with-firebase";

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

export const updateClothing = async (clothingData: UpdateClothingData) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/clothes/update-clothing",
      clothingData
    );

    if (!response.ok) {
      throw new Error(`Error updating clothing: ${response.statusText}`);
    }

    const updatedClothing = await response.json();
    return updatedClothing;
  } catch (error) {
    console.error("Failed to update clothing", error);
    throw error;
  }
};
