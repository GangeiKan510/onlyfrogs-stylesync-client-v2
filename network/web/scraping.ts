import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";

export const scrapeMissingPieces = async (
  userId: string,
  promptGptResponse: string
) => {
  try {
    const response = await postWithFirebaseJwt("/web/chat/extract-clothes", {
      userId,
      promptGptResponse,
    });

    if (!response.ok) {
      throw new Error(
        `Error scraping for missing pieces: ${response.statusText}`
      );
    }

    const messageSent = await response.json();
    return messageSent;
  } catch (error) {
    console.error("Failed to scrape missing pieces", error);
    throw error;
  }
};
