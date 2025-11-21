export default async function handler(req, res) {
  try {
    // your code
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export default function handler(req, res) {
  try {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectURI = process.env.GOOGLE_REDIRECT_URI;

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
