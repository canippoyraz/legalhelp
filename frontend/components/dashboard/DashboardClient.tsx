'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { HistoryItem, AgreementType } from '@/types/agreement';

const TYPE_LABELS: Record<AgreementType, string> = {
  nda: 'NDA', employment: 'Employment', freelance: 'Freelance', lease: 'Lease',
};
const TYPE_BADGE: Record<AgreementType, string> = {
  nda: 'badge--blue', employment: 'badge--green', freelance: 'badge--gold', lease: 'badge--purple',
};
const TYPE_COLORS: Record<AgreementType, string> = {
  nda: '#1a56db', employment: '#10b981', freelance: '#f59e0b', lease: '#8b5cf6',
};

export default function DashboardClient() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filterType, setFilterType] = useState('');
  const [filterState, setFilterState] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalItem, setModalItem] = useState<HistoryItem | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('lh_agreements') || '[]');
      setHistory(Array.isArray(parsed) ? parsed : []);
    } catch { setHistory([]); }
  }, []);

  const filtered = [...history]
    .reverse()
    .filter(a => !filterType || a.type === filterType)
    .filter(a => !filterState || a.state === filterState);

  const uniqueStates = [...new Set(history.map(a => a.state))].sort();

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonth = history.filter(a => new Date(a.createdAt) >= monthStart).length;
  const statesCovered = new Set(history.map(a => a.state)).size;
  const typeCounts = history.reduce<Record<string, number>>((acc, a) => {
    acc[a.type] = (acc[a.type] ?? 0) + 1; return acc;
  }, {});
  const topType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as AgreementType | undefined;

  function clearHistory() {
    if (!confirm('Delete all saved agreements? This cannot be undone.')) return;
    localStorage.removeItem('lh_agreements');
    setHistory([]);
  }

  const copyModal = useCallback(() => {
    if (!modalItem) return;
    navigator.clipboard.writeText(modalItem.text).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    });
  }, [modalItem]);

  const downloadModal = useCallback(async () => {
    if (!modalItem) return;
    const { downloadAsPdf } = await import('@/lib/pdfGenerator');
    downloadAsPdf(modalItem.text, modalItem.type, modalItem.state);
  }, [modalItem]);

  return (
    <div className="dash-page">
      {/* Sidebar */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <Link href="/" className="sidebar__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#1a56db"/>
            <path d="M7 8h14M7 12h10M7 16h12M7 20h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Legal<span>Help</span>
        </Link>
        <nav className="sidebar__nav">
          <Link href="/dashboard" className="sidebar__link active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg>
            Dashboard
          </Link>
          <Link href="/builder" className="sidebar__link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/></svg>
            New Agreement
          </Link>
          <Link href="/" className="sidebar__link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2"/></svg>
            Home
          </Link>
        </nav>
        <div className="sidebar__section-title">Agreement Types</div>
        <nav className="sidebar__nav">
          <Link href="/builder?type=nda" className="sidebar__link">🤝 Mutual NDA</Link>
          <Link href="/builder?type=employment" className="sidebar__link">💼 Employment</Link>
          <Link href="/builder?type=freelance" className="sidebar__link">🖥️ Freelance</Link>
          <Link href="/builder?type=lease" className="sidebar__link">🏠 Lease</Link>
        </nav>
        <div className="sidebar__footer">
          <button className="sidebar__clear" onClick={clearHistory}>Clear History</button>
        </div>
      </aside>

      {/* Main */}
      <div className="dash-main">
        <header className="topbar">
          <div className="topbar__left">
            <button className="topbar__menu" onClick={() => setSidebarOpen(o => !o)}>&#9776;</button>
            <h1>Dashboard</h1>
          </div>
          <div className="topbar__right">
            <Link href="/builder" className="btn btn--primary">+ New Agreement</Link>
          </div>
        </header>

        <div className="dash-content">
          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#fff" strokeWidth="2"/><polyline points="14 2 14 8 20 8" stroke="#fff" strokeWidth="2"/></svg>
              </div>
              <div><div className="stat-card__value">{history.length}</div><div className="stat-card__label">Total Agreements</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--green">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#fff" strokeWidth="2"/><polyline points="22 4 12 14.01 9 11.01" stroke="#fff" strokeWidth="2"/></svg>
              </div>
              <div><div className="stat-card__value">{thisMonth}</div><div className="stat-card__label">This Month</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--purple">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <div><div className="stat-card__value">{topType ? TYPE_LABELS[topType] : '—'}</div><div className="stat-card__label">Most Used Type</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#fff" strokeWidth="2"/></svg>
              </div>
              <div><div className="stat-card__value">{statesCovered}</div><div className="stat-card__label">States Covered</div></div>
            </div>
          </div>

          {/* Grid */}
          <div className="dash-grid">
            {/* Agreements table */}
            <div className="dash-card dash-card--wide">
              <div className="dash-card__header">
                <h2>Recent Agreements</h2>
                <div className="filter-row">
                  <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="nda">NDA</option>
                    <option value="employment">Employment</option>
                    <option value="freelance">Freelance</option>
                    <option value="lease">Lease</option>
                  </select>
                  <select value={filterState} onChange={e => setFilterState(e.target.value)}>
                    <option value="">All States</option>
                    {uniqueStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#d1d5db" strokeWidth="1.5"/><polyline points="14 2 14 8 20 8" stroke="#d1d5db" strokeWidth="1.5"/></svg>
                  <p>No agreements yet.</p>
                  <Link href="/builder" className="btn btn--primary" style={{marginTop:'.75rem'}}>Create your first agreement</Link>
                </div>
              ) : (
                <table className="ag-table">
                  <thead>
                    <tr><th>Type</th><th>Parties</th><th>State</th><th>Created</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map(item => (
                      <tr key={item.id}>
                        <td><span className={`badge ${TYPE_BADGE[item.type]}`}>{TYPE_LABELS[item.type]}</span></td>
                        <td className="parties-cell">{item.parties}</td>
                        <td><span className="state-pill">{item.state}</span></td>
                        <td>{(() => { const d = new Date(item.createdAt); return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}); })()}</td>
                        <td><button className="view-btn" onClick={() => setModalItem(item)}>View →</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Right panel */}
            <div className="dash-right">
              {/* Breakdown */}
              <div className="dash-card">
                <div className="dash-card__header"><h2>By Type</h2></div>
                <div className="breakdown">
                  {Object.keys(typeCounts).length === 0 ? (
                    <div className="breakdown-empty">No data yet</div>
                  ) : (
                    (Object.entries(typeCounts) as [AgreementType, number][]).map(([type, count]) => (
                      <div className="bar-row" key={type}>
                        <span className="bar-label">{TYPE_LABELS[type]}</span>
                        <div className="bar-track">
                          <div className="bar-fill" style={{width:`${Math.round(count/history.length*100)}%`, background: TYPE_COLORS[type]}}></div>
                        </div>
                        <span className="bar-count">{count}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Quick create */}
              <div className="dash-card">
                <div className="dash-card__header"><h2>Quick Create</h2></div>
                <div className="quick-grid">
                  <Link href="/builder" className="quick-btn">🤝<span>NDA</span></Link>
                  <Link href="/builder" className="quick-btn">💼<span>Employment</span></Link>
                  <Link href="/builder" className="quick-btn">🖥️<span>Freelance</span></Link>
                  <Link href="/builder" className="quick-btn">🏠<span>Lease</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalItem && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModalItem(null); }}>
          <div className="modal">
            <div className="modal__header">
              <h3>{TYPE_LABELS[modalItem.type]} — {modalItem.state}</h3>
              <div style={{display:'flex', gap:'.5rem'}}>
                <button className="btn btn--outline" onClick={copyModal}>📋 Copy</button>
                <button className="btn btn--primary" onClick={downloadModal}>⬇ Download</button>
                <button className="modal__close" onClick={() => setModalItem(null)}>&times;</button>
              </div>
            </div>
            <div className="modal__body"><pre>{modalItem.text}</pre></div>
          </div>
        </div>
      )}

      <div className={`toast${toastVisible ? ' show' : ''}`}>Copied to clipboard!</div>
    </div>
  );
}
