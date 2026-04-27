import supabase from './_lib/supabase.js';
import { parseBody, json, cors } from './_lib/auth.js';
import { sendContactNotification } from './_lib/resend.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  let body;
  try { body = await parseBody(req); } catch { return json(res, 400, { error: 'Invalid JSON' }); }

  const { name, email, subject, message } = body;
  if (!name || !email || !subject || !message) {
    return json(res, 400, { error: 'All fields are required' });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(res, 400, { error: 'Invalid email address' });
  }

  // Sanitize: strip HTML tags from message
  const cleanMessage = message.replace(/<[^>]*>/g, '').slice(0, 2000);

  await supabase.from('contact_submissions').insert({ name, email, subject, message: cleanMessage });

  try {
    await sendContactNotification({ name, email, subject, message: cleanMessage });
  } catch (e) {
    console.error('Contact email failed:', e.message);
  }

  return json(res, 200, { success: true });
}
