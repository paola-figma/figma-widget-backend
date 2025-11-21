import { google } from "googleapis";

export default function handler(req, res) {
  try {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectURI = process.env.GOOGLE_REDIRECT_URI;

    if (!clientID || !clientSecret || !redirectURI) {
      return res.status(500).json({ error: "Missing environment variables." });
    }

    const oauth2Client = new google.auth.OAuth2(
      clientID,
      clientSecret,
      redirectURI
    );

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/gmail.send"]
    });

    res.status(200).json({ auth_url: url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
