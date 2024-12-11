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

export const updateFit = async (fitId: string, newName: string) => {
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
