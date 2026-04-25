// Pickle Master — Member Page (Light Theme)

function MemberPage({ lang, setPage, user }) {
  const t = window.LANG[lang];
  const { useState } = React;
  const [showHow, setShowHow] = useState(false);

  const dinkFeatures = [t.mf_d1,t.mf_d2,t.mf_d3,t.mf_d4,t.mf_d5,t.mf_d6,t.mf_d7,t.mf_d8,t.mf_d9];
  const flexFeatures = [t.mf_f1,t.mf_f2,t.mf_f3,t.mf_f4,t.mf_f5,t.mf_f6,t.mf_f7];
  const nmFeatures   = [t.mf_nm1,t.mf_nm2,t.mf_nm3,t.mf_nm4,t.mf_nm5];

  return (
    <div style={{ background: '#FDFAF5' }}>

      {/* Hero — pickleball action bg */}
      <section style={{ position: 'relative', padding: '100px 24px 80px', textAlign: 'center', overflow: 'hidden', minHeight: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src="https://images.pexels.com/photos/9004558/pexels-photo-9004558.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65"
            alt="" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,rgba(15,61,36,0.88),rgba(15,61,36,0.72))' }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', marginBottom:12 }}>{t.member_title}</div>
          <h1 style={{ fontFamily:"'Playfair Display SC',serif", fontSize:'clamp(32px,5vw,60px)', fontWeight:700, color:'#F5F0E8', lineHeight:1.1, marginBottom:20, textShadow:'0 2px 16px rgba(0,0,0,0.3)' }}>{t.member_hero}</h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:'rgba(245,240,232,0.8)', maxWidth:580, margin:'0 auto 16px', lineHeight:1.8 }}>{t.member_sub}</p>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#C9A84C', fontStyle:'italic' }}>{t.member_no_commit}</div>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex:1 }}/>
      </section>

      {/* Membership tiers */}
      <section style={{ padding:'80px 24px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>
          <TierCardLight eyebrow={t.member_dink_title} price={t.member_dink_price} features={dinkFeatures} highlighted ctaLabel={t.member_join} onCta={() => setPage('login')} lang={lang} />
          <TierCardLight eyebrow={t.member_flex_title} price={t.member_flex_price} features={flexFeatures} ctaLabel={t.member_waitlist} ctaDisabled ctaNote={lang==='EN'?'FLEX is currently full. Join the waitlist.':'FLEX名額已滿，請加入候補名單。'} onCta={() => setPage('login')} lang={lang} />
          <TierCardLight eyebrow={t.member_nonmember_title} price={lang==='EN'?'No fee':'免費'} features={nmFeatures} onCta={() => setPage('book')} ctaLabel={lang==='EN'?'Book as Guest':'以訪客身份預訂'} muted lang={lang} />
        </div>
      </section>

      {/* How to book */}
      <section style={{ background:'#F0EAE0', padding:'64px 24px', borderTop:'1px solid #DDD5C8', borderBottom:'1px solid #DDD5C8' }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#9E8E78', marginBottom:12 }}>{t.member_how_title}</div>
          <h2 style={{ fontFamily:"'Playfair Display SC',serif", fontSize:'clamp(24px,3vw,36px)', fontWeight:700, color:'#0F3D24', marginBottom:16 }}>{t.member_how_sub}</h2>
          <div style={{ display:'flex', gap:0, justifyContent:'center', flexWrap:'wrap', marginTop:40 }}>
            {[
              { num:'1', label: lang==='EN'?'Create Account':'創建帳戶', desc: lang==='EN'?'Register and verify your email.':'登記並驗證電郵。' },
              { num:'2', label: lang==='EN'?'Choose Session':'選擇課程', desc: lang==='EN'?'Pick your court, type, date and time.':'選擇球場、類型、日期及時間。' },
              { num:'3', label: lang==='EN'?'Checkout':'結帳', desc: lang==='EN'?'Secure payment via card or Apple/Google Pay.':'以信用卡或Apple/Google Pay付款。' },
              { num:'4', label: lang==='EN'?'Play!':'開球！', desc: lang==='EN'?'Show up and enjoy your session.':'出現並享受你的課程。' },
            ].map(({ num, label, desc }, i, arr) => (
              <React.Fragment key={num}>
                <div style={{ textAlign:'center', padding:'0 24px', maxWidth:160 }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:'#0F3D24', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontFamily:"'Playfair Display SC',serif", fontSize:18, fontWeight:700, color:'#C9A84C' }}>{num}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, color:'#0F3D24', marginBottom:6 }}>{label}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#6B5D4E', lineHeight:1.6 }}>{desc}</div>
                </div>
                {i < arr.length-1 && <div style={{ alignSelf:'flex-start', paddingTop:24, color:'#C9A84C', fontSize:20, fontWeight:300 }}>→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Courts CTA — with real court photo */}
      <section style={{ padding:'64px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div className="courts-cta-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            {[{id:'court1', label:t.member_court1},{id:'court2', label:t.member_court2}].map(({ id, label }) => (
              <div key={id} style={{ background:'#FFFFFF', border:'1px solid #EDE8DF', borderRadius:14, overflow:'hidden', boxShadow:'0 4px 16px rgba(26,18,8,0.07)' }}>
                <div style={{ height: 160, overflow: 'hidden', position: 'relative', background: '#C8DDD5' }}>
                  <img src="../assets/Court_layout.jpeg" alt={label} loading="lazy"
                    style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, background:'rgba(15,61,36,0.3)' }} />
                  <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:"'Playfair Display SC',serif", fontSize:18, fontWeight:700, color:'#F5F0E8', textShadow:'0 1px 8px rgba(0,0,0,0.5)' }}>{label}</span>
                  </div>
                </div>
                <div style={{ padding:'20px 24px', textAlign:'center' }}>
                  <button onClick={() => setPage('book')} style={{ background:'#C9A84C', color:'#0F3D24', border:'none', borderRadius:999, padding:'12px 28px', fontFamily:"'Oswald',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer' }}>{t.member_book_now}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TierCardLight({ eyebrow, price, features, highlighted, muted, ctaLabel, ctaDisabled, ctaNote, onCta, lang }) {
  return (
    <div style={{ background: highlighted ? '#0F3D24' : '#FFFFFF', borderRadius:14, overflow:'hidden', boxShadow: highlighted ? '0 8px 32px rgba(15,61,36,0.2)' : '0 4px 16px rgba(26,18,8,0.07)', border: highlighted ? '1.5px solid #C9A84C' : '1.5px solid #EDE8DF', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'32px 28px 24px', borderBottom:`1px solid ${highlighted?'rgba(201,168,76,0.2)':'#F0EAE0'}` }}>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color: highlighted?'#C9A84C':muted?'#9E8E78':'#5E8474', marginBottom:8 }}>{eyebrow}</div>
        <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:28, fontWeight:700, color: highlighted?'#F5F0E8':'#0F3D24' }}>{price}</div>
      </div>
      <div style={{ padding:'24px 28px', flex:1, display:'flex', flexDirection:'column', gap:12 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
            <span style={{ flexShrink:0, marginTop:2 }}>
              {muted
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9E8E78" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                : <window.IconCheck />}
            </span>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color: highlighted?'#D6CBBA':muted?'#9E8E78':'#1A1208', lineHeight:1.5 }}>{f}</span>
          </div>
        ))}
        {ctaNote && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#9E8E78', fontStyle:'italic', marginTop:8, lineHeight:1.5 }}>{ctaNote}</div>}
      </div>
      <div style={{ padding:'0 28px 28px' }}>
        <button onClick={onCta} style={{ width:'100%', background: ctaDisabled?'#D6CBBA':highlighted?'#C9A84C':muted?'transparent':'#0F3D24', color: ctaDisabled?'#9E8E78':highlighted?'#0F3D24':muted?'#0F3D24':'#F5F0E8', border: muted?'1.5px solid #0F3D24':'none', borderRadius:999, padding:'14px 0', fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor: ctaDisabled?'not-allowed':'pointer' }}>
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

window.MemberPage = MemberPage;
