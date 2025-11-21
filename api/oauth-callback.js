import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const { code } = req.query;

    if (!code) return res.status(400).json({ error: "Missing ?code=" });

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);

    res.status(200).json({
      message: "OAuth successful",
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
