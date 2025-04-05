// lib/gmail/createGmailClient.js
import { google } from "googleapis"

export function createGmailClient(user) {
  const oAuth2Client = new google.auth.OAuth2()
  oAuth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
  })

  return google.gmail({ version: "v1", auth: oAuth2Client })
}