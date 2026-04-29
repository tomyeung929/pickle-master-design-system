// Pickle Master — Home Page (Light Theme + Media)

function HomePage({ lang, setPage, addToCart }) {
  const { useState, useEffect } = React;
  const t = window.LANG[lang];

  const defaultTestimonials = [
    { quote_en: "Pickleball has completely transformed my weekends. Easy to learn, fun, and a great way to meet new people.", quote_zh: "匹克球完全改變了我的週末！容易上手，又好玩，仲識到好多新朋友！", name: 'Jeffrey', detail: '32, DUPR 3.5', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { quote_en: "I love how inclusive pickleball is! Everyone can join and have a good time. My go-to for staying active.", quote_zh: "我非常喜歡打Pickleball！這項運動簡單易學，不管年齡大小都能參與。", name: 'Angel', detail: '34, Parent', avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { quote_en: "Pickle Master is where serious players and total beginners come together. The coaching is world class.", quote_zh: "匹匠讓認真的球員和初學者走在一起。教練質素一流。", name: 'Ken', detail: '43, Designer', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];

  const [rawTestimonials, setRawTestimonials] = useState(defaultTestimonials);
  useEffect(() => {
    window.fetchSiteContent().then(d => { if (d.testimonials) setRawTestimonials(d.testimonials); });
  }, []);

  const testimonials = rawTestimonials.map(item => ({ ...item, quote: lang === 'EN' ? item.quote_en : item.quote_zh }));

  const rules = [
    { title: t.home_rule1_title, body: t.home_rule1 },
    { title: t.home_rule2_title, body: t.home_rule2 },
    { title: t.home_rule3_title, body: t.home_rule3 },
    { title: t.home_rule4_title, body: t.home_rule4 },
    { title: t.home_rule5_title, body: t.home_rule5 },
  ];

  // Asian players in pickleball action — all lazy loaded
  const lessonImgs = [
    'https://images.pexels.com/photos/9004558/pexels-photo-9004558.jpeg?auto=compress&cs=tinysrgb&w=700&q=72',
    'https://images.pexels.com/photos/6765846/pexels-photo-6765846.jpeg?auto=compress&cs=tinysrgb&w=700&q=72',
    'https://images.pexels.com/photos/5568971/pexels-photo-5568971.jpeg?auto=compress&cs=tinysrgb&w=700&q=72',
  ];

  return (
    <div style={{ background: '#FDFAF5' }}>

      {/* ══ HERO — VIDEO BACKGROUND ══ */}
      <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '80px 24px' }}>

        {/* VIDEO — preload="none" = zero bytes on initial load; poster shows instantly */}
        <video autoPlay muted loop playsInline preload="none"
          poster="../assets/Court_layout.jpeg"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          {/* Pexels — Aerial Pickleball Match on Court (ID 32041192) */}
          <source src="https://videos.pexels.com/video-files/32041192/32041192-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/32041192/32041192-sd_960_540_25fps.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(15,61,36,0.82) 0%,rgba(15,61,36,0.58) 50%,rgba(15,61,36,0.75) 100%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 700 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20 }}>{t.home_eyebrow}</div>
          <h1 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(40px,7vw,80px)', fontWeight: 700, color: '#F5F0E8', lineHeight: 1.1, letterSpacing: '0.03em', marginBottom: 24, whiteSpace: 'pre-line', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>{t.home_hero_title}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(16px,2vw,20px)', color: 'rgba(245,240,232,0.82)', lineHeight: 1.6, maxWidth: 500, margin: '0 auto 40px' }}>{t.home_hero_sub}</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setPage('book')} style={{ background: '#C9A84C', color: '#0F3D24', border: 'none', borderRadius: 999, padding: '16px 36px', fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 24px rgba(201,168,76,0.5)' }}>{t.home_cta_book}</button>
            <button onClick={() => setPage('member')} style={{ background: 'transparent', color: '#F5F0E8', border: '1.5px solid rgba(245,240,232,0.5)', borderRadius: 999, padding: '16px 36px', fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>{t.home_cta_member}</button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom,transparent,#FDFAF5)', zIndex: 2 }} />
      </section>

      {/* ══ HOW TO START ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 12, textAlign: 'center' }}>{t.home_how_title}</div>
        <div className="howto-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32, marginTop: 32 }}>
          {[
            { num: '01', title: t.home_step1_title, desc: t.home_step1_desc, action: () => setPage('member') },
            { num: '02', title: t.home_step2_title, desc: t.home_step2_desc, action: () => setPage('book') },
            { num: '03', title: t.home_step3_title, desc: t.home_step3_desc, action: () => setPage('book') },
            { num: '04', title: t.home_step4_title, desc: t.home_step4_desc, action: () => setPage('book') },
          ].map(({ num, title, desc, action }) => (
            <div key={num} onClick={action} style={{ cursor: 'pointer' }}>
              <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 48, fontWeight: 700, color: 'rgba(15,61,36,0.08)', lineHeight: 1, marginBottom: 8 }}>{num}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#0F3D24', marginBottom: 8 }}>{title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#6B5D4E', lineHeight: 1.7 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ LESSONS — IMAGE CARDS ══ */}
      <section style={{ background: '#F0EAE0', padding: '80px 24px', borderTop: '1px solid #DDD5C8', borderBottom: '1px solid #DDD5C8' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 32 }}>{t.home_lessons_title}</div>
          <div className="lessons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {[
              { title: t.home_academy_title, desc: t.home_academy_desc, meta: t.home_players, img: lessonImgs[0] },
              { title: t.home_private_title, desc: t.home_private_desc, meta: t.home_1on1,    img: lessonImgs[1] },
              { title: t.home_friends_title, desc: t.home_friends_desc, meta: t.home_upto6,   img: lessonImgs[2] },
            ].map(({ title, desc, meta, img }) => (
              <div key={title} onClick={() => setPage('book')}
                style={{ background: '#FFFFFF', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 12px rgba(26,18,8,0.06)', border: '1px solid #EDE8DF', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,18,8,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(26,18,8,0.06)'; }}>
                <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: '#C8DDD5' }}>
                  <img src={img} alt={title} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 55%,rgba(15,61,36,0.3) 100%)' }} />
                </div>
                <div style={{ padding: '28px 28px 24px' }}>
                  <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 20, fontWeight: 700, color: '#0F3D24', marginBottom: 10, lineHeight: 1.2 }}>{title}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#6B5D4E', lineHeight: 1.7, marginBottom: 20 }}>{desc}</div>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E8E78', borderTop: '1px solid #EDE8DF', paddingTop: 14 }}>{meta}</div>
                  <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', marginTop: 14, display: 'inline-block', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>{t.home_know_more} →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS — HK MEMBER FACES ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 40, textAlign: 'center' }}>{t.home_testimonials_title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
          {testimonials.map(({ quote, name, detail, avatar }) => (
            <div key={name} style={{ background: '#FFFFFF', borderRadius: 12, padding: 28, boxShadow: '0 2px 12px rgba(26,18,8,0.06)', border: '1px solid #EDE8DF' }}>
              <div style={{ width: 24, height: 3, background: '#C9A84C', borderRadius: 2, marginBottom: 18 }} />
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontStyle: 'italic', color: '#1A1208', lineHeight: 1.8, marginBottom: 22 }}>"{quote}"</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={avatar} alt={name} loading="lazy"
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid #C9A84C', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 14, fontWeight: 700, color: '#0F3D24' }}>{name}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9E8E78', marginTop: 2 }}>{detail}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ COURT — REAL PHOTO ══ */}
      <section style={{ background: '#EBF2EE', padding: '80px 24px', borderTop: '1px solid #C8DDD5', borderBottom: '1px solid #C8DDD5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5E8474', marginBottom: 12 }}>{lang === 'EN' ? 'Our Courts' : '我們的球場'}</div>
            <h2 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#0F3D24', lineHeight: 1.2, marginBottom: 20 }}>{lang === 'EN' ? 'Two Dedicated Courts' : '兩個專屬球場'}</h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: '#4A6B5C', lineHeight: 1.8, marginBottom: 32 }}>{lang === 'EN' ? 'Court 1 and Court 2, built to championship standards. Each court features premium flooring, professional lighting, and the Pickle Master marking in forest green and gold.' : '1號及2號球場均按錦標賽標準建造，配備優質地板、專業照明及匹匠品牌標記。'}</p>
            <button onClick={() => setPage('book')} style={{ background: '#0F3D24', color: '#C9A84C', border: 'none', borderRadius: 999, padding: '14px 32px', fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{t.home_cta_book}</button>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(15,61,36,0.18)', border: '3px solid rgba(201,168,76,0.35)', position: 'relative' }}>
            <img src="../assets/Court_layout.jpeg" alt="Pickle Master Court Layout" loading="lazy"
              style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 14, right: 14, background: 'rgba(15,61,36,0.88)', borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(4px)' }}>
              <img src="/assets/logo.jpg" alt="PM" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #C9A84C' }} />
              <span style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>Pickle Master HK</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PICKLEBALL 101 ══ */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 12 }}>{t.home_101_sub}</div>
          <h2 style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#0F3D24' }}>{t.home_101_title}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {rules.map(({ title, body }) => (
            <div key={title} style={{ background: '#FFFFFF', borderRadius: 10, padding: '24px', boxShadow: '0 2px 10px rgba(26,18,8,0.05)', border: '1px solid #EDE8DF', borderTop: '3px solid #C9A84C' }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0F3D24', marginBottom: 10 }}>{title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#6B5D4E', lineHeight: 1.75 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT — IMAGE BACKGROUND ══ */}
      <section style={{ position: 'relative', padding: '100px 24px', overflow: 'hidden', borderTop: '1px solid #DDD5C8' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1400&q=60"
            alt="" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(240,234,224,0.93)' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 40, height: 3, background: '#C9A84C', borderRadius: 2, margin: '0 auto 28px' }} />
          <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#0F3D24', marginBottom: 24 }}>{t.home_about_title}</div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: '#4A3B2C', lineHeight: 1.9, marginBottom: 32 }}>{t.home_about}</p>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9E8E78' }}>{t.home_address} · {(window.PM_CONTENT.contact_info && (lang === 'EN' ? window.PM_CONTENT.contact_info.address_en : window.PM_CONTENT.contact_info.address_zh)) || t.home_address_val}</div>
          <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 22, fontWeight: 700, color: '#C9A84C', marginTop: 32, letterSpacing: '0.05em' }}>{t.home_tagline}</div>
        </div>
      </section>

    </div>
  );
}

window.HomePage = HomePage;
