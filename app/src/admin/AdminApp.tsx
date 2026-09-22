import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Briefcase, FileText, FolderOpen, Globe, LayoutDashboard, LogOut, Mail,
  Megaphone, Pencil, Settings as SettingsIcon, Sparkles, Trash2, Eye,
} from 'lucide-react';
import { useSite, type ContactMessage } from './store';
import { Card, ConfirmDialog } from './ui';
import { PagesEditor, ProjectsEditor, ServicesEditor } from './editors';

// ---------------- Login ----------------
function Login({ onOk }: { onOk: () => void }) {
  const { settings } = useSite();
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === settings.password) onOk();
    else setErr(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-2xl p-8 space-y-4 shadow-2xl">
        <div className="text-center mb-2">
          <img src="/logo.jpg" alt="WIN" className="h-12 mx-auto mb-3 object-contain" />
          <h1 className="text-xl font-bold text-[#0022E8]">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Sign in to manage your website content</p>
        </div>
        <Input type="password" placeholder="Password" value={pwd} autoFocus
          onChange={(e) => { setPwd(e.target.value); setErr(false); }} />
        {err && <p className="text-sm text-red-600">Incorrect password. Please try again.</p>}
        <Button type="submit" className="w-full bg-[#0022E8] hover:bg-[#001bb8] text-white">Sign In</Button>
        <p className="text-xs text-center text-slate-400">Default password: win2026 — change it in Settings</p>
      </form>
    </div>
  );
}

