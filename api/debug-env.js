// Temporary diagnostic endpoint — remove after confirming env vars are set
module.exports = async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !hasServiceKey) {
    return res.status(500).json({
      error: 'Missing env vars',
      SUPABASE_URL: supabaseUrl ? 'set' : 'MISSING',
      SUPABASE_SERVICE_ROLE_KEY: hasServiceKey ? 'set' : 'MISSING',
    });
  }

  try {
    const { createClient } = require('@supabase/supabase-js');
    const sb = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { error } = await sb.from('profiles').select('id').limit(1);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, supabase: 'connected' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
