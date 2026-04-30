-- Seed hero_content, lesson_images, and page_images keys for the admin content editor
-- Run in Supabase Dashboard → SQL Editor

INSERT INTO site_content (key, value) VALUES

('hero_content', '{
  "eyebrow_en": "Hong Kong''s Premier Indoor Pickleball Club",
  "eyebrow_zh": "香港首屈一指的室內匹克球俱樂部",
  "title_en": "Play.\nLearn.\nConnect.",
  "title_zh": "打球\n學習\n連繫",
  "subtitle_en": "Two championship courts in Ma On Shan. All levels welcome.",
  "subtitle_zh": "馬鞍山兩個錦標賽球場，歡迎各水平球員。",
  "video_url": "https://videos.pexels.com/video-files/32041192/32041192-hd_1920_1080_25fps.mp4"
}'::jsonb),

('lesson_images', '[
  "https://images.pexels.com/photos/9004558/pexels-photo-9004558.jpeg?auto=compress&cs=tinysrgb&w=700&q=72",
  "https://images.pexels.com/photos/6765846/pexels-photo-6765846.jpeg?auto=compress&cs=tinysrgb&w=700&q=72",
  "https://images.pexels.com/photos/5568971/pexels-photo-5568971.jpeg?auto=compress&cs=tinysrgb&w=700&q=72"
]'::jsonb),

('page_images', '{
  "home_about_bg":   "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1400&q=60",
  "coaches_hero":    "https://images.pexels.com/photos/6765846/pexels-photo-6765846.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65",
  "tournament_hero": "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65",
  "shop_hero":       "https://images.pexels.com/photos/9004558/pexels-photo-9004558.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65",
  "social_hero":     "https://images.pexels.com/photos/5568971/pexels-photo-5568971.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65",
  "private_hero":    "https://images.pexels.com/photos/6765846/pexels-photo-6765846.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65",
  "contact_hero":    "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1400&q=60"
}'::jsonb)

ON CONFLICT (key) DO NOTHING;
