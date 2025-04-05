<<<<<<< HEAD

=======
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const OAuth2 = google.auth.OAuth2;

export const sendEmail = async ({ to, subject, message, user }) => {
  try {
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const rawMessage = createEmailBody({
      to,
      subject,
      message,
      from: user.email,
    });

    const result = await gmail.users.drafts.create({
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
function createEmailBody({ to, subject, message, from }) {
  const str = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
>>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9
