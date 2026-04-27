import supabase from '../_lib/supabase.js';
import { json, cors } from '../_lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const { category } = req.query;

  let query = supabase
    .from('products')
    .select('id, name_en, name_zh, category, price, member_price, description_en, description_zh, badge_en, badge_zh, in_stock, image_url')
    .order('sort_order');

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data: products, error } = await query;
  if (error) return json(res, 500, { error: error.message });

  return json(res, 200, { products: products || [] });
}
