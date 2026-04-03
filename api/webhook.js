const twilio = require('twilio');

const YOUR_CELL     = '+19419623177';
const TWILIO_NUMBER = '+19413401004';
const client        = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const fromNumber  = req.body.From;
  const messageBody = req.body.Body;

  try {
    // Forward buyer reply to your cell
    await client.messages.create({
      from: TWILIO_NUMBER,
      to:   YOUR_CELL,
      body: `📱 Reply from buyer (${fromNumber}):\n\n"${messageBody}"\n\nTo reply text:\nREPLY ${fromNumber} your message`
    });

    res.setHeader('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
