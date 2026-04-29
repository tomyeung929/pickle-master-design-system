// Pickle Master — App UI Components
// Screens: Home, Book, Courts, Profile
// Icons: inline SVG (thin stroke, consistent with Lucide style)

// ─── ICONS ───────────────────────────────────────────────────
function HomeIcon({ active }) {
  const c = active ? '#C9A84C' : '#9E8E78';
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>;
}
function CalIcon({ active }) {
  const c = active ? '#C9A84C' : '#9E8E78';
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function CourtIcon({ active }) {
  const c = active ? '#C9A84C' : '#9E8E78';
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="1"/><line x1="12" y1="5" x2="12" y2="19"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="6" y1="5" x2="6" y2="19"/><line x1="18" y1="5" x2="18" y2="19"/></svg>;
}
function UserIcon({ active }) {
  const c = active ? '#C9A84C' : '#9E8E78';
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
}
function ChevronRight() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E8E78" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
}
function StarIcon({ filled }) {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#C9A84C' : 'none'} stroke="#C9A84C" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function PaddleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round">
      <ellipse cx="10" cy="10" rx="6" ry="7" transform="rotate(-30 10 10)"/>
      <line x1="14" y1="15" x2="20" y2="21"/>
      <circle cx="17" cy="7" r="2" fill="#C9A84C" stroke="none"/>
    </svg>
  );
}

