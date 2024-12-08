import { CreateCloset } from "@/utils/types/CreateCloset";
import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";
import { GetClosetsByUserId } from "@/utils/types/GetClosetsByUserId";
import { UpdateCloset } from "@/utils/types/UpdateCloset";

export const createCloset = async (closetData: CreateCloset) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/closet/create-closet",
      closetData
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

export const updateCloset = async (data: UpdateCloset) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/closet/update-closet",
      data
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating closet: ${errorText}`);
    }

    const closets = await response.json();
    return closets;
  } catch (error) {
    console.error("Failed to update closet", error);
    throw error;
  }
};

export const deleteCloset = async (closetId: string) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/closet/delete-closet",
      closetId
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error deleting closet: ${errorText}`);
    }

    const closets = await response.json();
    return closets;
  } catch (error) {
    console.error("Failed to delete closet", error);
    throw error;
  }
};
