const supabase = require('../_lib/supabase.js');
const { requireAdmin, json, parseBody, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id');
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { products: data });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    const { action, id, ...fields } = body;

    if (action === 'create') {
      const { data, error } = await supabase.from('products').insert(fields).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { product: data });
    }

    if (action === 'update') {
      const { data, error } = await supabase.from('products').update(fields).eq('id', id).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { product: data });
    }

    if (action === 'delete') {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true });
    }

    return json(res, 400, { error: 'Unknown action' });
  }

  return json(res, 405, { error: 'Method not allowed' });
};
