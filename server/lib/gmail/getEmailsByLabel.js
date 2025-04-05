import { initGmailClient } from "../../config/initGmailClient.js";

export const getEmailsByLabel = async (user, labelId) => {
  try {
    const gmail = initGmailClient(user);

    // Step 1: Get list of message IDs for the given label
    const messagesList = await gmail.users.messages.list({
      userId: "me",
      labelIds: labelId ? [labelId] : undefined, // undefined fetches all if no label
      maxResults: 10, // Adjust or make dynamic if needed
    });

    const messages = await Promise.all(
      (messagesList.data.messages || []).map(async (message) => {
        const msg = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "full", // or 'metadata' for lighter response
        });

        const headers = msg.data.payload.headers;

        const getHeader = (name) =>
          headers.find((h) => h.name === name)?.value || "";

        return {
          id: message.id,
          snippet: msg.data.snippet,
          subject: getHeader("Subject"),
          from: getHeader("From"),
          to: getHeader("To"),
          date: getHeader("Date"),
          labelIds: msg.data.labelIds,
        };
      })
    );

    return messages;
  } catch (error) {
    console.error("Error fetching emails by label:", error.message);
    throw new Error("Failed to fetch emails by label");
  }
};