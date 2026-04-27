// Pickle Master — Social, Private, Contact, Login, Account Pages (Light Theme)

// ─── SOCIAL PAGE ─────────────────────────────────────────────
function SocialPage({ lang, setPage, addToCart, user }) {
  const t = window.LANG[lang];
  const { useState } = React;
  const [added, setAdded] = useState(false);
  const price = user ? 160 : 200;

  function book() {
    addToCart({ name: t.nav_social, detail: lang==='EN'?'Open session — next available':'開放課節 — 下一個可用時段', price, qty:1 });
    setAdded(true); setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ background:'#FDFAF5' }}>
      {/* Hero — group of HK players */}
      <section style={{ position:'relative', minHeight:360, display:'flex', alignItems:'center', overflow:'hidden', padding:'80px 24px 60px' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src="https://images.pexels.com/photos/5568971/pexels-photo-5568971.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65"
            alt="" loading="lazy"
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(15,61,36,0.9) 40%,rgba(15,61,36,0.5) 100%)' }} />
        </div>
        <div style={{ position:'relative', zIndex:1, maxWidth:700, margin:'0 auto' }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', marginBottom:12 }}>{t.social_title}</div>
          <h1 style={{ fontFamily:"'Playfair Display SC',serif", fontSize:'clamp(32px,5vw,60px)', fontWeight:700, color:'#F5F0E8', lineHeight:1.1, marginBottom:20, textShadow:'0 2px 16px rgba(0,0,0,0.3)' }}>{t.social_hero}</h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:'rgba(245,240,232,0.8)', maxWidth:520, lineHeight:1.8 }}>{t.social_desc}</p>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex:1 }}/>
      </section>

      {/* How it works */}
      <section style={{ padding:'80px 24px', maxWidth:900, margin:'0 auto' }}>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#9E8E78', marginBottom:40, textAlign:'center' }}>{t.social_how_title}</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:24 }}>
          {[
            { num:'01', title:t.social_s1_title, body:t.social_s1 },
            { num:'02', title:t.social_s2_title, body:t.social_s2 },
            { num:'03', title:t.social_s3_title, body:t.social_s3 },
          ].map(({ num, title, body }) => (
            <div key={num} style={{ background:'#FFFFFF', borderRadius:12, padding:'28px', boxShadow:'0 2px 12px rgba(26,18,8,0.06)', border:'1px solid #EDE8DF', borderTop:'3px solid #C9A84C' }}>
              <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:36, fontWeight:700, color:'rgba(15,61,36,0.08)', lineHeight:1, marginBottom:8 }}>{num}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:'#0F3D24', marginBottom:10 }}>{title}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#6B5D4E', lineHeight:1.75 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing + CTA */}
      <section style={{ background:'#F0EAE0', padding:'64px 24px', borderTop:'1px solid #DDD5C8' }}>
        <div style={{ maxWidth:600, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#9E8E78', marginBottom:16 }}>{t.social_price_title}</div>
          <div style={{ display:'flex', gap:24, justifyContent:'center', marginBottom:40, flexWrap:'wrap' }}>
            {[
              { label:t.social_nonmember, price:'HK$200', sub:lang==='EN'?'per session':'每節' },
              { label:t.social_member, price:'HK$160', sub:lang==='EN'?'per session (DINK/FLEX)':'每節（DINK/FLEX）' },
            ].map(({ label, price:p, sub }) => (
              <div key={label} style={{ background:'#FFFFFF', border:'1px solid #DDD5C8', borderRadius:12, padding:'24px 32px', minWidth:180, boxShadow:'0 2px 8px rgba(26,18,8,0.05)' }}>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9E8E78', marginBottom:8 }}>{label}</div>
                <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:32, fontWeight:700, color:'#0F3D24', marginBottom:4 }}>{p}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:'#9E8E78' }}>{sub}</div>
              </div>
            ))}
          </div>
          <button onClick={book} style={{ background:'#0F3D24', color:'#C9A84C', border:'none', borderRadius:999, padding:'16px 48px', fontFamily:"'Oswald',sans-serif", fontSize:14, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', cursor:'pointer', boxShadow:'0 4px 20px rgba(15,61,36,0.2)' }}>
            {added ? `✓ ${t.book_cart_added}` : t.social_book}
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── PRIVATE PAGE ─────────────────────────────────────────────
function PrivatePage({ lang, setPage }) {
  const t = window.LANG[lang];
  const partners = ['LVMH','UNIQLO','SCMP','UBS','Richemont'];
  const offerings = [
    { title:t.private_w1_title, body:t.private_w1 },
    { title:t.private_w2_title, body:t.private_w2 },
    { title:t.private_w3_title, body:t.private_w3 },
  ];

  return (
    <div style={{ background:'#FDFAF5' }}>
      {/* Hero — 1-on-1 coaching */}
      <section style={{ position:'relative', minHeight:380, display:'flex', alignItems:'center', overflow:'hidden', padding:'80px 24px 60px' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src="https://images.pexels.com/photos/6765846/pexels-photo-6765846.jpeg?auto=compress&cs=tinysrgb&w=1400&q=65"
            alt="" loading="lazy"
            style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,rgba(15,61,36,0.92) 45%,rgba(15,61,36,0.4) 100%)' }} />
        </div>
        <div style={{ position:'relative', zIndex:1, maxWidth:700 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', marginBottom:12 }}>{t.private_title}</div>
          <h1 style={{ fontFamily:"'Playfair Display SC',serif", fontSize:'clamp(28px,4vw,52px)', fontWeight:700, color:'#F5F0E8', lineHeight:1.15, marginBottom:20, textShadow:'0 2px 16px rgba(0,0,0,0.3)' }}>{t.private_hero}</h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:'rgba(245,240,232,0.8)', maxWidth:540, lineHeight:1.8, marginBottom:32 }}>{t.private_desc}</p>
          <button onClick={() => setPage('contact')} style={{ background:'#C9A84C', color:'#0F3D24', border:'none', borderRadius:999, padding:'15px 36px', fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', cursor:'pointer' }}>{t.private_enquire}</button>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex:1 }}/>
      </section>

      {/* Partners */}
      <section style={{ background:'#F0EAE0', padding:'32px 24px', borderBottom:'1px solid #DDD5C8' }}>
        <div style={{ maxWidth:1000, margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'#9E8E78', marginBottom:20 }}>{t.private_trusted}</div>
          <div style={{ display:'flex', gap:32, justifyContent:'center', flexWrap:'wrap', alignItems:'center' }}>
            {partners.map(p => (
              <div key={p} style={{ fontFamily:"'Playfair Display SC',serif", fontSize:16, fontWeight:700, color:'#9E8E78', letterSpacing:'0.08em' }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section style={{ padding:'80px 24px', maxWidth:1100, margin:'0 auto' }}>
        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#9E8E78', marginBottom:40, textAlign:'center' }}>{t.private_what_title}</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>
          {offerings.map(({ title, body }) => (
            <div key={title} style={{ background:'#FFFFFF', borderRadius:12, padding:'32px', boxShadow:'0 2px 12px rgba(26,18,8,0.06)', border:'1px solid #EDE8DF' }}>
              <div style={{ width:40, height:40, background:'rgba(201,168,76,0.12)', borderRadius:8, marginBottom:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:'#0F3D24', marginBottom:10 }}>{title}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#6B5D4E', lineHeight:1.75 }}>{body}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:48 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:12, color:'#9E8E78', marginBottom:8 }}>{t.private_class_price}</div>
          <button onClick={() => setPage('contact')} style={{ background:'#0F3D24', color:'#F5F0E8', border:'none', borderRadius:999, padding:'15px 40px', fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', cursor:'pointer' }}>{t.private_enquire}</button>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────
function ContactPage({ lang }) {
  const t = window.LANG[lang];
  const { useState } = React;
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await window.API.post('/api/contact', form);
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    setSent(true);
  }

  return (
    <div style={{ background:'#FDFAF5' }}>
      {/* Hero */}
      <section style={{ position:'relative', padding:'64px 24px 48px', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <img src="https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1400&q=60"
            alt="" loading="lazy"
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
          <div style={{ position:'absolute', inset:0, background:'rgba(15,61,36,0.88)' }} />
        </div>
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', marginBottom:12 }}>{t.contact_title}</div>
          <h1 style={{ fontFamily:"'Playfair Display SC',serif", fontSize:'clamp(28px,4vw,52px)', fontWeight:700, color:'#F5F0E8' }}>{t.contact_hero}</h1>
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)', zIndex:1 }}/>
      </section>

      <section style={{ padding:'64px 24px', maxWidth:1000, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 360px', gap:48 }} className="contact-main-grid">
        <div>
          {sent ? (
            <div style={{ background:'#FFFFFF', borderRadius:12, padding:'40px', textAlign:'center', boxShadow:'0 4px 16px rgba(26,18,8,0.07)', border:'1px solid #EDE8DF' }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'#0F3D24', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:20, fontWeight:700, color:'#0F3D24' }}>{t.contact_sent}</div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {[
                { key:'name', label:t.contact_name, type:'text', ph:'Wing-Sze Lam' },
                { key:'email', label:t.contact_email, type:'email', ph:'you@example.com' },
                { key:'subject', label:t.contact_subject, type:'text', ph:lang==='EN'?'Court enquiry':'場地查詢' },
              ].map(({ key, label, type, ph }) => (
                <div key={key}>
                  <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9E8E78', marginBottom:6 }}>{label}</div>
                  <input required type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f=>({...f,[key]:e.target.value}))}
                    style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #D6CBBA', borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#1A1208', background:'#fff', outline:'none', boxSizing:'border-box' }} />
                </div>
              ))}
              <div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9E8E78', marginBottom:6 }}>{t.contact_message}</div>
                <textarea required rows={5} value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))}
                  style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #D6CBBA', borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#1A1208', background:'#fff', outline:'none', resize:'vertical', boxSizing:'border-box' }} />
              </div>
              {error && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#C0392B', background:'#FEF0F0', border:'1px solid #F5C6CB', borderRadius:6, padding:'10px 14px' }}>{error}</div>}
              <button type="submit" disabled={loading} style={{ background: loading ? '#9E8E78' : '#C9A84C', color:'#0F3D24', border:'none', borderRadius:999, padding:'15px 0', fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? '...' : t.contact_send}</button>
            </form>
          )}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
          {[
            { label:t.contact_address_title, value:t.contact_address },
            { label:t.contact_hours_title, value:t.contact_hours },
          ].map(({ label, value }) => (
            <div key={label} style={{ background:'#FFFFFF', borderRadius:12, padding:'24px', boxShadow:'0 2px 10px rgba(26,18,8,0.06)', border:'1px solid #EDE8DF' }}>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', marginBottom:10 }}>{label}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#1A1208', lineHeight:1.8, whiteSpace:'pre-line' }}>{value}</div>
            </div>
          ))}
          <div style={{ background:'#0F3D24', borderRadius:12, padding:'24px' }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', marginBottom:12 }}>{t.contact_follow}</div>
            <div style={{ display:'flex', gap:12 }}>
              {['Instagram','Facebook'].map(s => (
                <a key={s} href="#" style={{ background:'rgba(201,168,76,0.12)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:8, padding:'10px 16px', fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none' }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── LOGIN / REGISTER PAGE ────────────────────────────────────
function LoginPage({ lang, setUser, setPage }) {
  const t = window.LANG[lang];
  const { useState } = React;
  const [mode, setMode]     = useState('login');
  const [form, setForm]     = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };
    const res = await window.API.post(endpoint, body);
    setLoading(false);
    if (res.error) { setError(res.error); return; }
    window.API.saveToken(res.session.access_token, res.user);
    setUser(res.user);
    setPage('account');
  }

  return (
    <div style={{ background:'#FDFAF5', minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'48px 24px' }}>
      <div style={{ width:'100%', maxWidth:440 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <img src="../assets/logo.jpg" alt="PM" style={{ width:64, height:64, borderRadius:'50%', objectFit:'cover', border:'2px solid #C9A84C', marginBottom:16 }}/>
          <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:24, fontWeight:700, color:'#0F3D24' }}>{mode==='login'?t.login_title:t.register_title}</div>
        </div>
        <div style={{ background:'#FFFFFF', borderRadius:16, boxShadow:'0 8px 32px rgba(26,18,8,0.1)', border:'1px solid #EDE8DF', overflow:'hidden' }}>
          <div style={{ display:'flex', borderBottom:'1px solid #EDE8DF' }}>
            {[['login',t.login_title],['register',t.register_title]].map(([m, label]) => (
              <button key={m} onClick={() => setMode(m)} style={{ flex:1, padding:'16px', border:'none', background: mode===m?'#FDFAF5':'#FFFFFF', cursor:'pointer', fontFamily:"'Oswald',sans-serif", fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', color: mode===m?'#0F3D24':'#9E8E78', borderBottom: mode===m?'2px solid #C9A84C':'2px solid transparent', marginBottom:-1 }}>{label}</button>
            ))}
          </div>
          <form onSubmit={submit} style={{ padding:'28px', display:'flex', flexDirection:'column', gap:16 }}>
            {mode==='register' && (
              <div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9E8E78', marginBottom:6 }}>{t.register_name}</div>
                <input required type="text" placeholder="Wing-Sze Lam" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #D6CBBA', borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#1A1208', outline:'none', boxSizing:'border-box' }} />
              </div>
            )}
            {[
              { key:'email', label:t.login_email, type:'email', ph:'you@picklemaster.hk' },
              { key:'password', label:t.login_password, type:'password', ph:'••••••••' },
            ].map(({ key, label, type, ph }) => (
              <div key={key}>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#9E8E78', marginBottom:6 }}>{label}</div>
                <input required type={type} placeholder={ph} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #D6CBBA', borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#1A1208', outline:'none', boxSizing:'border-box' }} />
              </div>
            ))}
            {mode==='login' && <div style={{ textAlign:'right' }}><span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#C9A84C', cursor:'pointer' }}>{t.login_forgot}</span></div>}
            {error && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#C0392B', background:'#FEF0F0', border:'1px solid #F5C6CB', borderRadius:6, padding:'10px 14px' }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ background: loading ? '#9E8E78' : '#C9A84C', color:'#0F3D24', border:'none', borderRadius:999, padding:'15px 0', fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor: loading ? 'not-allowed' : 'pointer', marginTop:8, boxShadow:'0 2px 12px rgba(201,168,76,0.3)' }}>
              {loading ? '...' : (mode==='login'?t.login_submit:t.register_submit)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── ACCOUNT PAGE ─────────────────────────────────────────────
function AccountPage({ lang, user, setUser, setPage, cart }) {
  const t = window.LANG[lang];
  const { useState, useEffect } = React;
  const [bookings, setBookings]       = useState([]);
  const [loadingBookings, setLoadingB] = useState(true);

  useEffect(() => {
    window.API.get('/api/bookings/mine')
      .then(res => { if (!res.error) setBookings(res.bookings || []); })
      .finally(() => setLoadingB(false));
  }, []);

  async function logout() {
    await window.API.post('/api/auth/logout', {}).catch(() => {});
    window.API.clearToken();
    setUser(null);
    setPage('home');
  }

  return (
    <div style={{ background:'#FDFAF5', minHeight:'80vh' }}>
      <section style={{ background:'#0F3D24', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', alignItems:'center', gap:20 }}>
          <div style={{ width:64, height:64, borderRadius:'50%', border:'2px solid #C9A84C', background:'#1C4F3A', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display SC',serif", fontSize:22, fontWeight:700, color:'#C9A84C' }}>
              {user?.name?.split(' ').map(w=>w[0]).join('').slice(0,2) || 'PM'}
            </span>
          </div>
          <div>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', marginBottom:4 }}>{t.account_welcome}</div>
            <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:24, fontWeight:700, color:'#F5F0E8' }}>{user?.name || 'Member'}</div>
            <div style={{ display:'inline-flex', marginTop:8, background:'rgba(201,168,76,0.15)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:999, padding:'4px 14px' }}>
              <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'#C9A84C' }}>{user?.tier || 'DINK'} {t.account_member_status}</span>
            </div>
          </div>
          <button onClick={logout} style={{ marginLeft:'auto', background:'transparent', border:'1px solid rgba(245,240,232,0.2)', borderRadius:999, padding:'10px 20px', fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'#9E8E78', cursor:'pointer' }}>{t.nav_logout}</button>
        </div>
      </section>
      <div style={{ height:2, background:'linear-gradient(90deg,#C9A84C,transparent)' }}/>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'40px 24px', display:'grid', gridTemplateColumns:'1fr 300px', gap:32 }} className="account-main-grid">
        <div>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#9E8E78', marginBottom:16 }}>{t.account_bookings}</div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {loadingBookings ? (
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#9E8E78', padding:'20px 0' }}>Loading...</div>
            ) : bookings.length === 0 ? (
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#9E8E78', padding:'20px 0' }}>{lang==='EN'?'No upcoming bookings.':'暫無預訂。'}</div>
            ) : bookings.map((b,i) => (
              <div key={i} style={{ background:'#FFFFFF', borderRadius:12, padding:'18px 20px', boxShadow:'0 2px 10px rgba(26,18,8,0.06)', border:'1px solid #EDE8DF', display:'flex', alignItems:'center', gap:16, borderLeft:'3px solid #C9A84C' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, color:'#0F3D24' }}>
                    {(b.courts?.name || 'Court')} — {lang==='EN' ? (b.session_types?.label_en||'Session') : (b.session_types?.label_zh||'課程')}
                  </div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#9E8E78', marginTop:3 }}>
                    {b.booking_date} · {(b.slot_time||'').slice(0,5)}
                  </div>
                </div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, fontWeight:700, color:'#C9A84C' }}>HK${b.price_paid}</div>
              </div>
            ))}
            <button onClick={() => setPage('book')} style={{ background:'#0F3D24', color:'#F5F0E8', border:'none', borderRadius:999, padding:'14px 0', fontFamily:"'Oswald',sans-serif", fontSize:12, fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer', marginTop:8 }}>{t.account_book_now}</button>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ background:'#FFFFFF', borderRadius:12, padding:'20px', boxShadow:'0 2px 10px rgba(26,18,8,0.06)', border:'1px solid #EDE8DF' }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', marginBottom:12 }}>{t.account_membership}</div>
            <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:20, fontWeight:700, color:'#0F3D24', marginBottom:4 }}>{user?.tier || 'DINK'}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#9E8E78', marginBottom:16 }}>{lang==='EN'?'Active · Renews monthly':'有效 · 每月自動續期'}</div>
            <button onClick={() => setPage('member')} style={{ width:'100%', background:'transparent', border:'1.5px solid #0F3D24', borderRadius:999, padding:'11px 0', fontFamily:"'Oswald',sans-serif", fontSize:11, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', color:'#0F3D24' }}>{t.account_upgrade}</button>
          </div>
          <div style={{ background:'#FFFFFF', borderRadius:12, padding:'20px', boxShadow:'0 2px 10px rgba(26,18,8,0.06)', border:'1px solid #EDE8DF' }}>
            <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', marginBottom:12 }}>{t.account_details}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#1A1208', marginBottom:4 }}>{user?.name}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#9E8E78' }}>{user?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SocialPage, PrivatePage, ContactPage, LoginPage, AccountPage });
