const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name, email, phone, licenseType, yearsExperience,
    specialties, therapyType, weeklyAvailability,
    faithIntegration, clinicalApproach, linkedin
  } = req.body;

  if (!name || !email || !licenseType) {
    return res.status(400).json({ error: 'Name, email, and license type are required.' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'Real Mind Website <noreply@realmindpsychotherapy.com>',
      to: process.env.CLIENT_EMAIL,
      replyTo: email,
      subject: `New Team Application — ${name} (${licenseType})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#3D5A47">New Team Application</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold;width:180px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">License Type</td><td style="padding:8px 0;border-bottom:1px solid #eee">${licenseType}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Years of Experience</td><td style="padding:8px 0;border-bottom:1px solid #eee">${yearsExperience || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Specialties</td><td style="padding:8px 0;border-bottom:1px solid #eee">${specialties || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Therapy Type</td><td style="padding:8px 0;border-bottom:1px solid #eee">${therapyType || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Weekly Availability</td><td style="padding:8px 0;border-bottom:1px solid #eee">${weeklyAvailability || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">Faith Integration</td><td style="padding:8px 0;border-bottom:1px solid #eee">${faithIntegration || 'Not specified'}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:bold">LinkedIn</td><td style="padding:8px 0;border-bottom:1px solid #eee">${linkedin ? `<a href="${linkedin}">${linkedin}</a>` : 'Not provided'}</td></tr>
          </table>
          <h3 style="color:#3D5A47;margin-top:24px">Clinical Approach</h3>
          <p style="background:#f5f5f5;padding:16px;border-radius:6px;line-height:1.6">${clinicalApproach ? clinicalApproach.replace(/\n/g, '<br>') : 'Not provided'}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Join email error:', error);
    return res.status(500).json({ error: 'Failed to submit application. Please try again.' });
  }
};