// ─── SHARED UI ────────────────────────────────────────────────
function Pill({ children, variant = 'gold', style = {} }) {
  const variants = {
    gold:    { background: '#C9A84C', color: '#0F3D24' },
    forest:  { background: '#0F3D24', color: '#C9A84C' },
    sage:    { background: '#5E8474', color: '#fff' },
    stone:   { background: '#D6CBBA', color: '#1A1208' },
    outline: { background: 'transparent', border: '1px solid #1C4F3A', color: '#1C4F3A' },
  };
  return (
    <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, padding: '3px 10px', borderRadius: 999, display: 'inline-block', ...variants[variant], ...style }}>{children}</span>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
      <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9E8E78' }}>{title}</span>
      {action && <span onClick={onAction} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#C9A84C', cursor: 'pointer' }}>{action}</span>}
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────
function HomeScreen({ onNavigate }) {
  const upcomingSessions = [
    { time: '18:00', label: 'Open Play', court: 'Court 1', day: 'Today', status: 'sage' },
    { time: '19:30', label: 'Advanced', court: 'Court 2', day: 'Thu', status: 'gold' },
  ];
  const announcements = [
    { title: 'Club Tournament', date: 'May 10', desc: 'Sign-ups open for the inaugural PM Open.' },
    { title: 'New Hours', date: 'May 1', desc: 'Courts now open 7:00 AM on weekends.' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Hero Header */}
      <div style={{ background: '#0F3D24', padding: '20px 24px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 4 }}>Good morning</div>
            <div style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 22, fontWeight: 700, color: '#F5F0E8', lineHeight: 1.15 }}>Wing-Sze</div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid #C9A84C', overflow: 'hidden', background: '#1C4F3A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 16, color: '#C9A84C', fontWeight: 700 }}>WL</span>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {[{ val: '12', lbl: 'Sessions' }, { val: 'Pro', lbl: 'Member' }, { val: 'Court 1', lbl: 'Favourite' }].map(({ val, lbl }) => (
            <div key={lbl} style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 16, fontWeight: 700, color: '#F5F0E8' }}>{val}</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E8E78', marginTop: 2 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #C9A84C, transparent)' }}></div>

      {/* Book CTA */}
      <div style={{ padding: '16px 20px 0' }}>
        <button onClick={() => onNavigate('book')} style={{ width: '100%', background: '#C9A84C', color: '#0F3D24', fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', borderRadius: 999, padding: '15px 0', cursor: 'pointer', boxShadow: '0 2px 12px rgba(201,168,76,0.35)' }}>
          Book a Court
        </button>
      </div>

      {/* Upcoming Sessions */}
      <div style={{ padding: '20px 20px 0' }}>
        <SectionHeader title="Upcoming Sessions" action="See all" onAction={() => onNavigate('book')} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {upcomingSessions.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(15,61,36,0.1)', borderLeft: `3px solid ${s.status === 'sage' ? '#5E8474' : '#C9A84C'}` }}>
              <div style={{ textAlign: 'center', minWidth: 44 }}>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: '#0F3D24', lineHeight: 1 }}>{s.time}</div>
                <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E8E78', marginTop: 2 }}>{s.day}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: '#1A1208' }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#9E8E78', marginTop: 1 }}>{s.court}</div>
              </div>
              <Pill variant={s.status}>{s.status === 'sage' ? 'Today' : 'Upcoming'}</Pill>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements */}
      <div style={{ padding: '20px 20px 24px' }}>
        <SectionHeader title="Club News" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {announcements.map((a, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 1px 4px rgba(15,61,36,0.08)' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#0F3D24' }}>{a.title}</span>
                  <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E8E78' }}>{a.date}</span>
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#9E8E78', lineHeight: 1.4 }}>{a.desc}</div>
              </div>
              <ChevronRight />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BOOK SCREEN ──────────────────────────────────────────────
function BookScreen({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [activeDay, setActiveDay] = useState(1);
  const slots = [
    { time: '07:00', court: 'Court 1', type: 'Open Play', status: 'available' },
    { time: '08:30', court: 'Court 2', type: 'Advanced', status: 'available' },
    { time: '10:00', court: 'Court 1', type: 'Mixed', status: 'limited' },
    { time: '12:00', court: 'Court 1', type: 'Open Play', status: 'full' },
    { time: '14:00', court: 'Court 2', type: 'Open Play', status: 'available' },
    { time: '16:00', court: 'Court 1', type: 'Advanced', status: 'available' },
    { time: '18:00', court: 'Court 2', type: 'Mixed', status: 'limited' },
    { time: '19:30', court: 'Court 1', type: 'Open Play', status: 'available' },
  ];
  const statusColor = { available: '#5E8474', limited: '#C9A84C', full: '#9E8E78' };
  const statusLabel = { available: 'Available', limited: 'Limited', full: 'Full' };

  if (confirmed) {
    const s = slots[selected];
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 24, background: '#F5F0E8' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#0F3D24', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(15,61,36,0.3)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 22, fontWeight: 700, color: '#0F3D24', marginBottom: 8 }}>Booked</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#9E8E78' }}>{s.time} · {s.court} · {days[activeDay]}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9E8E78', marginTop: 4 }}>{s.type}</div>
        </div>
        <button onClick={() => { setConfirmed(false); setSelected(null); }} style={{ background: '#C9A84C', color: '#0F3D24', fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', borderRadius: 999, padding: '14px 32px', cursor: 'pointer' }}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#0F3D24', padding: '20px 24px 20px' }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 4 }}>Reserve Your Spot</div>
        <div style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 22, fontWeight: 700, color: '#F5F0E8' }}>Book a Court</div>
      </div>
      <div style={{ height: 2, background: 'linear-gradient(90deg, #C9A84C, transparent)' }}></div>

      {/* Day picker */}
      <div style={{ padding: '16px 20px 0', background: '#fff' }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 10 }}>Select Day</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {days.map((d, i) => (
            <button key={i} onClick={() => setActiveDay(i)} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer', background: activeDay === i ? '#0F3D24' : '#F5F0E8', color: activeDay === i ? '#C9A84C' : '#9E8E78', fontFamily: "'Oswald', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', transition: 'all 0.15s' }}>
              {d}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: '#D6CBBA', margin: '16px -20px 0' }}></div>
      </div>

      {/* Slots */}
      <div style={{ padding: '16px 20px 24px', background: '#fff', flex: 1 }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 12 }}>Available Times</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {slots.map((s, i) => (
            <div key={i} onClick={() => s.status !== 'full' && setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#0F3D24' : '#F5F0E8', border: selected === i ? '1.5px solid #C9A84C' : '1.5px solid transparent', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, cursor: s.status === 'full' ? 'not-allowed' : 'pointer', opacity: s.status === 'full' ? 0.5 : 1, transition: 'all 0.15s' }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 700, color: selected === i ? '#C9A84C' : '#0F3D24', width: 52 }}>{s.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: selected === i ? '#F5F0E8' : '#1A1208' }}>{s.court}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: selected === i ? '#9E8E78' : '#9E8E78', marginTop: 1 }}>{s.type}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor[s.status], display: 'block' }}></span>
                <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColor[s.status] }}>{statusLabel[s.status]}</span>
              </div>
            </div>
          ))}
        </div>
        {selected !== null && (
          <button onClick={() => setConfirmed(true)} style={{ width: '100%', marginTop: 20, background: '#C9A84C', color: '#0F3D24', fontFamily: "'Oswald', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', borderRadius: 999, padding: '15px 0', cursor: 'pointer', boxShadow: '0 2px 12px rgba(201,168,76,0.35)' }}>
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}

// ─── COURTS SCREEN ────────────────────────────────────────────
function CourtsScreen() {
  const [activeCourt, setActiveCourt] = useState(0);
  const courts = [
    { id: 1, status: 'available', type: 'Open Play', nextAt: '18:00', occupancy: 4, capacity: 4 },
    { id: 2, status: 'limited', type: 'Advanced', nextAt: '19:30', occupancy: 2, capacity: 4 },
  ];
  const c = courts[activeCourt];
  const statusColor = { available: '#5E8474', limited: '#C9A84C' };
  const statusLabel = { available: 'Available', limited: 'Limited Spots' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#0F3D24', padding: '20px 24px 20px' }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 4 }}>Live Status</div>
        <div style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 22, fontWeight: 700, color: '#F5F0E8' }}>Courts</div>
      </div>
      <div style={{ height: 2, background: 'linear-gradient(90deg, #C9A84C, transparent)' }}></div>

      {/* Court tabs */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #D6CBBA' }}>
        {courts.map((ct, i) => (
          <button key={i} onClick={() => setActiveCourt(i)} style={{ flex: 1, padding: '14px 0', border: 'none', borderBottom: activeCourt === i ? '2px solid #C9A84C' : '2px solid transparent', background: 'none', cursor: 'pointer', fontFamily: "'Oswald', sans-serif", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: activeCourt === i ? '#0F3D24' : '#9E8E78', transition: 'all 0.15s', marginBottom: -1 }}>
            Court {ct.id}
          </button>
        ))}
      </div>

      {/* Court diagram */}
      <div style={{ background: '#1C4F3A', margin: 20, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 16px rgba(15,61,36,0.3)' }}>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>Court {c.id} Layout</span>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColor[c.status] }}>{statusLabel[c.status]}</span>
        </div>
        {/* Simplified court graphic */}
        <div style={{ margin: '0 16px 16px', background: '#5E8474', borderRadius: 8, position: 'relative', height: 140, border: '2px solid rgba(255,255,255,0.3)' }}>
          {/* Kitchen zones */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: '22%', height: '100%', background: '#C4A87A', borderRadius: '6px 0 0 6px', opacity: 0.8 }}></div>
          <div style={{ position: 'absolute', right: 0, top: 0, width: '22%', height: '100%', background: '#C4A87A', borderRadius: '0 6px 6px 0', opacity: 0.8 }}></div>
          {/* Center line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, width: 1.5, height: '100%', background: 'rgba(255,255,255,0.6)' }}></div>
          {/* Net */}
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '56%', height: 3, background: '#fff', borderRadius: 2 }}></div>
          {/* PM logo text */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>PICKLE MASTER</span>
          </div>
        </div>
      </div>

      {/* Court info */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', boxShadow: '0 2px 8px rgba(15,61,36,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 3 }}>Current Session</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: '#0F3D24' }}>{c.type}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 3 }}>Next at</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 20, fontWeight: 700, color: '#0F3D24' }}>{c.nextAt}</div>
            </div>
          </div>
          {/* Occupancy bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E8E78' }}>Occupancy</span>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0F3D24' }}>{c.occupancy}/{c.capacity}</span>
            </div>
            <div style={{ height: 6, background: '#F5F0E8', borderRadius: 99 }}>
              <div style={{ height: '100%', width: `${(c.occupancy / c.capacity) * 100}%`, background: statusColor[c.status], borderRadius: 99, transition: 'width 0.3s' }}></div>
            </div>
          </div>
        </div>

        {/* Schedule today */}
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E8E78', marginTop: 4 }}>Today's Schedule</div>
        {[{t:'07:00',l:'Open Play'},{t:'10:00',l:'Mixed'},{t:'14:00',l:'Advanced'},{t:'18:00',l:'Open Play'}].map((s,i)=>(
          <div key={i} style={{ background: '#fff', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 1px 4px rgba(15,61,36,0.07)' }}>
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600, color: '#0F3D24', width: 48 }}>{s.t}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9E8E78' }}>{s.l}</span>
          </div>
        ))}
        <div style={{ height: 24 }}></div>
      </div>
    </div>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────
