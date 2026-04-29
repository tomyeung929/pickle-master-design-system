// Admin dashboard — only accessible to profiles with is_admin = true
(function() {
const { useState, useEffect, useCallback } = React;

const S = {
  page: { minHeight: '100vh', background: '#FDFAF5', paddingTop: 80 },
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '32px 24px' },
  h1: { fontFamily: "'Playfair Display SC', serif", fontSize: 28, color: '#1A1208', marginBottom: 8 },
  sub: { color: '#7A6A4A', fontSize: 14, marginBottom: 32 },
  tabs: { display: 'flex', gap: 4, borderBottom: '2px solid #E8DFD0', marginBottom: 32, flexWrap: 'wrap' },
  tab: (active) => ({
    padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
    color: active ? '#1A1208' : '#9A8A6A',
    borderBottom: active ? '2px solid #C9A84C' : '2px solid transparent',
    marginBottom: -2, transition: 'all 0.15s'
  }),
  card: { background: '#FFF', border: '1px solid #E8DFD0', borderRadius: 12, padding: 24, marginBottom: 24 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: { textAlign: 'left', padding: '8px 12px', background: '#F5F0E8', color: '#7A6A4A', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em' },
  td: { padding: '10px 12px', borderBottom: '1px solid #F0EBE0', verticalAlign: 'middle' },
  input: { width: '100%', padding: '6px 10px', border: '1px solid #D8CFC0', borderRadius: 6, fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: '#FFF' },
  btn: (variant='gold') => ({
    padding: '6px 14px', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
    background: variant === 'gold' ? '#C9A84C' : variant === 'red' ? '#DC2626' : variant === 'green' ? '#16A34A' : '#E8DFD0',
    color: variant === 'ghost' ? '#7A6A4A' : '#FFF',
    fontFamily: "'DM Sans', sans-serif"
  }),
  badge: (color) => ({
    display: 'inline-block', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600,
    background: color === 'green' ? '#DCFCE7' : color === 'red' ? '#FEE2E2' : color === 'gold' ? '#FEF3C7' : '#F3F4F6',
    color: color === 'green' ? '#16A34A' : color === 'red' ? '#DC2626' : color === 'gold' ? '#92400E' : '#6B7280'
  }),
  err: { color: '#DC2626', fontSize: 13, marginBottom: 12 },
  ok: { color: '#16A34A', fontSize: 13, marginBottom: 12 },
  row: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 },
  label: { fontSize: 12, color: '#7A6A4A', marginBottom: 4, fontWeight: 600 },
  formGroup: { flex: 1 },
};

// ─── Reusable inline-edit cell ───────────────────────────────────────────────
function EditCell({ value, onSave, type = 'text' }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  if (!editing) return (
    <span onClick={() => setEditing(true)} style={{ cursor: 'pointer', borderBottom: '1px dashed #C9A84C' }}>{String(value)}</span>
  );
  return (
    <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <input
        autoFocus type={type} value={val}
        onChange={e => setVal(type === 'number' ? Number(e.target.value) : e.target.value)}
        style={{ ...S.input, width: type === 'number' ? 80 : 140 }}
        onKeyDown={e => { if (e.key === 'Enter') { onSave(val); setEditing(false); } if (e.key === 'Escape') setEditing(false); }}
      />
      <button style={S.btn('gold')} onClick={() => { onSave(val); setEditing(false); }}>✓</button>
      <button style={S.btn('ghost')} onClick={() => { setVal(value); setEditing(false); }}>✕</button>
    </span>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [adding, setAdding] = useState(false);
  const [newP, setNewP] = useState({ name_en: '', name_zh: '', category: 'paddles', price: 0, member_price: 0, in_stock: true, image_url: '' });

  useEffect(() => {
    window.API.get('/api/admin/products').then(r => setProducts(r.products || []));
  }, []);

  async function save(id, fields) {
    const r = await window.API.post('/api/admin/products', { action: 'update', id, ...fields });
    if (r.error) { setErr(r.error); return; }
    setProducts(ps => ps.map(p => p.id === id ? r.product : p));
    setMsg('Saved'); setTimeout(() => setMsg(''), 2000);
  }

  async function del(id) {
    if (!confirm('Delete this product?')) return;
    const r = await window.API.post('/api/admin/products', { action: 'delete', id });
    if (r.error) { setErr(r.error); return; }
    setProducts(ps => ps.filter(p => p.id !== id));
  }

  async function create() {
    const r = await window.API.post('/api/admin/products', { action: 'create', ...newP });
    if (r.error) { setErr(r.error); return; }
    setProducts(ps => [...ps, r.product]);
    setAdding(false);
    setNewP({ name_en: '', name_zh: '', category: 'paddles', price: 0, member_price: 0, in_stock: true, image_url: '' });
    setMsg('Created'); setTimeout(() => setMsg(''), 2000);
  }

  return (
    <div>
      {err && <div style={S.err}>{err}</div>}
      {msg && <div style={S.ok}>{msg}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 14, color: '#7A6A4A' }}>{products.length} products</span>
        <button style={S.btn('gold')} onClick={() => setAdding(true)}>+ Add Product</button>
      </div>

      {adding && (
        <div style={{ ...S.card, borderColor: '#C9A84C' }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>New Product</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[['name_en','Name (EN)'],['name_zh','Name (ZH)'],['image_url','Image URL'],['category','Category']].map(([k,l]) => (
              <div key={k}>
                <div style={S.label}>{l}</div>
                <input style={S.input} value={newP[k]} onChange={e => setNewP(p => ({...p,[k]:e.target.value}))} />
              </div>
            ))}
            {[['price','Price (HKD)'],['member_price','Member Price']].map(([k,l]) => (
              <div key={k}>
                <div style={S.label}>{l}</div>
                <input style={S.input} type="number" value={newP[k]} onChange={e => setNewP(p => ({...p,[k]:Number(e.target.value)}))} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={S.btn('gold')} onClick={create}>Create</button>
            <button style={S.btn('ghost')} onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>
              {['ID','Name EN','Name ZH','Category','Price','Member Price','In Stock',''].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={S.td}><span style={{ color: '#9A8A6A', fontSize: 11 }}>{p.id}</span></td>
                <td style={S.td}><EditCell value={p.name_en} onSave={v => save(p.id, { name_en: v })} /></td>
                <td style={S.td}><EditCell value={p.name_zh || ''} onSave={v => save(p.id, { name_zh: v })} /></td>
                <td style={S.td}><EditCell value={p.category} onSave={v => save(p.id, { category: v })} /></td>
                <td style={S.td}><EditCell value={p.price} type="number" onSave={v => save(p.id, { price: v })} /></td>
                <td style={S.td}><EditCell value={p.member_price} type="number" onSave={v => save(p.id, { member_price: v })} /></td>
                <td style={S.td}>
                  <button
                    style={S.btn(p.in_stock ? 'green' : 'red')}
                    onClick={() => save(p.id, { in_stock: !p.in_stock })}
                  >{p.in_stock ? 'In Stock' : 'Sold Out'}</button>
                </td>
                <td style={S.td}>
                  <button style={S.btn('red')} onClick={() => del(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Pricing Tab ──────────────────────────────────────────────────────────────
function PricingTab() {
  const [types, setTypes] = useState([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    window.API.get('/api/admin/session-types').then(r => setTypes(r.sessionTypes || []));
  }, []);

  async function save(id, fields) {
    const r = await window.API.post('/api/admin/session-types', { id, ...fields });
    if (r.error) { setErr(r.error); return; }
    setTypes(ts => ts.map(t => t.id === id ? r.sessionType : t));
    setMsg('Saved'); setTimeout(() => setMsg(''), 2000);
  }

  return (
    <div>
      {err && <div style={S.err}>{err}</div>}
      {msg && <div style={S.ok}>{msg}</div>}
      <div style={S.card}>
        <p style={{ fontSize: 13, color: '#7A6A4A', marginBottom: 16 }}>Click any price cell to edit it inline. Press Enter or ✓ to save.</p>
        <table style={S.table}>
          <thead>
            <tr>
              {['Key','Label EN','Label ZH','Guest Price (HKD)','Member Price (HKD)','Slot Type'].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {types.map(t => (
              <tr key={t.id}>
                <td style={S.td}><span style={S.badge('ghost')}>{t.key}</span></td>
                <td style={S.td}><EditCell value={t.label_en} onSave={v => save(t.id, { label_en: v })} /></td>
                <td style={S.td}><EditCell value={t.label_zh || ''} onSave={v => save(t.id, { label_zh: v })} /></td>
                <td style={S.td}><EditCell value={t.price_guest} type="number" onSave={v => save(t.id, { price_guest: v })} /></td>
                <td style={S.td}><EditCell value={t.price_member} type="number" onSave={v => save(t.id, { price_member: v })} /></td>
                <td style={S.td}><span style={{ color: '#9A8A6A' }}>{t.slot_type}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Courts Tab ───────────────────────────────────────────────────────────────
function CourtsTab() {
  const [courts, setCourts] = useState([]);
  const [msg, setMsg] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    window.API.get('/api/admin/courts').then(r => setCourts(r.courts || []));
  }, []);

  async function toggleActive(c) {
    const r = await window.API.post('/api/admin/courts', { action: 'update', id: c.id, active: !c.active });
    if (!r.error) setCourts(cs => cs.map(x => x.id === c.id ? r.court : x));
  }

  async function saveName(c, name) {
    const r = await window.API.post('/api/admin/courts', { action: 'update', id: c.id, name });
    if (!r.error) { setCourts(cs => cs.map(x => x.id === c.id ? r.court : x)); setMsg('Saved'); setTimeout(() => setMsg(''), 2000); }
  }

  async function addCourt() {
    if (!newName.trim()) return;
    const r = await window.API.post('/api/admin/courts', { action: 'create', name: newName.trim(), active: true });
    if (!r.error) { setCourts(cs => [...cs, r.court]); setNewName(''); }
  }

  return (
    <div>
      {msg && <div style={S.ok}>{msg}</div>}
      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>{['Name','Status',''].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {courts.map(c => (
              <tr key={c.id}>
                <td style={S.td}><EditCell value={c.name} onSave={v => saveName(c, v)} /></td>
                <td style={S.td}><span style={S.badge(c.active ? 'green' : 'red')}>{c.active ? 'Active' : 'Inactive'}</span></td>
                <td style={S.td}>
                  <button style={S.btn(c.active ? 'red' : 'green')} onClick={() => toggleActive(c)}>
                    {c.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <input style={{ ...S.input, maxWidth: 200 }} placeholder="Court name" value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && addCourt()} />
          <button style={S.btn('gold')} onClick={addCourt}>+ Add Court</button>
        </div>
      </div>
    </div>
  );
}

// ─── Tournaments Tab ──────────────────────────────────────────────────────────
function TournamentsTab() {
  const [tours, setTours] = useState([]);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [adding, setAdding] = useState(false);
  const blank = { key: '', name_en: '', name_zh: '', date_label: '', capacity: 32, members_only: false, active: true, sort_order: 0 };
  const [newT, setNewT] = useState(blank);

  useEffect(() => {
    window.API.get('/api/admin/tournaments').then(r => setTours(r.tournaments || []));
  }, []);

  async function save(key, fields) {
    const r = await window.API.post('/api/admin/tournaments', { action: 'update', key, ...fields });
    if (r.error) { setErr(r.error); return; }
    setTours(ts => ts.map(t => t.key === key ? r.tournament : t));
    setMsg('Saved'); setTimeout(() => setMsg(''), 2000);
  }

  async function del(key) {
    if (!confirm('Delete this tournament?')) return;
    const r = await window.API.post('/api/admin/tournaments', { action: 'delete', key });
    if (r.error) { setErr(r.error); return; }
    setTours(ts => ts.filter(t => t.key !== key));
  }

  async function create() {
    if (!newT.key || !newT.name_en) { setErr('Key and English name are required'); return; }
    const r = await window.API.post('/api/admin/tournaments', { action: 'create', ...newT });
    if (r.error) { setErr(r.error); return; }
    setTours(ts => [...ts, r.tournament]);
    setAdding(false); setNewT(blank);
    setMsg('Created'); setTimeout(() => setMsg(''), 2000);
  }

  const formFields = [
    ['key','Key (unique slug, e.g. spring-2026)','text'],
    ['name_en','Name (EN)','text'],
    ['name_zh','Name (ZH)','text'],
    ['date_label','Date Label (e.g. May 15, 2026)','text'],
    ['capacity','Capacity','number'],
    ['sort_order','Sort Order','number'],
  ];

  return (
    <div>
      {err && <div style={S.err}>{err}</div>}
      {msg && <div style={S.ok}>{msg}</div>}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 14, color: '#7A6A4A' }}>{tours.length} tournaments</span>
        <button style={S.btn('gold')} onClick={() => setAdding(true)}>+ Add Tournament</button>
      </div>

      {adding && (
        <div style={{ ...S.card, borderColor: '#C9A84C' }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>New Tournament</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {formFields.map(([k,l,t]) => (
              <div key={k}>
                <div style={S.label}>{l}</div>
                <input style={S.input} type={t} value={newT[k]}
                  onChange={e => setNewT(p => ({...p,[k]: t==='number' ? Number(e.target.value) : e.target.value}))} />
              </div>
            ))}
            <div>
              <div style={S.label}>Members Only</div>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                <input type="checkbox" checked={newT.members_only} onChange={e => setNewT(p => ({...p, members_only: e.target.checked}))} />
                Members only
              </label>
            </div>
            <div>
              <div style={S.label}>Active</div>
              <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
                <input type="checkbox" checked={newT.active} onChange={e => setNewT(p => ({...p, active: e.target.checked}))} />
                Visible to public
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={S.btn('gold')} onClick={create}>Create</button>
            <button style={S.btn('ghost')} onClick={() => { setAdding(false); setNewT(blank); setErr(''); }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>{['Key','Name EN','Name ZH','Date','Cap','Regs','Members Only','Active',''].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {tours.map(t => (
              <tr key={t.key}>
                <td style={S.td}><span style={{ color: '#9A8A6A', fontFamily: 'monospace', fontSize: 12 }}>{t.key}</span></td>
                <td style={S.td}><EditCell value={t.name_en} onSave={v => save(t.key, { name_en: v })} /></td>
                <td style={S.td}><EditCell value={t.name_zh || ''} onSave={v => save(t.key, { name_zh: v })} /></td>
                <td style={S.td}><EditCell value={t.date_label || ''} onSave={v => save(t.key, { date_label: v })} /></td>
                <td style={S.td}><EditCell value={t.capacity || 0} type="number" onSave={v => save(t.key, { capacity: v })} /></td>
                <td style={S.td}><span style={S.badge('gold')}>{t.registration_count || 0}</span></td>
                <td style={S.td}>
                  <button style={S.btn(t.members_only ? 'gold' : 'ghost')} onClick={() => save(t.key, { members_only: !t.members_only })}>
                    {t.members_only ? 'Yes' : 'No'}
                  </button>
                </td>
                <td style={S.td}>
                  <button style={S.btn(t.active ? 'green' : 'red')} onClick={() => save(t.key, { active: !t.active })}>
                    {t.active ? 'Active' : 'Hidden'}
                  </button>
                </td>
                <td style={S.td}>
                  <button style={S.btn('red')} onClick={() => del(t.key)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Bookings Tab ─────────────────────────────────────────────────────────────
function BookingsTab() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = filter ? `/api/admin/bookings?status=${filter}` : '/api/admin/bookings?limit=100';
    window.API.get(q).then(r => { setBookings(r.bookings || []); setLoading(false); });
  }, [filter]);

  const statusColor = { confirmed: 'green', pending: 'gold', cancelled: 'red' };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['', 'confirmed', 'pending', 'cancelled'].map(s => (
          <button key={s} style={S.btn(filter === s ? 'gold' : 'ghost')} onClick={() => setFilter(s)}>
            {s || 'All'}
          </button>
        ))}
      </div>
      {loading ? <div style={{ color: '#9A8A6A' }}>Loading…</div> : (
        <div style={S.card}>
          <table style={S.table}>
            <thead>
              <tr>{['Date','Time','Court','Session','Member / Guest','Price','Status'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td style={S.td}>{b.booking_date}</td>
                  <td style={S.td}>{b.slot_time}</td>
                  <td style={S.td}>{b.courts?.name || '—'}</td>
                  <td style={S.td}>{b.session_types?.label_en || b.session_types?.key || '—'}</td>
                  <td style={S.td}>
                    {b.profiles ? (
                      <span>{b.profiles.name}<br /><span style={{ color: '#9A8A6A', fontSize: 11 }}>{b.profiles.email}</span></span>
                    ) : (
                      <span>{b.guest_name || '—'}<br /><span style={{ color: '#9A8A6A', fontSize: 11 }}>{b.guest_email}</span></span>
                    )}
                  </td>
                  <td style={S.td}>HK${b.price_paid}</td>
                  <td style={S.td}><span style={S.badge(statusColor[b.status] || 'ghost')}>{b.status}</span></td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={7} style={{ ...S.td, textAlign: 'center', color: '#9A8A6A' }}>No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    window.API.get('/api/admin/users').then(r => setUsers(r.users || []));
  }, []);

  async function setTier(id, tier) {
    const r = await window.API.post('/api/admin/users', { action: 'update_tier', id, tier });
    if (!r.error) { setUsers(us => us.map(u => u.id === id ? r.user : u)); setMsg('Updated'); setTimeout(() => setMsg(''), 2000); }
  }

  async function toggleAdmin(id, is_admin) {
    if (!confirm(is_admin ? 'Grant admin access?' : 'Remove admin access?')) return;
    const r = await window.API.post('/api/admin/users', { action: 'toggle_admin', id, is_admin });
    if (!r.error) { setUsers(us => us.map(u => u.id === id ? r.user : u)); setMsg('Updated'); setTimeout(() => setMsg(''), 2000); }
  }

  const tierColor = { DINK: 'gold', FLEX: 'green', guest: 'ghost' };
  const filtered = users.filter(u =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {msg && <div style={S.ok}>{msg}</div>}
      <div style={{ marginBottom: 16 }}>
        <input style={{ ...S.input, maxWidth: 300 }} placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>{['Name','Email','Tier','Admin','Joined','Actions'].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td style={S.td}>{u.name}</td>
                <td style={S.td}>{u.email}</td>
                <td style={S.td}><span style={S.badge(tierColor[u.tier] || 'ghost')}>{u.tier}</span></td>
                <td style={S.td}>{u.is_admin ? <span style={S.badge('gold')}>Admin</span> : '—'}</td>
                <td style={S.td}><span style={{ color: '#9A8A6A', fontSize: 12 }}>{new Date(u.created_at).toLocaleDateString()}</span></td>
                <td style={S.td}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {['guest','FLEX','DINK'].map(tier => (
                      <button key={tier} style={S.btn(u.tier === tier ? 'gold' : 'ghost')} onClick={() => setTier(u.id, tier)}>{tier}</button>
                    ))}
                    <button style={S.btn(u.is_admin ? 'red' : 'ghost')} onClick={() => toggleAdmin(u.id, !u.is_admin)}>
                      {u.is_admin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ ...S.td, textAlign: 'center', color: '#9A8A6A' }}>No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────
window.AdminPage = function AdminPage({ user, setPage }) {
  const [tab, setTab] = useState('products');

  if (!user) {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, marginBottom: 12 }}>Please log in to access the admin panel.</div>
          <button style={S.btn('gold')} onClick={() => setPage('login')}>Log In</button>
        </div>
      </div>
    );
  }

  if (!user.is_admin) {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#DC2626' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>Access Denied</div>
          <div style={{ fontSize: 14, color: '#7A6A4A' }}>You do not have admin privileges.</div>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'products',    label: 'Products' },
    { key: 'pricing',     label: 'Pricing' },
    { key: 'courts',      label: 'Courts' },
    { key: 'tournaments', label: 'Tournaments' },
    { key: 'bookings',    label: 'Bookings' },
    { key: 'users',       label: 'Users' },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <h1 style={S.h1}>Admin Dashboard</h1>
        <p style={S.sub}>Manage website content, pricing, courts, and members.</p>

        <div style={S.tabs}>
          {tabs.map(t => (
            <button key={t.key} style={S.tab(tab === t.key)} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {tab === 'products'    && <ProductsTab />}
        {tab === 'pricing'     && <PricingTab />}
        {tab === 'courts'      && <CourtsTab />}
        {tab === 'tournaments' && <TournamentsTab />}
        {tab === 'bookings'    && <BookingsTab />}
        {tab === 'users'       && <UsersTab />}
      </div>
    </div>
  );
};
})();
