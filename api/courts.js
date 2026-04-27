import supabase from './_lib/supabase.js';
import { json, cors } from './_lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { data } = await supabase.from('courts').select('id, name').eq('active', true).order('name');
  return json(res, 200, { courts: data || [] });
}
