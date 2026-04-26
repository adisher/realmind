const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, therapyType, preferredTime, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Real Mind Website <noreply@realmindpsychotherapy.com>',
      to: process.env.CLIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#3D5A47">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;width:160px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Type of Therapy</td><td style="padding:8px 0;border-bottom:1px solid #eee">${therapyType || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Preferred Time</td><td style="padding:8px 0;border-bottom:1px solid #eee">${preferredTime || 'Not specified'}</td></tr>
          </table>
          <h3 style="color:#3D5A47;margin-top:24px">Message</h3>
          <p style="background:#f5f5f5;padding:16px;border-radius:6px;line-height:1.6">${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact email error:', error);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};
