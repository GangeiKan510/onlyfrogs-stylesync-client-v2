import {
  deleteWithFirebaseJwt,
  postWithFirebaseJwt,
} from "../firebase/requests-with-firebase";

export const getUserChatSession = async (userId: string) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/chat/retrieve-user-sessions",
      {
        userId,
      }
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

export const sendMessage = async (userId: string, userMessage: string) => {
  try {
    const response = await postWithFirebaseJwt("/web/chat/prompt-gpt", {
      userId,
      userMessage,
    });

    if (!response.ok) {
      throw new Error(`Error updating clothing: ${response.statusText}`);
    }

    const messageSent = await response.json();
    return messageSent;
  } catch (error) {
    console.error("Failed to send message", error);
    throw error;
  }
};

export const clearConversationMessages = async (userId: string) => {
  try {
    const response = await deleteWithFirebaseJwt(
      "/web/chat/delete-chat-session-messages",
      {
        userId: userId,
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting messages: ${response.statusText}`);
    }

    const messageSent = await response.json();
    return messageSent;
  } catch (error) {
    console.error("Failed to clear conversation", error);
    throw error;
  }
};
