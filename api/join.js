import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    licenseType,
    yearsExperience,
    specialties,
    therapyType,
    weeklyAvailability,
    faithIntegration,
    clinicalApproach,
    linkedIn
  } = req.body;

  if (!firstName || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    await resend.emails.send({
      from: 'Real Mind Psychotherapy <noreply@realmindpsychotherapy.com>',
      to: process.env.CLIENT_EMAIL,
      subject: `New Clinician Application — ${firstName} ${lastName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#3D5A47;padding:32px;border-radius:8px 8px 0 0;">
            <h1 style="color:#F7F4EE;font-family:Georgia,serif;font-weight:400;margin:0;font-size:24px;">
              New Clinician Application
            </h1>
          </div>
          <div style="background:#F7F4EE;padding:32px;border-radius:0 0 8px 8px;border:1px solid #E8E0D0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;width:40%;">Name</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">Email</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;"><a href="mailto:${email}" style="color:#3D5A47;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${phone || 'Not provided'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">License Type</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${licenseType || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">Years of Experience</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${yearsExperience || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">Specialties</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${specialties || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">Therapy Type</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${therapyType || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">Weekly Availability</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${weeklyAvailability || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">Faith Integration</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${faithIntegration || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;">LinkedIn</td><td style="padding:10px 0;border-bottom:1px solid #E8E0D0;font-size:15px;color:#1E1E1E;">${linkedIn || 'Not provided'}</td></tr>
              <tr><td style="padding:10px 0;font-size:13px;color:#5C6B5E;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;">Clinical Approach</td><td style="padding:10px 0;font-size:15px;color:#1E1E1E;line-height:1.6;">${clinicalApproach || 'Not provided'}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:#E8E0D0;border-radius:6px;font-size:13px;color:#5C6B5E;">
              Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
            </div>
          </div>
        </div>
      `
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}