// ---------------- Dashboard ----------------
function Dashboard() {
  const { content, messages } = useSite();
  const comm = content.projects.filter((p) => p.category === 'communication').length;
  const events = content.projects.filter((p) => p.category === 'events').length;
  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: 'Total Projects', value: content.projects.length, icon: FolderOpen, cls: 'bg-blue-50 text-[#0022E8]' },
    { label: 'Communication', value: comm, icon: Megaphone, cls: 'bg-indigo-50 text-indigo-600' },
    { label: 'Events Projects', value: events, icon: Sparkles, cls: 'bg-orange-50 text-[#FF8C00]' },
    { label: 'Unread Messages', value: unread, icon: Mail, cls: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Overview of your site content and inquiries</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.cls}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Recent Inquiries</h3>
            <Link to="/admin/messages" className="text-sm text-[#0022E8] hover:underline">View all</Link>
          </div>
          {messages.length === 0 && <p className="text-sm text-slate-400 py-6 text-center">No messages yet. Submissions from the contact form will appear here.</p>}
          <div className="space-y-3">
            {messages.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${m.read ? 'bg-slate-200' : 'bg-red-500'}`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">{m.name} <span className="text-slate-400 font-normal">· {m.service || 'General'}</span></div>
                  <div className="text-xs text-slate-500 truncate">{m.message}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { to: '/admin/projects', label: 'Manage Projects', icon: FolderOpen },
              { to: '/admin/services', label: 'Edit Services', icon: Briefcase },
              { to: '/admin/pages', label: 'Edit Page Content', icon: FileText },
              { to: '/admin/messages', label: 'View Inquiries', icon: Mail },
            ].map((q) => (
              <Link key={q.to} to={q.to}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#0022E8] hover:bg-blue-50/40 transition-all">
                <q.icon className="w-5 h-5 text-[#0022E8]" />
                <span className="text-sm font-medium text-slate-700">{q.label}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ---------------- Messages ----------------
function MessagesAdmin({ notify }: { notify: (m: string) => void }) {
  const { messages, patchMessage, deleteMessage } = useSite();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [viewing, setViewing] = useState<ContactMessage | null>(null);
  const [toDelete, setToDelete] = useState<ContactMessage | null>(null);

  const filtered = messages.filter((m) => (filter === 'all' ? true : filter === 'unread' ? !m.read : m.read));

  const open = (m: ContactMessage) => {
    setViewing(m);
    if (!m.read) patchMessage(m.id, { read: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact Inquiries</h1>
          <p className="text-sm text-slate-500">{messages.filter((m) => !m.read).length} unread of {messages.length} total</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${filter === f ? 'bg-[#0022E8] text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        {filtered.length === 0 && (
          <p className="px-4 py-12 text-center text-slate-400 text-sm">No {filter === 'all' ? '' : filter} messages.</p>
        )}
        <div className="divide-y divide-slate-100">
          {filtered.map((m) => (
            <div key={m.id} className={`px-4 py-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer ${!m.read ? 'bg-blue-50/40' : ''}`} onClick={() => open(m)}>
              <div className={`w-2 h-2 rounded-full shrink-0 ${m.read ? 'bg-slate-200' : 'bg-red-500'}`} />
              <div className="min-w-0 flex-1">
                <div className="text-sm">
                  <span className={`${m.read ? 'font-medium' : 'font-semibold'} text-slate-800`}>{m.name}</span>
                  <span className="text-slate-400"> · {m.email}</span>
                </div>
                <div className="text-xs text-slate-500 truncate">{m.message}</div>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <div className="text-xs text-slate-400">{new Date(m.date).toLocaleDateString()}</div>
                {m.service && <div className="text-xs text-[#0022E8]">{m.service}</div>}
              </div>
              <div className="flex gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" title="View" onClick={() => open(m)}><Eye className="w-4 h-4 text-slate-500" /></Button>
                <Button variant="ghost" size="icon" title={m.read ? 'Mark as unread' : 'Mark as read'}
                  onClick={() => { patchMessage(m.id, { read: !m.read }); notify(m.read ? 'Marked as unread' : 'Marked as read'); }}>
                  <Mail className="w-4 h-4 text-slate-500" />
                </Button>
                <Button variant="ghost" size="icon" title="Delete" onClick={() => setToDelete(m)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewing(null)}>
          <Card className="w-full max-w-lg p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{viewing.name}</h2>
              <p className="text-sm text-slate-500">{new Date(viewing.date).toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-400 text-xs uppercase">Email</span><div className="text-slate-700 break-all">{viewing.email}</div></div>
              <div><span className="text-slate-400 text-xs uppercase">Phone</span><div className="text-slate-700">{viewing.phone || '—'}</div></div>
              <div className="col-span-2"><span className="text-slate-400 text-xs uppercase">Service of interest</span><div className="text-slate-700">{viewing.service || 'General inquiry'}</div></div>
            </div>
            <div>
              <span className="text-slate-400 text-xs uppercase">Message</span>
              <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 mt-1 whitespace-pre-wrap">{viewing.message}</p>
            </div>
            <div className="flex gap-2 pt-2">
              <a href={`mailto:${viewing.email}?subject=Re: Your inquiry - WIN Human Capital`} className="flex-1">
                <Button className="w-full bg-[#0022E8] hover:bg-[#001bb8] text-white">Reply by Email</Button>
              </a>
              <Button variant="outline" onClick={() => { patchMessage(viewing.id, { read: !viewing.read }); setViewing(null); }}>
                {viewing.read ? 'Mark Unread' : 'Mark Read'}
              </Button>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => { deleteMessage(viewing.id); setViewing(null); notify('Message deleted'); }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      <ConfirmDialog open={toDelete !== null} onClose={() => setToDelete(null)}
        onConfirm={() => { if (toDelete) { deleteMessage(toDelete.id); notify('Message deleted'); } }}
        title="Delete message?" description="This inquiry will be permanently removed." />
    </div>
  );
}

// ---------------- Settings ----------------
function SettingsAdmin({ notify }: { notify: (m: string) => void }) {
  const { settings, setPassword, exportAll, importAll, resetContent } = useSite();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);

  const submitPwd = (e: React.FormEvent) => {
    e.preventDefault();
    if (current !== settings.password) return notify('Current password is incorrect');
    if (next.length < 4) return notify('New password must be at least 4 characters');
    if (next !== confirmPwd) return notify('New passwords do not match');
    setPassword(next);
    setCurrent(''); setNext(''); setConfirmPwd('');
    notify('Password updated');
  };

  const doExport = () => {
    const blob = new Blob([exportAll()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `win-site-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Backup downloaded');
  };

  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => notify(importAll(String(reader.result)) ? 'Backup imported successfully' : 'Import failed: invalid file');
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Security, backups and data management</p>
      </div>

      <Card className="p-5 space-y-4">
        <h3 className="font-semibold text-slate-800">Change Password</h3>
        <form onSubmit={submitPwd} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current</Label>
            <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">New</Label>
            <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Confirm new</Label>
            <Input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
          </div>
          <div className="sm:col-span-3">
            <Button type="submit" className="bg-[#0022E8] hover:bg-[#001bb8] text-white">Update Password</Button>
          </div>
        </form>
      </Card>

      <Card className="p-5 space-y-4">
        <h3 className="font-semibold text-slate-800">Backup &amp; Restore</h3>
        <p className="text-sm text-slate-500">All content and messages are stored in this browser. Export a JSON backup regularly, or import one to restore / move to another computer.</p>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={doExport}>Export Backup (JSON)</Button>
          <label className="inline-flex items-center px-4 h-9 rounded-md border border-slate-300 text-sm cursor-pointer hover:bg-slate-50">
            Import Backup
            <input type="file" accept="application/json" className="hidden" onChange={onImportFile} />
          </label>
        </div>
      </Card>

      <Card className="p-5 space-y-3 border-red-200">
        <h3 className="font-semibold text-red-600">Danger Zone</h3>
        <p className="text-sm text-slate-500">Reset all site content (projects, services, page text, contact info) back to the original defaults. Messages are kept.</p>
        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => setConfirmReset(true)}>
          Reset Content to Defaults
        </Button>
      </Card>

      <ConfirmDialog open={confirmReset} onClose={() => setConfirmReset(false)}
        onConfirm={() => { resetContent(); notify('Content reset to defaults'); }}
        title="Reset all content?" description="All your edits will be replaced with the original site content. This cannot be undone unless you have a backup."
        confirmLabel="Reset Everything" />
    </div>
  );
}

