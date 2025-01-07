import {
  postWithFirebaseJwt,
  uploadWithFirebaseJwt,
} from "../firebase/requests-with-firebase";

export const createFit = async (formData: FormData) => {
  try {
    console.log("Passing to endpoint", formData);
    const response = await uploadWithFirebaseJwt(
      "/web/fits/create-fit",
      formData
    );

    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating fit: ${errorText}`);
    }

    const newFit = await response.json();
    return newFit;
  } catch (error) {
    console.error("Failed to create fit", error);
    throw error;
  }
};

export const renameFit = async (fitId: string, newName: string) => {
  try {
    const response = await postWithFirebaseJwt("/web/fits/rename-fit", {
      fitId,
      newName,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error rename fit: ${errorText}`);
    }

    const renamedFitDetails = await response.json();
    return renamedFitDetails;
  } catch (error) {
    console.error("Failed to rename fit", error);
    throw error;
  }
};

export const deleteFit = async (fitId: string) => {
  try {
    const response = await postWithFirebaseJwt("/web/fits/delete-fit", {
      fitId,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error deleting fit: ${errorText}`);
    }

    const deletedFit = await response.json();
    return deletedFit;
  } catch (error) {
    console.error("Failed to delete fit", error);
    throw error;
  }
};

export const completeOutfit = async (
  userId: string,
  clothingIds: string[] | []
) => {
  try {
    const response = await postWithFirebaseJwt("/web/fits/complete-outfit", {
      userId,
      clothingIds,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error completing outfit: ${errorText}`);
    }

    const suggestedOutfit = await response.json();
    return suggestedOutfit;
  } catch (error) {
    console.error("Failed to complete outfit", error);
    throw error;
  }
};
