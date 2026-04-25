// Pickle Master — Home Page

function HomePage({ lang, setPage, addToCart }) {
  const t = window.LANG[lang];

  const testimonials = [
    { quote: lang === 'EN' ? "Pickleball has completely transformed my weekends. Easy to learn, fun, and a great way to meet new people." : "匹克球完全改變了我的週末！容易上手，又好玩，仲識到好多新朋友！", name: 'Jeffrey', detail: '32, DUPR 3.5' },
    { quote: lang === 'EN' ? "I love how inclusive pickleball is! Everyone can join and have a good time. My go-to for staying active." : "我非常喜歡打Pickleball！這項運動簡單易學，不管年齡大小都能參與。", name: 'Angel', detail: '34, Parent' },
    { quote: lang === 'EN' ? "Pickle Master is where serious players and total beginners come together. The coaching is world class." : "匹匠讓認真的球員和初學者走在一起。教練質素一流。", name: 'Ken', detail: '43, Designer' },
  ];
  const rules = [
    { title: t.home_rule1_title, body: t.home_rule1 },
    { title: t.home_rule2_title, body: t.home_rule2 },
    { title: t.home_rule3_title, body: t.home_rule3 },
    { title: t.home_rule4_title, body: t.home_rule4 },
    { title: t.home_rule5_title, body: t.home_rule5 },
  ];

  return (
    <div style={{ background: '#F5F0E8' }}>
      {/* ── HERO ── */}
      <section style={{ background: '#0F3D24', minHeight: '88vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 24px' }}>
        {/* Court pattern bg */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04 }}>
          <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
            <rect x="100" y="60" width="600" height="380" fill="none" stroke="#C9A84C" strokeWidth="2"/>
            <line x1="400" y1="60" x2="400" y2="440" stroke="#C9A84C" strokeWidth="2"/>
            <line x1="100" y1="250" x2="700" y2="250" stroke="#C9A84C" strokeWidth="3"/>
            <rect x="100" y="60" width="132" height="380" fill="#C9A84C" opacity="0.3"/>
            <rect x="568" y="60" width="132" height="380" fill="#C9A84C" opacity="0.3"/>
          </svg>
        </div>
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 700 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20 }}>{t.home_eyebrow}</div>
          <h1 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(40px,7vw,80px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.1, letterSpacing: '0.03em', marginBottom: 24, whiteSpace: 'pre-line' }}>{t.home_hero_title}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(16px,2vw,20px)', color: '#9E8E78', lineHeight: 1.6, maxWidth: 500, margin: '0 auto 40px' }}>{t.home_hero_sub}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('book')} style={{ background: '#C9A84C', color: '#0F3D24', border: 'none', borderRadius: 999, padding: '16px 36px', fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 20px rgba(201,168,76,0.4)' }}>{t.home_cta_book}</button>
            <button onClick={() => setPage('member')} style={{ background: 'transparent', color: '#F5F0E8', border: '1.5px solid rgba(245,240,232,0.4)', borderRadius: 999, padding: '16px 36px', fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{t.home_cta_member}</button>
          </div>
        </div>
        {/* Gold bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
      </section>

      {/* ── HOW TO START ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 12, textAlign: 'center' }}>{t.home_how_title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32, marginTop: 32 }}>
          {[
            { num: '01', title: t.home_step1_title, desc: t.home_step1_desc, action: () => setPage('member') },
            { num: '02', title: t.home_step2_title, desc: t.home_step2_desc, action: () => setPage('book') },
            { num: '03', title: t.home_step3_title, desc: t.home_step3_desc, action: () => setPage('book') },
            { num: '04', title: t.home_step4_title, desc: t.home_step4_desc, action: () => setPage('book') },
          ].map(({ num, title, desc, action }) => (
            <div key={num} onClick={action} style={{ cursor: 'pointer' }}>
              <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 48, fontWeight: 700, color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: 8 }}>{num}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#0F3D24', marginBottom: 8 }}>{title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#9E8E78', lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LESSONS ── */}
      <section style={{ background: '#0F3D24', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{t.home_lessons_title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 2 }}>
            {[
              { title: t.home_academy_title, desc: t.home_academy_desc, meta: t.home_players },
              { title: t.home_private_title, desc: t.home_private_desc, meta: t.home_1on1 },
              { title: t.home_friends_title, desc: t.home_friends_desc, meta: t.home_upto6 },
            ].map(({ title, desc, meta }) => (
              <div key={title} onClick={() => setPage('book')} style={{ background: 'rgba(255,255,255,0.04)', padding: '40px 32px', cursor: 'pointer', borderLeft: '1px solid rgba(201,168,76,0.1)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}>
                <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 22, fontWeight: 700, color: '#F5F0E8', marginBottom: 12, lineHeight: 1.2 }}>{title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#9E8E78', lineHeight: 1.7, marginBottom: 20 }}>{desc}</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 16 }}>{meta}</div>
                <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginTop: 16, display: 'inline-block', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>{t.home_know_more} →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 40, textAlign: 'center' }}>{t.home_testimonials_title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
          {testimonials.map(({ quote, name, detail }) => (
            <div key={name} style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 4px 16px rgba(15,61,36,0.08)' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontStyle: 'italic', color: '#1A1208', lineHeight: 1.8, marginBottom: 20 }}>"{quote}"</div>
              <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 14, fontWeight: 700, color: '#0F3D24' }}>{name}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9E8E78', marginTop: 2 }}>{detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COURT VISUAL ── */}
      <section style={{ background: '#1C4F3A', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12 }}>{lang === 'EN' ? 'Our Courts' : '我們的球場'}</div>
            <h2 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.2, marginBottom: 20 }}>{lang === 'EN' ? 'Two Dedicated Courts' : '兩個專屬球場'}</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#9E8E78', lineHeight: 1.8, marginBottom: 32 }}>{lang === 'EN' ? 'Court 1 and Court 2, built to championship standards. Each court features premium flooring, professional lighting, and the Pickle Master marking in forest green and gold.' : '1號及2號球場均按錦標賽標準建造，配備優質地板、專業照明及匹匠品牌標記。'}</p>
            <button onClick={() => setPage('book')} style={{ background: '#C9A84C', color: '#0F3D24', border: 'none', borderRadius: 999, padding: '14px 32px', fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{t.home_cta_book}</button>
          </div>
          {/* Court diagram */}
          <div style={{ background: '#5E8474', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', position: 'relative', height: 260, border: '3px solid rgba(201,168,76,0.3)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: '20%', height: '100%', background: '#C4A87A', opacity: 0.85 }} />
            <div style={{ position: 'absolute', right: 0, top: 0, width: '20%', height: '100%', background: '#C4A87A', opacity: 0.85 }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, width: 2, height: '100%', background: 'rgba(255,255,255,0.5)' }} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '60%', height: 4, background: '#fff', borderRadius: 2 }} />
            {['20%','80%'].map(l => <div key={l} style={{ position: 'absolute', left: l, top: 0, width: 2, height: '100%', background: 'rgba(255,255,255,0.3)' }} />)}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>PICKLE MASTER</span>
            </div>
            <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
              <img src="../assets/logo.jpg" alt="PM" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(201,168,76,0.6)', opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PICKLEBALL 101 ── */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 12 }}>{t.home_101_sub}</div>
          <h2 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#0F3D24' }}>{t.home_101_title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {rules.map(({ title, body }) => (
            <div key={title} style={{ background: '#fff', borderRadius: 10, padding: '24px', boxShadow: '0 2px 10px rgba(15,61,36,0.08)', borderTop: '3px solid #C9A84C' }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0F3D24', marginBottom: 10 }}>{title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#9E8E78', lineHeight: 1.75 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: '#0F3D24', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#F5F0E8', marginBottom: 24 }}>{t.home_about_title}</div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: '#9E8E78', lineHeight: 1.9, marginBottom: 32 }}>{t.home_about}</p>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C' }}>{t.home_address} · {t.home_address_val}</div>
          <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 22, fontWeight: 700, color: '#C9A84C', marginTop: 32, letterSpacing: '0.05em' }}>{t.home_tagline}</div>
        </div>
      </section>
    </div>
  );
}

window.HomePage = HomePage;
