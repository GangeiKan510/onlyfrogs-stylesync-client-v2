import { UpdateClothingData } from "@/utils/types/UpdateClothingType";
import {
  postWithFirebaseJwt,
  uploadWithFirebaseJwt,
} from "../firebase/requests-with-firebase";
import { UploadClothingWithImageLink } from "@/utils/types/ClothingType";

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

export const uploadWithImageLink = async (
  imageDetails: UploadClothingWithImageLink
) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/images/upload-image-url",
      imageDetails
    );

    if (!response.ok) {
      throw new Error(`Error uploading clothing: ${response.statusText}`);
    }

    const uploadedClothing = await response.json();
    return uploadedClothing;
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
