-- Site content table: stores editable page content as JSONB blobs
CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_site_content_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_site_content_timestamp();

-- Seed default content
INSERT INTO site_content (key, value) VALUES

('coaches', '[
  {
    "num": "01",
    "name": "Jenny",
    "role_en": "In-House Coach",
    "role_zh": "常駐教練",
    "cert": "HKPA · IPTPA Licensed",
    "bio_en": "Youth specialist with 15+ years of experience. Patient, energetic, and dedicated to building genuine love for the game in young players. Jenny makes every session engaging and accessible.",
    "bio_zh": "擁有15年以上青少年訓練經驗的專科教練。耐心、充滿活力，致力讓年輕球員愛上匹克球。Jenny讓每節課生動有趣。",
    "spec_en": "Kids · Beginners",
    "spec_zh": "兒童 · 初學者",
    "photo": "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300&q=75"
  },
  {
    "num": "02",
    "name": "Justin",
    "role_en": "Flexible Coach",
    "role_zh": "外聘教練",
    "cert": "PPR Certified",
    "bio_en": "A competitive tournament player who brings intensity and precision to every coaching session. Justin pushes players to embrace challenges and sharpen their technique.",
    "bio_zh": "積極參與錦標賽的球員，將競技強度帶入每節訓練。Justin激勵球員迎接挑戰，精進技術。",
    "spec_en": "Intermediate · Competitive",
    "spec_zh": "中級 · 競技",
    "photo": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&q=75"
  },
  {
    "num": "03",
    "name": "Fai",
    "role_en": "Flexible Coach",
    "role_zh": "外聘教練",
    "cert": "HKPA Licensed · 2025 HK Championship Bronze",
    "bio_en": "Community builder and bronze medallist at the 2025 Hong Kong Pickleball Championship. Fai sees pickleball as a bridge between people — warm, welcoming, and tournament-tested.",
    "bio_zh": "社群建設者，2025年香港匹克球錦標賽混雙銅牌得主。Fai視匹克球為連結人心的橋樑，熱情友善，賽場經驗豐富。",
    "spec_en": "All Levels · Social",
    "spec_zh": "各水平 · 社交",
    "photo": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&q=75"
  },
  {
    "num": "04",
    "name": "Rachel",
    "role_en": "Guest Coach",
    "role_zh": "客席教練",
    "cert": "PPR Pro Level 1 · HK Champion",
    "bio_en": "Professional player and coach with championships across HK, China, Thailand, Vietnam and Malaysia. Built on 26 years of tennis, Rachel is one of Hong Kong''s most decorated pickleball athletes.",
    "bio_zh": "職業球員兼教練，在香港、中國、泰國、越南及馬來西亞奪得多項冠軍。憑藉26年網球基礎，Rachel是香港最具成就的匹克球運動員之一。",
    "spec_en": "Advanced · Elite",
    "spec_zh": "高級 · 精英",
    "photo": "https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&w=300&q=75"
  },
  {
    "num": "05",
    "name": "Levin 企鵝",
    "role_en": "Flexible Coach",
    "role_zh": "外聘教練",
    "cert": "PPR Level 2 · TRIPLE ACE Team",
    "bio_en": "Based in Hong Kong and China, Levin is a distinguished coach and TRIPLE ACE team member. He conducts workshops and clinics focused on promoting the sport and developing new talent.",
    "bio_zh": "駐港及中國的資深教練，TRIPLE ACE球隊成員。Levin專注舉辦工作坊及訓練營，致力推廣匹克球及培育新秀。",
    "spec_en": "Advanced · Workshops",
    "spec_zh": "高級 · 工作坊",
    "photo": "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=300&q=75"
  }
]'::jsonb),

