// Pickle Master — Coaches, Tournament, Shop, FAQ Pages (Light Theme)

// ─── COACHES PAGE ─────────────────────────────────────────────
function CoachesPage({ lang, setPage }) {
  const t = window.LANG[lang];

  const coaches = [
    {
      num: '01', name: 'Jenny', role: t.coaches_inhouse,
      cert: 'HKPA · IPTPA Licensed',
      bio: lang === 'EN'
        ? 'Youth specialist with 15+ years of experience. Patient, energetic, and dedicated to building genuine love for the game in young players. Jenny makes every session engaging and accessible.'
        : '擁有15年以上青少年訓練經驗的專科教練。耐心、充滿活力，致力讓年輕球員愛上匹克球。Jenny讓每節課生動有趣。',
      spec: lang === 'EN' ? 'Kids · Beginners' : '兒童 · 初學者',
      photo: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=300&q=75',
    },
    {
      num: '02', name: 'Justin', role: t.coaches_flexible,
      cert: 'PPR Certified',
      bio: lang === 'EN'
        ? 'A competitive tournament player who brings intensity and precision to every coaching session. Justin pushes players to embrace challenges and sharpen their technique.'
        : '積極參與錦標賽的球員，將競技強度帶入每節訓練。Justin激勵球員迎接挑戰，精進技術。',
      spec: lang === 'EN' ? 'Intermediate · Competitive' : '中級 · 競技',
      photo: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300&q=75',
    },
    {
      num: '03', name: 'Fai', role: t.coaches_flexible,
      cert: 'HKPA Licensed · 2025 HK Championship Bronze',
      bio: lang === 'EN'
        ? 'Community builder and bronze medallist at the 2025 Hong Kong Pickleball Championship. Fai sees pickleball as a bridge between people — warm, welcoming, and tournament-tested.'
        : '社群建設者，2025年香港匹克球錦標賽混雙銅牌得主。Fai視匹克球為連結人心的橋樑，熱情友善，賽場經驗豐富。',
      spec: lang === 'EN' ? 'All Levels · Social' : '各水平 · 社交',
      photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&q=75',
    },
    {
      num: '04', name: 'Rachel', role: t.coaches_guest,
      cert: 'PPR Pro Level 1 · HK Champion',
      bio: lang === 'EN'
        ? 'Professional player and coach with championships across HK, China, Thailand, Vietnam and Malaysia. Built on 26 years of tennis, Rachel is one of Hong Kong\'s most decorated pickleball athletes.'
        : '職業球員兼教練，在香港、中國、泰國、越南及馬來西亞奪得多項冠軍。憑藉26年網球基礎，Rachel是香港最具成就的匹克球運動員之一。',
      spec: lang === 'EN' ? 'Advanced · Elite' : '高級 · 精英',
      photo: 'https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&w=300&q=75',
    },
    {
      num: '05', name: 'Levin 企鵝', role: t.coaches_flexible,
      cert: 'PPR Level 2 · TRIPLE ACE Team',
      bio: lang === 'EN'
        ? 'Based in Hong Kong and China, Levin is a distinguished coach and TRIPLE ACE team member. He conducts workshops and clinics focused on promoting the sport and developing new talent.'
        : '駐港及中國的資深教練，TRIPLE ACE球隊成員。Levin專注舉辦工作坊及訓練營，致力推廣匹克球及培育新秀。',
      spec: lang === 'EN' ? 'Advanced · Workshops' : '高級 · 工作坊',
      photo: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=300&q=75',
    },
  ];

  return (
    <div style={{ background: '#FDFAF5' }}>
      {/* Hero — court action bg */}
      <section style={{ position: 'relative', minHeight: 340, display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.pexels.com/photos/6765846/pexels-photo-6765846.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65"
            alt="" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(15,61,36,0.92) 40%,rgba(15,61,36,0.5) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{t.coaches_title}</div>
          <h1 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.1, marginBottom: 20, textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>{t.coaches_hero}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: 'rgba(245,240,232,0.82)', maxWidth: 540, lineHeight: 1.8 }}>{t.coaches_sub}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex: 1 }} />
      </section>

      {/* Coaches grid — with portrait photos */}
      <section style={{ padding: '64px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {coaches.map((c, i) => (
            <div key={c.num} style={{ background: '#FFFFFF', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,18,8,0.07)', border: '1px solid #EDE8DF', display: 'grid', gridTemplateColumns: '100px 1fr auto', alignItems: 'center' }}>
              {/* Photo */}
              <div style={{ height: '100%', minHeight: 110, overflow: 'hidden', position: 'relative', background: '#C8DDD5' }}>
                <img src={c.photo} alt={c.name} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', minHeight: 110 }} />
                <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(15,61,36,0.85)', borderRadius: 4, padding: '2px 7px' }}>
                  <span style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 11, fontWeight: 700, color: '#C9A84C' }}>{c.num}</span>
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: '22px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 20, fontWeight: 700, color: '#0F3D24' }}>{c.name}</span>
                  <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: '#F0EAE0', color: '#6B5D4E', border: '1px solid #DDD5C8' }}>{c.role}</span>
                  <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C' }}>{c.cert}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#6B5D4E', lineHeight: 1.75, maxWidth: 600, marginBottom: 10 }}>{c.bio}</p>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: 'rgba(94,132,116,0.1)', color: '#5E8474', border: '1px solid rgba(94,132,116,0.25)' }}>{c.spec}</span>
              </div>
              {/* CTA */}
              <div style={{ padding: '0 24px', flexShrink: 0 }}>
                <button onClick={() => setPage('book')} style={{ background: '#C9A84C', color: '#0F3D24', border: 'none', borderRadius: 999, padding: '12px 24px', fontFamily: "'Oswald',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t.coaches_book}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── TOURNAMENT PAGE ──────────────────────────────────────────
function TournamentPage({ lang, setPage, user }) {
  const t = window.LANG[lang];
  const { useState, useEffect } = React;
  const [events, setEvents] = useState([]);
  const [registering, setRegistering] = useState(null);
  const [regSuccess, setRegSuccess] = useState(null);
  const [regError, setRegError] = useState(null);

  useEffect(() => {
    window.API.get('/api/tournaments').then(res => {
      if (!res.error) setEvents(res.tournaments || []);
    }).catch(() => {});
  }, []);

  async function handleRegister(ev) {
    if (ev.status === 'members_only' && (!user || user.tier === 'guest')) {
      setPage('login'); return;
    }
    if (ev.status === 'full') return;
    if (!user) { setPage('login'); return; }
    setRegistering(ev.key);
    setRegError(null);
    const res = await window.API.post(`/api/tournaments/register?key=${ev.key}`, {});
    setRegistering(null);
    if (res.error) { setRegError(ev.key + ':' + res.error); }
    else { setRegSuccess(ev.key); }
  }

  const statusStyle = {
    open:         { bg:'rgba(94,132,116,0.1)',  color:'#5E8474', border:'1px solid rgba(94,132,116,0.3)', label:t.tournament_open },
    members_only: { bg:'rgba(201,168,76,0.1)',  color:'#9A7A2E', border:'1px solid rgba(201,168,76,0.3)', label:t.tournament_members_only },
    full:         { bg:'#F0EAE0',               color:'#9E8E78', border:'1px solid #DDD5C8',              label:t.tournament_full },
  };

  return (
    <div style={{ background: '#FDFAF5' }}>
      {/* Hero — competition action */}
      <section style={{ position: 'relative', minHeight: 340, display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '80px 24px 60px' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65"
            alt="" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(15,61,36,0.92) 40%,rgba(15,61,36,0.5) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{t.tournament_title}</div>
          <h1 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.1, marginBottom: 20, textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>{t.tournament_hero}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: 'rgba(245,240,232,0.82)', maxWidth: 540, lineHeight: 1.8 }}>{t.tournament_sub}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex: 1 }} />
      </section>

      <section style={{ padding: '64px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 32 }}>{t.tournament_upcoming}</div>
        {events.length === 0 && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#9E8E78' }}>Loading events...</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {events.map((ev, i) => {
            const ss = statusStyle[ev.status] || statusStyle.open;
            const isRegistering = registering === ev.key;
            const didReg = regSuccess === ev.key;
            const errMsg = regError && regError.startsWith(ev.key+':') ? regError.slice(ev.key.length+1) : null;
            return (
              <div key={i} style={{ background: '#FFFFFF', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,18,8,0.07)', border: '1px solid #EDE8DF' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 16, padding: '24px 28px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 18, fontWeight: 700, color: '#0F3D24' }}>{lang==='EN' ? ev.name_en : ev.name_zh}</span>
                      <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: ss.bg, color: ss.color, border: ss.border }}>{ss.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 3 }}>{t.tournament_date}</div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: '#0F3D24' }}>{ev.date_label || '—'}</div>
                      </div>
                    </div>
                    {errMsg && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#C0392B', marginTop:8 }}>{errMsg}</div>}
                  </div>
                  <div style={{ paddingTop: 4, display:'flex', flexDirection:'column', gap:6 }}>
                    {didReg ? (
                      <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, color:'#5E8474', letterSpacing:'0.08em' }}>✓ Registered</span>
                    ) : (
                      <button onClick={() => handleRegister(ev)} disabled={ev.status === 'full' || isRegistering}
                        style={{ background: ev.status === 'full' ? '#D6CBBA' : '#C9A84C', color: ev.status === 'full' ? '#9E8E78' : '#0F3D24', border: 'none', borderRadius: 999, padding: '12px 24px', fontFamily: "'Oswald',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: (ev.status === 'full' || isRegistering) ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}>
                        {isRegistering ? '...' : ev.status === 'full' ? t.tournament_full : t.tournament_register}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── SHOP PAGE ────────────────────────────────────────────────
function ShopPage({ lang, addToCart, user }) {
  const t = window.LANG[lang];
  const { useState, useEffect } = React;
  const [cat, setCat] = useState('all');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const url = cat === 'all' ? '/api/shop/products' : `/api/shop/products?category=${cat}`;
    setLoadingProducts(true);
    window.API.get(url)
      .then(res => { if (!res.error) setProducts(res.products || []); })
      .finally(() => setLoadingProducts(false));
  }, [cat]);

  const cats = [
    { id:'all', label:t.shop_all },
    { id:'paddles', label:t.shop_cat_paddles },
    { id:'apparel', label:t.shop_cat_apparel },
    { id:'accessories', label:t.shop_cat_accessories },
  ];

  function handleAdd(p) {
    addToCart({
      type: 'product',
      product_id: p.id,
      name: lang==='EN' ? p.name_en : p.name_zh,
      detail: lang==='EN' ? 'Merchandise' : '商品',
      price: user ? p.member_price : p.price,
      qty: 1,
    });
  }

  return (
    <div style={{ background: '#FDFAF5' }}>
      {/* Hero */}
      <section style={{ position: 'relative', padding: '80px 24px 48px', overflow: 'hidden', minHeight: 280, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.pexels.com/photos/9004558/pexels-photo-9004558.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65"
            alt="" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(15,61,36,0.92) 40%,rgba(15,61,36,0.5) 100%)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{t.shop_title}</div>
          <h1 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.1, marginBottom: 16, textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>{t.shop_hero}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: 'rgba(245,240,232,0.82)', lineHeight: 1.8 }}>{t.shop_sub}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex: 1 }} />
      </section>

      {/* Category filter */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #EDE8DF', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 0 }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{ padding: '16px 24px', border: 'none', borderBottom: cat===c.id?'2px solid #C9A84C':'2px solid transparent', background: 'none', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: cat===c.id?'#0F3D24':'#9E8E78', marginBottom: -1, transition: 'all 0.15s' }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <section style={{ padding: '40px 24px 80px', maxWidth: 1100, margin: '0 auto' }}>
        {loadingProducts && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#9E8E78', marginBottom:24 }}>Loading products...</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
          {products.map(p => {
            const badge = lang==='EN' ? p.badge_en : p.badge_zh;
            const price = user ? p.member_price : p.price;
            return (
              <div key={p.id} style={{ background: '#FFFFFF', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(26,18,8,0.07)', border: '1px solid #EDE8DF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 180, overflow: 'hidden', position: 'relative', background: '#C8DDD5' }}>
                  {p.image_url && <img src={p.image_url} alt={lang==='EN'?p.name_en:p.name_zh} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: !p.in_stock ? 'grayscale(40%)' : 'none' }} />}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,61,36,0.15)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
                    {badge && <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: '#C9A84C', color: '#0F3D24', fontWeight: 700 }}>{badge}</span>}
                    {!p.in_stock && <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.5)', color: '#D6CBBA' }}>{t.shop_sold_out}</span>}
                  </div>
                </div>
                <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 16, fontWeight: 700, color: '#0F3D24' }}>{lang==='EN'?p.name_en:p.name_zh}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#6B5D4E', lineHeight: 1.6, flex: 1 }}>{lang==='EN'?p.description_en:p.description_zh}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <div>
                      <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 20, fontWeight: 700, color: '#0F3D24' }}>HK${price}</span>
                      {user && p.member_price < p.price && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: '#5E8474', marginLeft: 6 }}>{t.shop_member_price}</span>}
                    </div>
                    <button onClick={() => p.in_stock && handleAdd(p)} disabled={!p.in_stock}
                      style={{ background: p.in_stock?'#C9A84C':'#D6CBBA', color: p.in_stock?'#0F3D24':'#9E8E78', border: 'none', borderRadius: 999, padding: '10px 20px', fontFamily: "'Oswald',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: p.in_stock?'pointer':'not-allowed' }}>
                      {p.in_stock ? t.shop_add : t.shop_sold_out}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────
function FAQPage({ lang, setPage }) {
  const t = window.LANG[lang];
  const { useState } = React;
  const [open, setOpen] = useState(null);

  const faqs = [
    { q: lang==='EN'?'Do I need to be a member to play?':'我需要成為會員才能打球嗎？', a: lang==='EN'?'No — anyone can book a court as a guest. However, members enjoy priority booking windows, 10% off court rates, zero guest fees, and other exclusive perks.':'不需要——任何人均可以訪客身份預訂球場。但會員享有優先預訂窗口、訂場9折、零賓客費及其他專屬優惠。' },
    { q: lang==='EN'?'What is the difference between DINK and FLEX membership?':'DINK與FLEX會員有什麼分別？', a: lang==='EN'?'DINK ($380/month) gives you 14-day priority booking, 10% off courts, 20% off social play, BOGO beverages, and 2-hour consecutive booking. FLEX ($280/month) gives you 7-day priority booking and the same discounts, without the beverage perk.':'DINK（$380/月）提供提前14天優先預訂、訂場9折、社交賽8折、買一送一飲品及連續2小時預訂。FLEX（$280/月）提供提前7天優先預訂及相同折扣，但不包含飲品優惠。' },
    { q: lang==='EN'?'How do I book a court?':'如何預訂球場？', a: lang==='EN'?'Click "Book" in the navigation. Select your court, session type, date and time slot, then add to cart and complete checkout.':'點擊導覽列中的「預訂」。選擇球場、課程類型、日期及時間，加入購物車後完成結帳。' },
    { q: lang==='EN'?'What is Peak vs Non-Peak pricing?':'繁忙與非繁忙時段收費有何分別？', a: lang==='EN'?'Peak hours are Mon–Fri 6pm–10pm, and all day Saturday, Sunday, and Public Holidays. Non-peak is Mon–Fri 10am–6pm. Peak sessions are HK$450; non-peak are HK$400.':'繁忙時段為週一至五下午6時至晚上10時，以及週六、日及公眾假期全天。非繁忙時段為週一至五上午10時至下午6時。' },
    { q: lang==='EN'?'Can I bring guests?':'我可以帶賓客嗎？', a: lang==='EN'?'Yes. Non-members pay a $50 guest fee per person per session. DINK and FLEX members enjoy zero guest fees.':'可以。非會員每位賓客每節收取$50賓客費。DINK及FLEX會員享有零賓客費。' },
    { q: lang==='EN'?'Do you provide paddles and equipment?':'你們有提供球拍及器材嗎？', a: lang==='EN'?'Members can trial pro-level paddles during sessions at no charge. Non-members may rent a paddle for $20 per session.':'會員可在課程中免費試用專業球拍。非會員可以每節$20租用球拍。' },
    { q: lang==='EN'?'What is your cancellation policy?':'你們的取消政策是什麼？', a: lang==='EN'?'Cancellations made 24 hours or more before the session start time are eligible for a full refund or credit. Cancellations within 24 hours are non-refundable.':'在課程開始前24小時或以上取消，可獲全額退款或積分。24小時內取消不予退款。' },
    { q: lang==='EN'?'Where are you located?':'你們在哪裡？', a: lang==='EN'?'We are located at We Go Mall, Ma On Shan, New Territories, Hong Kong. Accessible by MTR (Ma On Shan line) and multiple bus routes.':'我們位於香港新界馬鞍山We Go Mall，可乘坐港鐵馬鞍山綫或多條巴士路線前往。' },
    { q: lang==='EN'?'Do you offer coaching for beginners?':'你們有提供初學者教練課程嗎？', a: lang==='EN'?'Absolutely. Our trial class ($195, Age 10+) is the perfect introduction. We also offer beginner courses (4 sessions), kids programmes, and private lessons for all ages.':'當然有。我們的體驗課（$195，10歲或以上）是最佳入門選擇。我們亦提供初學者課程（4節）、兒童課程及各年齡私人課程。' },
    { q: lang==='EN'?'What is social play?':'什麼是社交賽？', a: lang==='EN'?'Social play is an open session where individual players are matched together by skill level. No partner needed — just show up. $200 per person (members $160).':'社交賽是按水平配對個人球員的開放賽節。無需搭檔，隨時出現即可。每人$200（會員$160）。' },
  ];

  return (
    <div style={{ background: '#FDFAF5' }}>
      <section style={{ background: '#0F3D24', padding: '80px 24px 60px', position: 'relative' }}>
        <div style={{ maxWidth: 700 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{t.faq_title}</div>
          <h1 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.1, marginBottom: 16 }}>{t.faq_hero}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#9E8E78', lineHeight: 1.8 }}>{t.faq_sub}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }}/>
      </section>

      <section style={{ padding: '64px 24px 80px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#FFFFFF', borderRadius: open===i?12:10, overflow: 'hidden', boxShadow: open===i?'0 4px 20px rgba(26,18,8,0.1)':'0 1px 4px rgba(26,18,8,0.05)', transition: 'all 0.2s', border: open===i?'1px solid rgba(201,168,76,0.3)':'1px solid #EDE8DF' }}>
              <button onClick={() => setOpen(open===i?null:i)}
                style={{ width:'100%', padding:'20px 24px', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, textAlign:'left' }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, color:'#0F3D24', lineHeight:1.4 }}>{faq.q}</span>
                <span style={{ flexShrink:0, width:24, height:24, borderRadius:'50%', background: open===i?'#0F3D24':'#F0EAE0', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', color: open===i?'#C9A84C':'#9E8E78', fontSize:16, fontWeight:300, lineHeight:1 }}>{open===i?'−':'+'}</span>
              </button>
              {open===i && <div style={{ padding:'0 24px 20px', fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#6B5D4E', lineHeight:1.8 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop:48, background:'#0F3D24', borderRadius:14, padding:'32px', textAlign:'center' }}>
          <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:20, fontWeight:700, color:'#F5F0E8', marginBottom:8 }}>{t.faq_still}</div>
          <button onClick={() => setPage('contact')} style={{ background:'#C9A84C', color:'#0F3D24', border:'none', borderRadius:999, padding:'13px 32px', fontFamily:"'Oswald',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer', marginTop:16 }}>{t.faq_contact}</button>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CoachesPage, TournamentPage, ShopPage, FAQPage });
