// server/controllers/emailController.js
import { getGmailClient } from "../config/gmailClient.js";

import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const OAuth2 = google.auth.OAuth2;
// controllers/emailController.js

export const getEmailsByLabel = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const labelId = req.query.labelId || "INBOX";
    const gmail = getGmailClient(user);

    const response = await gmail.users.messages.list({
      userId: "me",
      labelIds: [labelId],
      maxResults: 10,
    });

    const messages = response.data.messages || [];

    const emailPromises = messages.map((msg) =>
      gmail.users.messages.get({ userId: "me", id: msg.id })
    );
    const emails = await Promise.all(emailPromises);

    const formattedEmails = emails.map((email) => {
      const headers = email.data.payload.headers;
      const from = headers.find((h) => h.name === "From")?.value || "";
      const subject = headers.find((h) => h.name === "Subject")?.value || "";
      const date = headers.find((h) => h.name === "Date")?.value || "";
      const snippet = email.data.snippet;

      return {
        id: email.data.id,
        from,
        subject,
        date,
        snippet,
      };
    });

    res.json(formattedEmails);
  } catch (err) {
    console.error("Failed to fetch emails:", err);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
};

export const sendEmail = async ({ to, subject, body, user }) => {
  try {
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground" // or your real redirect
    );

    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const rawMessage = createEmailBody({
      to,
      subject,
      body,
      from: user.email,
    });

    const result = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: rawMessage,
      },
    });

    return result.data;
  } catch (err) {
    console.error("Failed to send email:", err.response?.data || err.message);
    throw new Error("Failed to send email");
  }
};

// Helper to format message into Base64
function createEmailBody({ to, subject, body, from }) {
  const str = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    "",
    body,
  ].join("\n");

  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// controllers/emailController.js

export const getEmailById = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const gmail = getGmailClient(user);
    const response = await gmail.users.messages.get({
      userId: "me",
      id,
      format: "full",
    });

    const headers = response.data.payload.headers;
    const getHeader = (name) =>
      headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value;

    // Find plain text part or fallback
    const bodyPart =
      response.data.payload.parts?.find(
        (part) => part.mimeType === "text/plain"
      )?.body?.data || response.data.payload.body?.data;

    const bodyDecoded = bodyPart
      ? Buffer.from(bodyPart, "base64").toString("utf-8")
      : "(No body found)";

    return res.json({
      id: response.data.id,
      from: getHeader("From"),
      to: getHeader("To"),
      subject: getHeader("Subject"),
      date: getHeader("Date"),
      body: bodyDecoded,
    });
  } catch (error) {
    console.error("Error fetching email:", error.message);
    return res.status(500).json({ error: "Failed to fetch email" });
  }
};