('faqs', '[
  {
    "q_en": "Do I need to be a member to play?",
    "q_zh": "我需要成為會員才能打球嗎？",
    "a_en": "No — anyone can book a court as a guest. However, members enjoy priority booking windows, 10% off court rates, zero guest fees, and other exclusive perks.",
    "a_zh": "不需要——任何人均可以訪客身份預訂球場。但會員享有優先預訂窗口、訂場9折、零賓客費及其他專屬優惠。"
  },
  {
    "q_en": "What is the difference between DINK and FLEX membership?",
    "q_zh": "DINK與FLEX會員有什麼分別？",
    "a_en": "DINK ($380/month) gives you 14-day priority booking, 10% off courts, 20% off social play, BOGO beverages, and 2-hour consecutive booking. FLEX ($280/month) gives you 7-day priority booking and the same discounts, without the beverage perk.",
    "a_zh": "DINK（$380/月）提供提前14天優先預訂、訂場9折、社交賽8折、買一送一飲品及連續2小時預訂。FLEX（$280/月）提供提前7天優先預訂及相同折扣，但不包含飲品優惠。"
  },
  {
    "q_en": "How do I book a court?",
    "q_zh": "如何預訂球場？",
    "a_en": "Click \"Book\" in the navigation. Select your court, session type, date and time slot, then add to cart and complete checkout.",
    "a_zh": "點擊導覽列中的「預訂」。選擇球場、課程類型、日期及時間，加入購物車後完成結帳。"
  },
  {
    "q_en": "What is Peak vs Non-Peak pricing?",
    "q_zh": "繁忙與非繁忙時段收費有何分別？",
    "a_en": "Peak hours are Mon–Fri 6pm–10pm, and all day Saturday, Sunday, and Public Holidays. Non-peak is Mon–Fri 10am–6pm. Peak sessions are HK$450; non-peak are HK$400.",
    "a_zh": "繁忙時段為週一至五下午6時至晚上10時，以及週六、日及公眾假期全天。非繁忙時段為週一至五上午10時至下午6時。"
  },
  {
    "q_en": "Can I bring guests?",
    "q_zh": "我可以帶賓客嗎？",
    "a_en": "Yes. Non-members pay a $50 guest fee per person per session. DINK and FLEX members enjoy zero guest fees.",
    "a_zh": "可以。非會員每位賓客每節收取$50賓客費。DINK及FLEX會員享有零賓客費。"
  },
  {
    "q_en": "Do you provide paddles and equipment?",
    "q_zh": "你們有提供球拍及器材嗎？",
    "a_en": "Members can trial pro-level paddles during sessions at no charge. Non-members may rent a paddle for $20 per session.",
    "a_zh": "會員可在課程中免費試用專業球拍。非會員可以每節$20租用球拍。"
  },
  {
    "q_en": "What is your cancellation policy?",
    "q_zh": "你們的取消政策是什麼？",
    "a_en": "Cancellations made 24 hours or more before the session start time are eligible for a full refund or credit. Cancellations within 24 hours are non-refundable.",
    "a_zh": "在課程開始前24小時或以上取消，可獲全額退款或積分。24小時內取消不予退款。"
  },
  {
    "q_en": "Where are you located?",
    "q_zh": "你們在哪裡？",
    "a_en": "We are located at We Go Mall, Ma On Shan, New Territories, Hong Kong. Accessible by MTR (Ma On Shan line) and multiple bus routes.",
    "a_zh": "我們位於香港新界馬鞍山We Go Mall，可乘坐港鐵馬鞍山綫或多條巴士路線前往。"
  },
  {
    "q_en": "Do you offer coaching for beginners?",
    "q_zh": "你們有提供初學者教練課程嗎？",
    "a_en": "Absolutely. Our trial class ($195, Age 10+) is the perfect introduction. We also offer beginner courses (4 sessions), kids programmes, and private lessons for all ages.",
    "a_zh": "當然有。我們的體驗課（$195，10歲或以上）是最佳入門選擇。我們亦提供初學者課程（4節）、兒童課程及各年齡私人課程。"
  },
  {
    "q_en": "What is social play?",
    "q_zh": "什麼是社交賽？",
    "a_en": "Social play is an open session where individual players are matched together by skill level. No partner needed — just show up. $200 per person (members $160).",
    "a_zh": "社交賽是按水平配對個人球員的開放賽節。無需搭檔，隨時出現即可。每人$200（會員$160）。"
  }
]'::jsonb),

('testimonials', '[
  {
    "quote_en": "Pickleball has completely transformed my weekends. Easy to learn, fun, and a great way to meet new people.",
    "quote_zh": "匹克球完全改變了我的週末！容易上手，又好玩，仲識到好多新朋友！",
    "name": "Jeffrey",
    "detail": "32, DUPR 3.5",
    "avatar": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "quote_en": "I love how inclusive pickleball is! Everyone can join and have a good time. My go-to for staying active.",
    "quote_zh": "我非常喜歡打Pickleball！這項運動簡單易學，不管年齡大小都能參與。",
    "name": "Angel",
    "detail": "34, Parent",
    "avatar": "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200"
  },
  {
    "quote_en": "Pickle Master is where serious players and total beginners come together. The coaching is world class.",
    "quote_zh": "匹匠讓認真的球員和初學者走在一起。教練質素一流。",
    "name": "Ken",
    "detail": "43, Designer",
    "avatar": "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200"
  }
]'::jsonb),

('contact_info', '{
  "address_en": "We Go Mall, Ma On Shan, New Territories, Hong Kong",
  "address_zh": "香港新界馬鞍山We Go Mall",
  "phone": "",
  "email": "info@picklemaster.hk",
  "instagram": "#",
  "facebook": "#",
  "map_url": ""
}'::jsonb),

('opening_hours', '[
  { "day_en": "Monday – Friday", "day_zh": "週一至五", "hours_en": "10:00 am – 10:00 pm", "hours_zh": "上午10時 – 晚上10時" },
  { "day_en": "Saturday", "day_zh": "週六", "hours_en": "8:00 am – 10:00 pm", "hours_zh": "上午8時 – 晚上10時" },
  { "day_en": "Sunday & Public Holidays", "day_zh": "週日及公眾假期", "hours_en": "8:00 am – 10:00 pm", "hours_zh": "上午8時 – 晚上10時" }
]'::jsonb)

ON CONFLICT (key) DO NOTHING;
