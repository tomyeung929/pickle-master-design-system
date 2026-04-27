-- Courts
insert into public.courts (name) values ('Court 1'), ('Court 2')
on conflict do nothing;

-- Session Types
insert into public.session_types (key, label_en, label_zh, price_guest, price_member, slot_type) values
  ('peak',        'Peak Hour',    '繁忙時段',   450, 405, 'peak'),
  ('nonpeak',     'Non-Peak',     '非繁忙時段', 400, 360, 'nonpeak'),
  ('group_class', 'Group Class',  '團體課程',   250, 225, 'class'),
  ('social',      'Social Play',  '社交球局',   200, 160, 'nonpeak'),
  ('trial',       'Trial Session','體驗課',      380, 342, 'nonpeak'),
  ('beginner',    'Beginner Class','初學者課程', 280, 252, 'class')
on conflict (key) do nothing;

-- Products
insert into public.products (id, sku, name_en, name_zh, category, price, member_price, description_en, description_zh, badge_en, badge_zh, in_stock, sort_order) values
  (1, 'PM-PAD-001', 'PM Pro Paddle',       'PM 專業球拍',    'paddles',     1280, 1152, 'Carbon-fiber face, polymer core, 16mm thickness. Approved for tournament play.', '碳纖維面板，聚合物芯，16毫米厚度。適用於比賽。', 'Bestseller', '熱銷', true,  1),
  (2, 'PM-PAD-002', 'PM Control Series',   'PM 控制系列球拍', 'paddles',     980,  882,  'Fibreglass face for added spin and control. Ideal for intermediate players.',      '玻璃纖維面板，增加旋轉和控制。適合中級球手。',  null,         null,  true,  2),
  (3, 'PM-PAD-003', 'PM Beginner Paddle',  'PM 初學者球拍',   'paddles',     480,  432,  'Lightweight fibreglass paddle. Perfect for new players.',                          '輕量玻璃纖維球拍，適合初學者。',                 'New',        '新品', true,  3),
  (4, 'PM-APP-001', 'PM Performance Tee',  'PM 運動T恤',      'apparel',     320,  288,  'Moisture-wicking fabric. Relaxed fit. Available in S, M, L, XL.',                 '排汗面料，寬鬆版型。S/M/L/XL。',                 null,         null,  true,  4),
  (5, 'PM-APP-002', 'PM Athletic Shorts',  'PM 運動短褲',     'apparel',     380,  342,  'Stretch fabric, built-in compression liner. Available in S, M, L, XL.',            '彈性面料，內置壓縮褲底。S/M/L/XL。',            null,         null,  true,  5),
  (6, 'PM-APP-003', 'PM Club Cap',         'PM 球帽',         'apparel',     220,  198,  'Structured 6-panel cap. One size fits most.',                                      '6片式帽，均碼。',                                null,         null,  false, 6),
  (7, 'PM-ACC-001', 'PM Pickle Balls (6)', 'PM 泡菜球（6個）', 'accessories', 180,  162,  'Official tournament balls. Indoor & outdoor approved.',                            '官方比賽用球，室內室外通用。',                    'Official',   '官方', true,  7),
  (8, 'PM-ACC-002', 'PM Grip Tape (3pk)',  'PM 握把膠（3條）', 'accessories', 95,   86,  'Extra tacky, moisture-absorbing. Fits all standard paddles.',                      '超強黏性，吸濕排汗，適合標準球拍。',               null,         null,  true,  8),
  (9, 'PM-ACC-003', 'PM Carry Bag',        'PM 球拍包',       'accessories', 560,  504,  'Holds 2 paddles + gear. Padded compartments, shoulder strap.',                     '可放2支球拍，帶護墊隔層和肩帶。',               null,         null,  true,  9)
on conflict (id) do nothing;

-- Tournaments
insert into public.tournaments (key, name_en, name_zh, date_label, capacity, members_only, sort_order) values
  ('pm-open-2026',        'PM Open 2026',          'PM公開賽 2026',   'June 14–15, 2026',    64,  false, 1),
  ('friday-night-league', 'Friday Night League',   '週五夜聯賽',       'Every Friday, 7pm',   24,  true,  2),
  ('members-cup-2026',    'Members Cup 2026',      '會員盃 2026',     'July 5, 2026',        32,  true,  3),
  ('kids-championship',   'Kids Championship',     '青少年錦標賽',    'August 2, 2026',      48,  false, 4)
on conflict (key) do nothing;
