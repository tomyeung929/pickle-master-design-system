// Pickle Master — Book Page (Calendar + Session Booking)

function BookPage({ lang, addToCart, user, setPage }) {
  const t = window.LANG[lang];
  const { useState } = React;

  const { useEffect } = React;
  const today = new Date();
  const [selectedCourt, setSelectedCourt] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [added, setAdded] = useState(false);
  const [slotAvailability, setSlotAvailability] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [dbCourts, setDbCourts] = useState([]);

  useEffect(() => {
    window.API.get('/api/courts').then(res => {
      if (!res.error && res.courts) setDbCourts(res.courts);
    }).catch(() => {});
  }, []);

  const courts = [
    { id: dbCourts[0]?.id || null, label: t.book_court1 },
    { id: dbCourts[1]?.id || null, label: t.book_court2 },
  ];

  const sessionTypes = [
    { key: 'peak',      label: t.book_peak,          price: 450, memberPrice: 405, desc: t.book_peak_desc },
    { key: 'nonpeak',   label: t.book_nonpeak,        price: 400, memberPrice: 360, desc: t.book_nonpeak_desc },
    { key: 'private',   label: t.book_private_class,  price: 1160,memberPrice: 1060,desc: t.book_private_class_desc },
    { key: 'social',    label: t.book_social,         price: 200, memberPrice: 160, desc: t.book_social_desc },
    { key: 'trial',     label: t.book_trial,          price: 195, memberPrice: 195, desc: t.book_trial_desc },
    { key: 'beginner',  label: t.book_beginner,       price: 290, memberPrice: 290, desc: t.book_beginner_desc },
  ];

  // Calendar helpers
  const monthNames = lang === 'EN'
    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
    : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
  const dayNames = lang === 'EN' ? ['Su','Mo','Tu','We','Th','Fr','Sa'] : ['日','一','二','三','四','五','六'];

  function getDaysInMonth(y, m) { return new Date(y, m+1, 0).getDate(); }
  function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }
  function isPast(d) {
    const dt = new Date(calYear, calMonth, d);
    const t0 = new Date(today); t0.setHours(0,0,0,0);
    return dt < t0;
  }

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Time slots — vary by session type
  const peakSlots  = ['18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
  const npSlots    = ['10:00','10:30','11:00','11:30','12:00','13:00','14:00','15:00','16:00','17:00'];
  const classSlots = ['09:00','11:00','14:00','16:00','18:00','19:30'];
  const getSlots = (typeKey) => {
    if (typeKey === 'peak') return peakSlots;
    if (typeKey === 'nonpeak') return npSlots;
    return classSlots;
  };
  // Fetch real availability when date or court or session type changes
  useEffect(() => {
    if (!selectedDate || !courts[selectedCourt]?.id) return;
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(selectedDate).padStart(2,'0')}`;
    const courtId = courts[selectedCourt].id;
    const sessionTypeKey = sessionTypes[selectedType].key;
    setLoadingSlots(true);
    window.API.get(`/api/bookings/availability?court_id=${courtId}&date=${dateStr}&session_type=${sessionTypeKey}`)
      .then(res => {
        if (!res.error && res.slots) {
          const map = {};
          res.slots.forEach(s => { map[s.slot] = s.status; });
          setSlotAvailability(map);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, selectedCourt, selectedType, calYear, calMonth, dbCourts]);

  function slotStatus(slot) {
    return slotAvailability[slot] || 'available';
  }

  const currentType = sessionTypes[selectedType];
  const displayPrice = user ? currentType.memberPrice : currentType.price;
  const slots = selectedDate ? getSlots(currentType.key) : [];

  function handleAddToCart() {
    if (!selectedSlot || !selectedDate) return;
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(selectedDate).padStart(2,'0')}`;
    addToCart({
      type: 'booking',
      courtId: courts[selectedCourt].id,
      sessionType: currentType.key,
      date: dateStr,
      time: selectedSlot,
      name: `${courts[selectedCourt].label} — ${currentType.label}`,
      detail: `${dateStr} · ${selectedSlot}`,
      price: displayPrice,
      qty: 1,
    });
    setAdded(true);
    setSelectedSlot(null);
    setTimeout(() => setAdded(false), 2000);
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1); }
    else setCalMonth(m => m-1);
    setSelectedDate(null); setSelectedSlot(null);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1); }
    else setCalMonth(m => m+1);
    setSelectedDate(null); setSelectedSlot(null);
  }

  const statusColor = { available:'#5E8474', limited:'#C9A84C', full:'#9E8E78' };
  const statusLabel = { available: t.book_available, limited: t.book_limited, full: t.book_full };

  return (
    <div style={{ background:'#F5F0E8', minHeight:'100vh' }}>
      {/* Hero */}
      <section style={{ background:'#0F3D24', padding:'48px 24px 40px', position:'relative', overflow:'hidden' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', marginBottom:8 }}>{t.book_title}</div>
          <h1 style={{ fontFamily:"'Playfair Display SC',serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:700, color:'#F5F0E8', lineHeight:1.1 }}>{t.book_hero}</h1>
          {!user && (
            <div style={{ marginTop:16, display:'inline-flex', alignItems:'center', gap:10, background:'rgba(201,168,76,0.1)', border:'1px solid rgba(201,168,76,0.3)', borderRadius:8, padding:'10px 16px' }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#D6CBBA' }}>
                {lang==='EN' ? 'Members get 10% off. ' : '會員享9折優惠。'}
                <span onClick={() => setPage('member')} style={{ color:'#C9A84C', cursor:'pointer', textDecoration:'underline' }}>
                  {lang==='EN' ? 'Join now →' : '立即加入 →'}
                </span>
              </span>
            </div>
          )}
        </div>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,#C9A84C,transparent)' }}/>
      </section>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'40px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:32, alignItems:'start' }} className="book-main-grid">

          {/* LEFT: Court + Type + Calendar */}
          <div style={{ display:'flex', flexDirection:'column', gap:32 }}>

            {/* Court selector */}
            <div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#9E8E78', marginBottom:12 }}>{t.book_select_court}</div>
              <div style={{ display:'flex', gap:12 }}>
                {courts.map((c, i) => (
                  <button key={i} onClick={() => { setSelectedCourt(i); setSelectedDate(null); setSelectedSlot(null); }}
                    style={{ flex:1, padding:'16px 20px', borderRadius:10, border: selectedCourt===i ? '2px solid #C9A84C' : '2px solid #D6CBBA', background: selectedCourt===i ? '#0F3D24' : '#fff', cursor:'pointer', transition:'all 0.15s' }}>
                    {/* mini court graphic */}
                    <div style={{ background:'#5E8474', borderRadius:4, height:40, marginBottom:10, position:'relative', overflow:'hidden' }}>
                      <div style={{ position:'absolute', left:0, top:0, width:'18%', height:'100%', background:'#C4A87A' }}/>
                      <div style={{ position:'absolute', right:0, top:0, width:'18%', height:'100%', background:'#C4A87A' }}/>
                      <div style={{ position:'absolute', left:'50%', top:0, width:1, height:'100%', background:'rgba(255,255,255,0.4)' }}/>
                    </div>
                    <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:14, fontWeight:700, color: selectedCourt===i ? '#F5F0E8' : '#0F3D24' }}>{c.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Session type selector */}
            <div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#9E8E78', marginBottom:12 }}>{t.book_select_type}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:10 }}>
                {sessionTypes.map((s, i) => (
                  <button key={i} onClick={() => { setSelectedType(i); setSelectedSlot(null); }}
                    style={{ padding:'14px 16px', borderRadius:10, border: selectedType===i ? '2px solid #C9A84C' : '2px solid #D6CBBA', background: selectedType===i ? '#0F3D24' : '#fff', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
                    <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color: selectedType===i ? '#C9A84C' : '#0F3D24', marginBottom:4 }}>{s.label}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color: selectedType===i ? '#9E8E78' : '#9E8E78', lineHeight:1.4 }}>{s.desc}</div>
                    <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:16, fontWeight:700, color: selectedType===i ? '#C9A84C' : '#0F3D24', marginTop:8 }}>
                      HK${user ? s.memberPrice : s.price}
                      {user && s.memberPrice < s.price && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:'#5E8474', marginLeft:6 }}>{t.book_member_price}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar */}
            <div>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#9E8E78', marginBottom:12 }}>{t.book_select_date}</div>
              <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 4px 16px rgba(15,61,36,0.08)', overflow:'hidden' }}>
                {/* Month nav */}
                <div style={{ background:'#0F3D24', padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <button onClick={prevMonth} style={{ background:'none', border:'none', cursor:'pointer', color:'#9E8E78', fontSize:18, lineHeight:1 }}>‹</button>
                  <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:16, fontWeight:700, color:'#F5F0E8' }}>{monthNames[calMonth]} {calYear}</div>
                  <button onClick={nextMonth} style={{ background:'none', border:'none', cursor:'pointer', color:'#9E8E78', fontSize:18, lineHeight:1 }}>›</button>
                </div>
                <div style={{ padding:'16px 20px 20px' }}>
                  {/* Day names */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4, marginBottom:8 }}>
                    {dayNames.map(d => <div key={d} style={{ textAlign:'center', fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', color:'#9E8E78', padding:'4px 0' }}>{d}</div>)}
                  </div>
                  {/* Day cells */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:4 }}>
                    {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
                    {days.map(d => {
                      const past = isPast(d);
                      const sel = selectedDate === d && calMonth === calMonth;
                      return (
                        <button key={d} onClick={() => { if (!past) { setSelectedDate(d); setSelectedSlot(null); } }}
                          style={{ aspectRatio:'1', borderRadius:8, border: sel ? '2px solid #C9A84C' : '2px solid transparent', background: sel ? '#0F3D24' : past ? 'transparent' : '#F5F0E8', color: sel ? '#C9A84C' : past ? '#D6CBBA' : '#1A1208', cursor: past ? 'default' : 'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight: sel ? 600 : 400, transition:'all 0.12s' }}>
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:'#9E8E78', marginBottom:12 }}>{t.book_select_time}</div>
                {loadingSlots && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:'#9E8E78', marginBottom:8 }}>Loading availability...</div>}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(100px,1fr))', gap:10 }}>
                  {slots.map(slot => {
                    const status = slotStatus(slot);
                    const isFull = status === 'full';
                    const isSel = selectedSlot === slot;
                    return (
                      <button key={slot} onClick={() => !isFull && setSelectedSlot(isSel ? null : slot)}
                        style={{ padding:'12px 8px', borderRadius:8, border: isSel ? '2px solid #C9A84C' : '2px solid #D6CBBA', background: isSel ? '#0F3D24' : '#fff', cursor: isFull ? 'not-allowed' : 'pointer', opacity: isFull ? 0.45 : 1, textAlign:'center', transition:'all 0.12s' }}>
                        <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:16, fontWeight:700, color: isSel ? '#C9A84C' : '#0F3D24' }}>{slot}</div>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:4, marginTop:4 }}>
                          <span style={{ width:6, height:6, borderRadius:'50%', background:statusColor[status], display:'block' }}/>
                          <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:9, letterSpacing:'0.08em', textTransform:'uppercase', color:statusColor[status] }}>{statusLabel[status]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Summary card */}
          <div style={{ position:'sticky', top:80 }}>
            <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 8px 32px rgba(15,61,36,0.12)', overflow:'hidden' }}>
              <div style={{ background:'#0F3D24', padding:'20px 24px' }}>
                <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#C9A84C', marginBottom:4 }}>{lang==='EN'?'Booking Summary':'預訂摘要'}</div>
                <div style={{ fontFamily:"'Playfair Display SC',serif", fontSize:18, fontWeight:700, color:'#F5F0E8' }}>{courts[selectedCourt].label}</div>
              </div>
              <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  { lbl: lang==='EN'?'Session Type':'課程類型', val: currentType.label },
                  { lbl: lang==='EN'?'Date':'日期', val: selectedDate ? `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(selectedDate).padStart(2,'0')}` : '—' },
                  { lbl: lang==='EN'?'Time':'時間', val: selectedSlot || '—' },
                  { lbl: lang==='EN'?'Price':'價格', val: `HK$${displayPrice}` },
                ].map(({ lbl, val }) => (
                  <div key={lbl} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                    <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', color:'#9E8E78' }}>{lbl}</span>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, color:'#0F3D24' }}>{val}</span>
                  </div>
                ))}
                {!user && (
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:'#9E8E78', borderTop:'1px solid #F5F0E8', paddingTop:12 }}>{t.book_guest_fee}</div>
                )}
              </div>
              <div style={{ padding:'0 24px 24px' }}>
                <button onClick={handleAddToCart} disabled={!selectedSlot}
                  style={{ width:'100%', background: selectedSlot ? '#C9A84C' : '#D6CBBA', color: selectedSlot ? '#0F3D24' : '#9E8E78', border:'none', borderRadius:999, padding:'16px 0', fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', cursor: selectedSlot ? 'pointer' : 'not-allowed', boxShadow: selectedSlot ? '0 2px 12px rgba(201,168,76,0.35)' : 'none', transition:'all 0.15s' }}>
                  {added ? `✓ ${t.book_cart_added}` : t.book_add_cart}
                </button>
                {!user && (
                  <button onClick={() => setPage('login')} style={{ width:'100%', marginTop:10, background:'transparent', border:'1.5px solid #0F3D24', borderRadius:999, padding:'13px 0', fontFamily:"'Oswald',sans-serif", fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', cursor:'pointer', color:'#0F3D24' }}>
                    {lang==='EN'?'Log in for Member Rate':'登入享會員優惠'}
                  </button>
                )}
              </div>
            </div>

            {/* Pricing legend */}
            <div style={{ background:'#fff', borderRadius:12, padding:'20px', marginTop:16, boxShadow:'0 2px 10px rgba(15,61,36,0.07)' }}>
              <div style={{ fontFamily:"'Oswald',sans-serif", fontSize:10, letterSpacing:'0.15em', textTransform:'uppercase', color:'#9E8E78', marginBottom:12 }}>{lang==='EN'?'All Rates':'所有收費'}</div>
              {sessionTypes.map((s) => (
                <div key={s.key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'6px 0', borderBottom:'1px solid #F5F0E8' }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:'#1A1208' }}>{s.label}</span>
                  <span style={{ fontFamily:"'Oswald',sans-serif", fontSize:13, fontWeight:700, color:'#0F3D24' }}>HK${s.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .book-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

window.BookPage = BookPage;
