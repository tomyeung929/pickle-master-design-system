// Pickle Master — Shared Components: Light Theme

const { useState, useEffect, useRef } = React;

// ─── ICONS ───────────────────────────────────────────────────
function IconCart({ n }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19.4a2 2 0 001.98-1.73L23 6H6"/></svg>
      {n > 0 && <span style={{ position: 'absolute', top: -6, right: -8, background: '#C9A84C', color: '#0F3D24', borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, fontFamily: "'Oswald',sans-serif" }}>{n}</span>}
    </span>
  );
}
function IconClose() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function IconMenu() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function IconCheck() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}

// ─── NAV (LIGHT) ──────────────────────────────────────────────
function Nav({ page, setPage, lang, setLang, user, setUser, cart, setCartOpen, mobileOpen, setMobileOpen }) {
  const t = window.LANG[lang];
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef(null);

  const navItems = [
    { id: 'home', label: t.nav_home },
    { id: 'member', label: t.nav_member },
    { id: 'book', label: t.nav_book },
    { id: 'social', label: t.nav_social },
    { id: 'private', label: t.nav_private },
    { id: 'contact', label: t.nav_contact },
  ];
  const moreItems = [
    { id: 'coaches', label: t.nav_coaches },
    { id: 'tournament', label: t.nav_tournament },
    { id: 'shop', label: t.nav_shop },
    { id: 'faq', label: t.nav_faq },
  ];
  const extraPages = moreItems.map(i => i.id);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    function handleClick(e) {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = scrolled ? '#FFFFFF' : '#FDFAF5';
  const shadow = scrolled ? '0 2px 16px rgba(26,18,8,0.08)' : 'none';

  return (
    <>
      {/* Promo banner */}
      <div style={{ background: '#0F3D24', padding: '8px 24px', textAlign: 'center', fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontWeight: 600, cursor: 'pointer' }} onClick={() => setPage('member')}>
        {t.promo_banner}
      </div>

      {/* Main nav */}
      <nav style={{ background: navBg, borderBottom: '1px solid #EDE8DF', position: 'sticky', top: 0, zIndex: 100, transition: 'box-shadow 0.2s, background 0.2s', boxShadow: shadow }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', flexShrink: 0 }} onClick={() => setPage('home')}>
            <img src="/assets/logo.jpg" alt="PM" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #C9A84C' }} />
            <div>
              <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 15, fontWeight: 700, color: '#0F3D24', lineHeight: 1 }}>Pickle Master</div>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', marginTop: 1 }}>匹匠 · Hong Kong</div>
            </div>
          </div>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
            {navItems.map(({ id, label }) => (
              <button key={id} onClick={() => setPage(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: page === id ? '#0F3D24' : '#9E8E78', padding: '8px 12px', borderBottom: page === id ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all 0.15s' }}>
                {label}
              </button>
            ))}
            {/* MORE dropdown */}
            <div ref={moreRef} style={{ position: 'relative' }}>
              <button onClick={() => setMoreOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: extraPages.includes(page) ? '#0F3D24' : '#9E8E78', padding: '8px 12px', borderBottom: extraPages.includes(page) ? '2px solid #C9A84C' : '2px solid transparent', display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s' }}>
                {t.nav_more} <span style={{ fontSize: 9, transition: 'transform 0.15s', transform: moreOpen ? 'rotate(180deg)' : 'none', display: 'inline-block' }}>▾</span>
              </button>
              {moreOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, background: '#FFFFFF', border: '1px solid #EDE8DF', borderRadius: 8, minWidth: 160, boxShadow: '0 8px 24px rgba(26,18,8,0.12)', zIndex: 200, overflow: 'hidden', marginTop: 4 }}>
                  {moreItems.map(({ id, label }) => (
                    <button key={id} onClick={() => { setPage(id); setMoreOpen(false); }} style={{ display: 'block', width: '100%', background: page === id ? '#F5F0E8' : 'none', border: 'none', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: page === id ? '#0F3D24' : '#6B5D4E', padding: '13px 20px', textAlign: 'left', borderLeft: page === id ? '2px solid #C9A84C' : '2px solid transparent', transition: 'all 0.1s' }}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setLang(lang === 'EN' ? 'ZH' : 'EN')} style={{ background: 'transparent', border: '1px solid #D6CBBA', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.08em', color: '#6B5D4E' }}>
              {lang === 'EN' ? '中文' : 'EN'}
            </button>
            {user ? (
              <button onClick={() => setPage('account')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B5D4E' }}>{t.nav_account}</button>
            ) : (
              <button onClick={() => setPage('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B5D4E' }}>{t.nav_login}</button>
            )}
            <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5D4E', display: 'flex', alignItems: 'center', gap: 6 }}>
              <IconCart n={totalItems} />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B5D4E', display: 'none' }} className="mobile-menu-btn">
              <IconMenu />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: '#FDFAF5', borderTop: '1px solid #EDE8DF', padding: '12px 0' }}>
            {[...navItems, ...moreItems].map(({ id, label }) => (
              <button key={id} onClick={() => { setPage(id); setMobileOpen(false); }} style={{ display: 'block', width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: page === id ? '#0F3D24' : '#9E8E78', padding: '14px 24px', textAlign: 'left', borderLeft: page === id ? '3px solid #C9A84C' : '3px solid transparent' }}>
                {label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #EDE8DF', margin: '8px 0', padding: '12px 24px 0', display: 'flex', gap: 12 }}>
              <button onClick={() => { setPage(user ? 'account' : 'login'); setMobileOpen(false); }} style={{ background: '#0F3D24', border: 'none', borderRadius: 4, padding: '8px 16px', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C' }}>{user ? t.nav_account : t.nav_login}</button>
              <button onClick={() => setLang(lang === 'EN' ? 'ZH' : 'EN')} style={{ background: 'transparent', border: '1px solid #D6CBBA', borderRadius: 4, padding: '8px 14px', cursor: 'pointer', fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.08em', color: '#6B5D4E' }}>{lang === 'EN' ? '中文' : 'EN'}</button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .account-grid { grid-template-columns: 1fr !important; }
          .book-right { display: none !important; }
        }
        @media (max-width: 640px) {
          .coach-card { grid-template-columns: 60px 1fr !important; }
          .coach-cta { display: none !important; }
          .tournament-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

// ─── FOOTER (LIGHT) ──────────────────────────────────────────
function Footer({ setPage, lang }) {
  const t = window.LANG[lang];
  return (
    <footer style={{ background: '#F0EAE0', borderTop: '1px solid #DDD5C8', paddingTop: 48 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 40 }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <img src="/assets/logo.jpg" alt="PM" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #C9A84C' }} />
            <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 14, fontWeight: 700, color: '#0F3D24' }}>Pickle Master</div>
          </div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#6B5D4E', lineHeight: 1.7, maxWidth: 220 }}>{t.footer_about}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {['IG', 'FB'].map(s => (
              <a key={s} href="#" style={{ width: 32, height: 32, background: '#0F3D24', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Oswald',sans-serif", fontSize: 10, color: '#C9A84C', textDecoration: 'none', letterSpacing: '0.05em' }}>{s}</a>
            ))}
          </div>
        </div>
        {/* Quick links */}
        <div>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0F3D24', marginBottom: 16 }}>{t.footer_links}</div>
          {[['home','nav_home'],['member','nav_member'],['book','nav_book'],['social','nav_social'],['private','nav_private'],['contact','nav_contact'],['coaches','nav_coaches'],['tournament','nav_tournament'],['shop','nav_shop'],['faq','nav_faq']].map(([id, key]) => (
            <button key={id} onClick={() => setPage(id)} style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#6B5D4E', padding: '4px 0', textAlign: 'left' }}>{t[key]}</button>
          ))}
        </div>
        {/* Legal */}
        <div>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0F3D24', marginBottom: 16 }}>{t.footer_legal}</div>
          {[t.footer_privacy, t.footer_terms, t.footer_cancel].map(s => (
            <div key={s} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#6B5D4E', padding: '4px 0', cursor: 'pointer' }}>{s}</div>
          ))}
        </div>
        {/* Address */}
        <div>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0F3D24', marginBottom: 16 }}>{t.home_address}</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#6B5D4E', lineHeight: 1.7 }}>{t.home_address_val}</div>
          <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0F3D24', marginBottom: 8, marginTop: 20 }}>{t.footer_payment}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Visa','MC','Amex','ApplePay','UnionPay'].map(p => (
              <span key={p} style={{ background: '#FFFFFF', border: '1px solid #DDD5C8', borderRadius: 4, padding: '3px 8px', fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: '#6B5D4E' }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #DDD5C8', padding: '16px 24px', textAlign: 'center', fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9E8E78' }}>
        {t.footer_rights}
      </div>
    </footer>
  );
}

// ─── CART SIDEBAR (LIGHT) ─────────────────────────────────────
function CartSidebar({ open, onClose, cart, setCart, lang, setPage, user }) {
  const t = window.LANG[lang];
  const [checkout, setCheckout]     = useState(false);
  const [success, setSuccess]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [processing, setProcessing] = useState(false);
  const [apiError, setApiError]     = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [stripeObj, setStripeObj]   = useState(null);
  const [elements, setElements]     = useState(null);
  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  function remove(idx) { setCart(c => c.filter((_, i) => i !== idx)); }

  async function startCheckout() {
    setLoading(true);
    setApiError(null);
    const res = await window.API.post('/api/checkout/create-intent', {
      cart: cart.map(i => ({
        type: i.courtId ? 'booking' : 'product',
        courtId: i.courtId,
        sessionType: i.sessionType,
        date: i.date,
        time: i.time,
        product_id: i.product_id,
        qty: i.qty || 1,
        price: i.price,
        name: i.name,
        detail: i.detail,
      })),
      guest_name:  user ? user.name  : '',
      guest_email: user ? user.email : '',
    });
    setLoading(false);
    if (res.error) { setApiError(res.error); return; }

    setClientSecret(res.client_secret);
    setCheckout(true);

    const stripe = window.Stripe(window.STRIPE_PK);
    setStripeObj(stripe);
    const els = stripe.elements({ clientSecret: res.client_secret, appearance: { theme: 'flat', variables: { colorPrimary: '#0F3D24', colorBackground: '#FDFAF5', fontFamily: 'DM Sans, sans-serif' } } });
    setElements(els);
    setTimeout(() => {
      const pe = els.create('payment');
      pe.mount('#pm-stripe-payment-element');
    }, 50);
  }

  async function doCheckout(e) {
    e.preventDefault();
    if (!stripeObj || !elements) return;
    setProcessing(true);
    setApiError(null);
    const { error, paymentIntent } = await stripeObj.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: 'if_required',
    });
    if (error) { setApiError(error.message); setProcessing(false); return; }

    const confirmRes = await window.API.post('/api/checkout/confirm', { payment_intent_id: paymentIntent.id });
    setProcessing(false);
    if (confirmRes.error) { setApiError(confirmRes.error); return; }

    setSuccess(true);
    setTimeout(() => {
      setCart([]);
      setSuccess(false);
      setCheckout(false);
      setClientSecret(null);
      setStripeObj(null);
      setElements(null);
      onClose();
    }, 2800);
  }

  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,18,8,0.35)', zIndex: 200 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 380, background: '#FDFAF5', zIndex: 201, display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 32px rgba(26,18,8,0.15)' }}>
        {/* Header */}
        <div style={{ background: '#FFFFFF', borderBottom: '1px solid #EDE8DF', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 18, fontWeight: 700, color: '#0F3D24' }}>{checkout ? t.checkout_title : t.cart_title}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9E8E78' }}><IconClose /></button>
        </div>
        <div style={{ height: 2, background: 'linear-gradient(90deg,#C9A84C,transparent)' }} />

        {success ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#0F3D24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div style={{ fontFamily: "'Playfair Display SC',serif", fontSize: 20, fontWeight: 700, color: '#0F3D24', textAlign: 'center' }}>{t.checkout_success}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#9E8E78', textAlign: 'center' }}>{t.checkout_success_sub}</div>
          </div>
        ) : checkout ? (
          <form onSubmit={doCheckout} style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 4 }}>Payment Details</div>
            <div id="pm-stripe-payment-element" style={{ minHeight: 160 }} />
            {apiError && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#C0392B', background: '#FEF0F0', border: '1px solid #F5C6CB', borderRadius: 6, padding: '10px 14px' }}>{apiError}</div>}
            <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 700, color: '#0F3D24', display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #D6CBBA', marginTop: 8 }}>
              <span>{t.cart_total}</span><span>HK${total}</span>
            </div>
            <button type="submit" disabled={processing} style={{ background: processing ? '#9E8E78' : '#C9A84C', color: '#0F3D24', border: 'none', borderRadius: 999, padding: '15px 0', fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: processing ? 'not-allowed' : 'pointer', boxShadow: '0 2px 12px rgba(201,168,76,0.35)' }}>{processing ? 'Processing...' : `${t.checkout_pay} — HK$${total}`}</button>
          </form>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {cart.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D6CBBA" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61H19.4a2 2 0 001.98-1.73L23 6H6"/></svg>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: '#9E8E78' }}>{t.cart_empty}</div>
                <button onClick={() => { onClose(); setPage('book'); }} style={{ background: '#0F3D24', color: '#C9A84C', border: 'none', borderRadius: 999, padding: '12px 24px', fontFamily: "'Oswald',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', marginTop: 8 }}>{t.nav_book}</button>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {!user && <div style={{ background: '#FFF8E8', border: '1px solid #E2C97E', borderRadius: 8, padding: '10px 14px', fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9A7A2E' }}>{t.cart_guest_note}</div>}
                  {user && <div style={{ background: '#EFF7F2', border: '1px solid #5E8474', borderRadius: 8, padding: '10px 14px', fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#1C4F3A' }}>{t.cart_member_disc}</div>}
                  {cart.map((item, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '14px', boxShadow: '0 2px 8px rgba(26,18,8,0.06)', border: '1px solid #EDE8DF', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 600, color: '#0F3D24', marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: '#9E8E78' }}>{item.detail}</div>
                        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 16, fontWeight: 700, color: '#C9A84C', marginTop: 6 }}>HK${item.price}</div>
                      </div>
                      <button onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9E8E78', fontSize: 18, lineHeight: 1 }}>×</button>
                    </div>
                  ))}
                </div>
                <div style={{ padding: 24, borderTop: '1px solid #EDE8DF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Oswald',sans-serif", fontSize: 14, fontWeight: 700, color: '#0F3D24', marginBottom: 16 }}>
                    <span>{t.cart_total}</span><span>HK${total}</span>
                  </div>
                  {apiError && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: '#C0392B', background: '#FEF0F0', border: '1px solid #F5C6CB', borderRadius: 6, padding: '10px 14px', marginBottom: 12 }}>{apiError}</div>}
                  <button onClick={startCheckout} disabled={loading} style={{ width: '100%', background: loading ? '#9E8E78' : '#C9A84C', color: '#0F3D24', border: 'none', borderRadius: 999, padding: '15px 0', fontFamily: "'Oswald',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 2px 12px rgba(201,168,76,0.35)' }}>{loading ? 'Loading...' : t.cart_checkout}</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

Object.assign(window, { Nav, Footer, CartSidebar, IconCheck, IconClose, IconCart });
