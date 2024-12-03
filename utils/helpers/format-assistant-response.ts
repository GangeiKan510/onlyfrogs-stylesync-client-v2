export const formatAssistantResponse = (response: string): string => {
  // Clean up and structure the response
  return response
    .replace(/\n+/g, "\n") // Normalize newlines
    .replace(/- \*\*/g, "\n- **") // Ensure consistent list formatting
    .replace(/(https?:\/\/[^\s]+)/g, "![$1]($1)") // Format links as markdown images
    .trim(); // Remove extra whitespace
};