function ProfileScreen() {
  const stats = [{ val: '12', lbl: 'Sessions' }, { val: '3', lbl: 'Wins' }, { val: '4.2', lbl: 'Avg Rating' }];
  const menuItems = [
    { label: 'Booking History' },
    { label: 'Membership Details' },
    { label: 'Notifications' },
    { label: 'Language / 語言' },
    { label: 'Contact the Club' },
    { label: 'Sign Out' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#0F3D24', padding: '24px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', border: '2.5px solid #C9A84C', background: '#1C4F3A', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 4px rgba(201,168,76,0.15)' }}>
          <span style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 24, fontWeight: 700, color: '#C9A84C' }}>WL</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 20, fontWeight: 700, color: '#F5F0E8', marginBottom: 4 }}>Wing-Sze Lam</div>
          <Pill variant="gold">Pro Member</Pill>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
          {stats.map(({ val, lbl }) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display SC', serif", fontSize: 18, fontWeight: 700, color: '#F5F0E8' }}>{val}</div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E8E78', marginTop: 1 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 2, background: 'linear-gradient(90deg, #C9A84C, transparent)' }}></div>

      {/* Rating stars */}
      <div style={{ background: '#fff', margin: 20, borderRadius: 10, padding: '14px 16px', boxShadow: '0 2px 8px rgba(15,61,36,0.08)' }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9E8E78', marginBottom: 8 }}>Skill Rating</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 3 }}>{[1,2,3,4,5].map(i => <StarIcon key={i} filled={i <= 4} />)}</div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#9E8E78' }}>4.2 / 5.0 · Advanced</span>
        </div>
      </div>

      {/* Menu */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {menuItems.map((item, i) => (
          <div key={i} style={{ background: '#fff', padding: '15px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: i === 0 ? '10px 10px 0 0' : i === menuItems.length - 1 ? '0 0 10px 10px' : 0, borderBottom: i < menuItems.length - 1 ? '1px solid #F5F0E8' : 'none', cursor: 'pointer' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: item.label === 'Sign Out' ? '#9E8E78' : '#1A1208' }}>{item.label}</span>
            {item.label !== 'Sign Out' && <ChevronRight />}
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D6CBBA' }}>Pickle Master · Est. 2026 · Hong Kong</div>
      </div>
    </div>
  );
}

// Export all to window
Object.assign(window, {
  HomeScreen, BookScreen, CourtsScreen, ProfileScreen,
  HomeIcon, CalIcon, CourtIcon, UserIcon,
  ChevronRight, StarIcon, PaddleIcon,
  Pill, SectionHeader
});