// ---------------- Shell ----------------
const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderOpen, end: false },
  { to: '/admin/services', label: 'Services', icon: Briefcase, end: false },
  { to: '/admin/pages', label: 'Pages', icon: FileText, end: false },
  { to: '/admin/messages', label: 'Messages', icon: Mail, end: false },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon, end: false },
];

export default function AdminApp() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('win_admin_session') === '1');
  const [toast, setToast] = useState<string | null>(null);
  const { messages } = useSite();
  const unread = messages.filter((m) => !m.read).length;

  const notify = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2500);
  };

  if (!authed) {
    return <Login onOk={() => { sessionStorage.setItem('win_admin_session', '1'); setAuthed(true); }} />;
  }

  return (
    <div className="min-h-screen bg-[#f4f5fb] flex">
      <aside className="w-60 shrink-0 bg-[#0a0a0a] text-white flex-col hidden md:flex">
        <div className="p-5 border-b border-white/10">
          <img src="/logo.jpg" alt="WIN" className="h-10 object-contain" />
          <p className="text-xs text-white/50 mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#0022E8] text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`
              }>
              <n.icon className="w-4 h-4" />
              <span className="flex-1">{n.label}</span>
              {n.label === 'Messages' && unread > 0 && (
                <span className="text-xs bg-[#FF8C00] text-white rounded-full px-2 py-0.5 font-bold">{unread}</span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5">
            <Globe className="w-4 h-4" /> View Site
          </Link>
          <button onClick={() => { sessionStorage.removeItem('win_admin_session'); setAuthed(false); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 md:hidden flex items-center justify-between">
          <span className="font-bold text-[#0022E8]">WIN Admin</span>
          <div className="flex gap-2">
            <Link to="/" className="text-sm text-slate-500">View Site</Link>
            <button onClick={() => { sessionStorage.removeItem('win_admin_session'); setAuthed(false); }} className="text-sm text-red-500">Logout</button>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8 flex-1">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsEditor notify={notify} />} />
            <Route path="services" element={<ServicesEditor notify={notify} />} />
            <Route path="pages" element={<PagesEditor notify={notify} />} />
            <Route path="messages" element={<MessagesAdmin notify={notify} />} />
            <Route path="settings" element={<SettingsAdmin notify={notify} />} />
          </Routes>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#0a0a0a] text-white text-sm px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2">
          <Pencil className="w-4 h-4 text-[#FF8C00]" /> {toast}
        </div>
      )}
    </div>
  );
}
