import { CreateCloset } from "@/utils/types/CreateCloset";
import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";
import { GetClosetsByUserId } from "@/utils/types/GetClosetsByUserId";

export const createCloset = async (closetData: CreateCloset) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/closet/create-closet",
      closetData,
    );

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

export const getClosetsbyUserId = async (data: GetClosetsByUserId) => {
  try {
    const response = await postWithFirebaseJwt("/web/closet/my-closets", data);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching closets: ${errorText}`);
    }

    const closets = await response.json();
    return closets;
  } catch (error) {
    console.error("Failed to fetch user closets", error);
    throw error;
  }
};
