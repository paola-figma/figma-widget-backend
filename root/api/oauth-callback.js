import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const code = req.query.code;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);

    res.status(200).json({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      note: "Save REFRESH_TOKEN in your Vercel environment variables."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
