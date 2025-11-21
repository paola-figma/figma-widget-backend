import nodemailer from "nodemailer";
import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const { subject, text } = req.method === "POST" ? JSON.parse(req.body) : { subject: "Test Email", text: "Success" };

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_FROM,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO_NOTIFY,
      subject,
      text
    });

    res.status(200).json({ status: "ok", sent: true });

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
