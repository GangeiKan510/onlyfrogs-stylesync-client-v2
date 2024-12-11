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

export const deleteFit = async (fitId: string) => {
  try {
    const response = await postWithFirebaseJwt("/web/fits/delete-fit", {
      fitId,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error deleting fit: ${errorText}`);
    }

    const closets = await response.json();
    return closets;
  } catch (error) {
    console.error("Failed to delete fit", error);
    throw error;
  }
};
