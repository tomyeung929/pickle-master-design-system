import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const ADMIN = process.env.ADMIN_EMAIL || 'admin@picklemaster.hk';

export async function sendBookingConfirmation({ to, name, court, sessionType, date, time, price }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Booking Confirmed — ${court} ${date} ${time} | Pickle Master`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1A1208">
        <h2 style="color:#0F3D24">Booking Confirmed ✓</h2>
        <p>Hi ${name}, your booking is confirmed.</p>
        <table style="border-collapse:collapse;width:100%;margin:16px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Court</td><td style="padding:8px;border-bottom:1px solid #eee">${court}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Session</td><td style="padding:8px;border-bottom:1px solid #eee">${sessionType}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Date</td><td style="padding:8px;border-bottom:1px solid #eee">${date}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666">Time</td><td style="padding:8px;border-bottom:1px solid #eee">${time}</td></tr>
          <tr><td style="padding:8px;color:#666">Amount Paid</td><td style="padding:8px">HK$${price}</td></tr>
        </table>
        <p style="color:#666;font-size:14px">Cancellations must be made at least 24 hours in advance. Address: 8/F Champion Building, 301-309 Nathan Rd, Kowloon.</p>
        <p style="color:#C9A84C;font-size:12px;margin-top:24px">Pickle Master 匹匠 · Premier Indoor Pickleball Club · Hong Kong</p>
      </div>
    `,
  });
}

export async function sendContactNotification({ name, email, subject, message }) {
  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      replyTo: email,
      subject: `[Contact Form] ${subject} from ${name}`,
      html: `<p><b>From:</b> ${name} &lt;${email}&gt;</p><p><b>Subject:</b> ${subject}</p><p><b>Message:</b></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      subject: `We received your message — Pickle Master`,
      html: `<div style="font-family:sans-serif;color:#1A1208"><h2 style="color:#0F3D24">Thank you, ${name}</h2><p>We've received your message and will get back to you within 1–2 business days.</p><p style="color:#C9A84C;font-size:12px;margin-top:24px">Pickle Master 匹匠</p></div>`,
    }),
  ]);
}

export async function sendTournamentConfirmation({ to, name, eventName }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Tournament Registration Confirmed — ${eventName} | Pickle Master`,
    html: `<div style="font-family:sans-serif;color:#1A1208"><h2 style="color:#0F3D24">Registration Confirmed ✓</h2><p>Hi ${name}, you're registered for <b>${eventName}</b>. We'll send more details closer to the date.</p><p style="color:#C9A84C;font-size:12px;margin-top:24px">Pickle Master 匹匠</p></div>`,
  });
}

export async function sendMembershipWelcome({ to, name, tier }) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Welcome to Pickle Master ${tier} Membership`,
    html: `<div style="font-family:sans-serif;color:#1A1208"><h2 style="color:#0F3D24">Welcome, ${name}!</h2><p>Your <b>${tier}</b> membership is now active. You can book courts up to ${tier === 'DINK' ? '14' : '7'} days in advance and enjoy 10% off all court bookings.</p><p style="color:#C9A84C;font-size:12px;margin-top:24px">Pickle Master 匹匠</p></div>`,
  });
}
