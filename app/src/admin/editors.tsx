import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useSite, type Category, type IconItem, type Project, type SiteContent, type Step } from './store';
import { Card, ConfirmDialog, Field, IconPicker, ImagePicker, TSelect } from './ui';

// ============================= PROJECTS =============================
const emptyProject = (): Project => ({
  id: `p-${Date.now().toString(36)}`,
  title: '',
  category: 'communication',
  client: '',
  image: '/project-documentary.jpg',
  shortDesc: '',
  overview: '',
  deliverables: [],
  year: String(new Date().getFullYear()),
});

export function ProjectsEditor({ notify }: { notify: (m: string) => void }) {
  const { content, setContent } = useSite();
  const [query, setQuery] = useState('');
  const [draft, setDraft] = useState<Project | null>(null);
  const [toDelete, setToDelete] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return content.projects.filter((p) =>
      !q || p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q));
  }, [content.projects, query]);

  const isNew = draft !== null && !content.projects.some((p) => p.id === draft.id);

  const save = () => {
    if (!draft) return;
    const exists = content.projects.some((p) => p.id === draft.id);
    setContent({
      ...content,
      projects: exists
        ? content.projects.map((p) => (p.id === draft.id ? draft : p))
        : [draft, ...content.projects],
    });
    setDraft(null);
    notify(exists ? 'Project updated' : 'Project added');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500">{content.projects.length} projects — changes go live instantly</p>
        </div>
        <Button className="bg-[#0022E8] hover:bg-[#001bb8] text-white" onClick={() => setDraft(emptyProject())}>
          <Plus className="w-4 h-4 mr-1" /> Add Project
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title or client..." className="pl-9" />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
                <th className="px-4 py-3 font-semibold">Project</th>
                <th className="px-4 py-3 font-semibold">Client</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Year</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-12 h-9 rounded-md object-cover border border-slate-200" />
                      <div>
                        <div className="font-medium text-slate-800">{p.title}</div>
                        <div className="text-xs text-slate-400 max-w-xs truncate">{p.shortDesc}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.client}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.category === 'communication' ? 'bg-blue-50 text-[#0022E8]' : 'bg-orange-50 text-[#FF8C00]'}`}>
                      {p.category === 'communication' ? 'Communication' : 'Events'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.year}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link to={`/projects/${p.id}`} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="icon" title="View on site"><Eye className="w-4 h-4 text-slate-500" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" title="Edit" onClick={() => setDraft(structuredClone(p))}>
                        <Pencil className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Delete" onClick={() => setToDelete(p)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">No projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={draft !== null} onOpenChange={(o) => { if (!o) setDraft(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{isNew ? 'Add Project' : 'Edit Project'}</DialogTitle></DialogHeader>
          {draft && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title"><Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></Field>
                <Field label="Client"><Input value={draft.client} onChange={(e) => setDraft({ ...draft, client: e.target.value })} /></Field>
                <Field label="Category">
                  <TSelect value={draft.category} onChange={(v) => setDraft({ ...draft, category: v as Category })}
                    options={[{ value: 'communication', label: 'Communication' }, { value: 'events', label: 'Events' }]} />
                </Field>
                <Field label="Year"><Input value={draft.year} onChange={(e) => setDraft({ ...draft, year: e.target.value })} /></Field>
              </div>
              <Field label="Image" hint="Pick an existing file, paste a URL, or upload a new image.">
                <ImagePicker value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
              </Field>
              <Field label="Short description"><Input value={draft.shortDesc} onChange={(e) => setDraft({ ...draft, shortDesc: e.target.value })} /></Field>
              <Field label="Overview"><Textarea rows={4} value={draft.overview} onChange={(e) => setDraft({ ...draft, overview: e.target.value })} /></Field>
              <Field label="Deliverables" hint="One per line.">
                <Textarea rows={3} value={draft.deliverables.join('\n')}
                  onChange={(e) => setDraft({ ...draft, deliverables: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })} />
              </Field>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button>
            <Button className="bg-[#0022E8] hover:bg-[#001bb8] text-white" onClick={save} disabled={!draft?.title.trim()}>
              {isNew ? 'Create Project' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={toDelete !== null} onClose={() => setToDelete(null)}
        onConfirm={() => { if (toDelete) { setContent({ ...content, projects: content.projects.filter((x) => x.id !== toDelete.id) }); notify('Project deleted'); } }}
        title="Delete project?" description={`"${toDelete?.title}" will be permanently removed from the site.`} />
    </div>
  );
}

// ============================= SERVICES =============================
const SERVICE_KEYS = ['hr', 'events', 'communication'] as const;
type ServiceKey = (typeof SERVICE_KEYS)[number];

function IconItemsEditor({ items, onChange }: { items: IconItem[]; onChange: (v: IconItem[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-52 shrink-0">
            <IconPicker value={item.icon} onChange={(icon) => onChange(items.map((x, j) => (j === i ? { ...x, icon } : x)))} />
          </div>
          <Input value={item.title} placeholder="Item title"
            onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          <Button variant="ghost" size="icon" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={() => onChange([...items, { icon: 'Star', title: 'New item' }])}>
        <Plus className="w-4 h-4 mr-1" /> Add item
      </Button>
    </div>
  );
}

function StepsEditor({ steps, onChange }: { steps: Step[]; onChange: (v: Step[]) => void }) {
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input className="w-16 shrink-0 text-center" value={s.number}
            onChange={(e) => onChange(steps.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)))} />
          <Input value={s.title} placeholder="Step title"
            onChange={(e) => onChange(steps.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)))} />
          <div className="w-52 shrink-0">
            <IconPicker value={s.icon} onChange={(icon) => onChange(steps.map((x, j) => (j === i ? { ...x, icon } : x)))} />
          </div>
          <Button variant="ghost" size="icon" onClick={() => onChange(steps.filter((_, j) => j !== i))}>
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm"
        onClick={() => onChange([...steps, { number: String(steps.length + 1).padStart(2, '0'), title: 'New step', icon: 'Star' }])}>
        <Plus className="w-4 h-4 mr-1" /> Add step
      </Button>
    </div>
  );
}

export function ServicesEditor({ notify }: { notify: (m: string) => void }) {
  const { content, setContent } = useSite();
  const [tab, setTab] = useState<ServiceKey>('hr');
  const svc = content.services[tab];

  const updateSvc = (patch: Record<string, unknown>) => {
    setContent({ ...content, services: { ...content.services, [tab]: { ...svc, ...patch } } });
    notify('Saved — live on the site');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Services</h1>
        <p className="text-sm text-slate-500">Edit hero text, service items and process steps for each service page</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {SERVICE_KEYS.map((k) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tab === k ? 'bg-[#0022E8] text-white shadow' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0022E8]'}`}>
            {content.services[k].name}
          </button>
        ))}
      </div>

      <Card className="p-5 space-y-4">
        <h3 className="font-semibold text-slate-800">Page Hero</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Title (before accent)"><Input value={svc.heroTitle} onChange={(e) => updateSvc({ heroTitle: e.target.value })} /></Field>
          <Field label="Accent word (orange)"><Input value={svc.heroAccent} onChange={(e) => updateSvc({ heroAccent: e.target.value })} /></Field>
        </div>
        <Field label="Subtitle"><Textarea rows={2} value={svc.heroSubtitle} onChange={(e) => updateSvc({ heroSubtitle: e.target.value })} /></Field>
        <Field label="Hero image"><ImagePicker value={svc.heroImage} onChange={(heroImage) => updateSvc({ heroImage })} /></Field>
      </Card>

      <Card className="p-5 space-y-4">
        <h3 className="font-semibold text-slate-800">Services / Offerings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Section title"><Input value={svc.offerTitle} onChange={(e) => updateSvc({ offerTitle: e.target.value })} /></Field>
          <Field label="Accent word"><Input value={svc.offerAccent} onChange={(e) => updateSvc({ offerAccent: e.target.value })} /></Field>
          <Field label="Subtitle"><Input value={svc.offerSubtitle} onChange={(e) => updateSvc({ offerSubtitle: e.target.value })} /></Field>
        </div>
        <IconItemsEditor items={svc.items} onChange={(items) => updateSvc({ items })} />
      </Card>

      {tab === 'communication' && (
        <>
          <Card className="p-5 space-y-4">
            <h3 className="font-semibold text-slate-800">Production Items</h3>
            <IconItemsEditor items={svc.productionItems} onChange={(productionItems) => updateSvc({ productionItems })} />
          </Card>
          <Card className="p-5 space-y-4">
            <h3 className="font-semibold text-slate-800">Core Expertise</h3>
            <IconItemsEditor items={svc.expertise} onChange={(expertise) => updateSvc({ expertise })} />
          </Card>
        </>
      )}

      <Card className="p-5 space-y-4">
        <h3 className="font-semibold text-slate-800">Process Steps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Section title"><Input value={svc.processTitle} onChange={(e) => updateSvc({ processTitle: e.target.value })} /></Field>
          <Field label="Accent word"><Input value={svc.processAccent} onChange={(e) => updateSvc({ processAccent: e.target.value })} /></Field>
          <Field label="Subtitle"><Input value={svc.processSubtitle} onChange={(e) => updateSvc({ processSubtitle: e.target.value })} /></Field>
        </div>
        <StepsEditor steps={svc.steps} onChange={(steps) => updateSvc({ steps })} />
      </Card>
    </div>
  );
}

// ============================= PAGES =============================
type PageTab = 'home' | 'about' | 'contact';

export function PagesEditor({ notify }: { notify: (m: string) => void }) {
  const { content, setContent } = useSite();
  const [tab, setTab] = useState<PageTab>('home');

  const update = (patch: Partial<SiteContent>) => { setContent({ ...content, ...patch }); notify('Saved — live on the site'); };
  const saveContact = (patch: Partial<SiteContent['contact']>) =>
    update({ contact: { ...content.contact, ...patch } });

  const pageTabs: { key: PageTab; label: string }[] = [
    { key: 'home', label: 'Home Page' },
    { key: 'about', label: 'About Page' },
    { key: 'contact', label: 'Contact Info' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Page Content</h1>
        <p className="text-sm text-slate-500">Edit site-wide text, stats, values and contact details</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {pageTabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tab === t.key ? 'bg-[#0022E8] text-white shadow' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0022E8]'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'home' && (
        <>
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-slate-800">Hero Service Buttons</h3>
            {content.home.heroServices.map((s, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                <Input className="w-44" value={s.title} placeholder="Title"
                  onChange={(e) => update({ home: { ...content.home, heroServices: content.home.heroServices.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) } })} />
                <div className="w-40">
                  <TSelect value={s.path} options={[
                    { value: '/hr-services', label: '/hr-services' },
                    { value: '/events-services', label: '/events-services' },
                    { value: '/communication-services', label: '/communication-services' },
                  ]} onChange={(v) => update({ home: { ...content.home, heroServices: content.home.heroServices.map((x, j) => (j === i ? { ...x, path: v } : x)) } })} />
                </div>
                <div className="w-44">
                  <IconPicker value={s.icon} onChange={(icon) => update({ home: { ...content.home, heroServices: content.home.heroServices.map((x, j) => (j === i ? { ...x, icon } : x)) } })} />
                </div>
                <Input className="flex-1 min-w-40" value={s.desc} placeholder="Short description"
                  onChange={(e) => update({ home: { ...content.home, heroServices: content.home.heroServices.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)) } })} />
                <Button variant="ghost" size="icon" onClick={() => update({ home: { ...content.home, heroServices: content.home.heroServices.filter((_, j) => j !== i) } })}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => update({ home: { ...content.home, heroServices: [...content.home.heroServices, { title: 'New', path: '/hr-services', icon: 'Star', desc: '' }] } })}>
              <Plus className="w-4 h-4 mr-1" /> Add button
            </Button>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-slate-800">Feature Cards</h3>
            {content.home.features.map((f, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                <div className="w-44">
                  <IconPicker value={f.icon} onChange={(icon) => update({ home: { ...content.home, features: content.home.features.map((x, j) => (j === i ? { ...x, icon } : x)) } })} />
                </div>
                <Input className="w-52" value={f.title} placeholder="Title"
                  onChange={(e) => update({ home: { ...content.home, features: content.home.features.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) } })} />
                <Input className="flex-1 min-w-40" value={f.desc} placeholder="Description"
                  onChange={(e) => update({ home: { ...content.home, features: content.home.features.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)) } })} />
                <Button variant="ghost" size="icon" onClick={() => update({ home: { ...content.home, features: content.home.features.filter((_, j) => j !== i) } })}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => update({ home: { ...content.home, features: [...content.home.features, { icon: 'Star', title: 'New feature', desc: '' }] } })}>
              <Plus className="w-4 h-4 mr-1" /> Add feature
            </Button>
          </Card>
        </>
      )}

      {tab === 'about' && (
        <>
          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-slate-800">Stats</h3>
            {content.about.stats.map((s, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2">
                <Input className="w-24" value={s.number}
                  onChange={(e) => update({ about: { ...content.about, stats: content.about.stats.map((x, j) => (j === i ? { ...x, number: e.target.value } : x)) } })} />
                <Input className="w-40" value={s.label}
                  onChange={(e) => update({ about: { ...content.about, stats: content.about.stats.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) } })} />
                <div className="w-44">
                  <IconPicker value={s.icon} onChange={(icon) => update({ about: { ...content.about, stats: content.about.stats.map((x, j) => (j === i ? { ...x, icon } : x)) } })} />
                </div>
                <Button variant="ghost" size="icon" onClick={() => update({ about: { ...content.about, stats: content.about.stats.filter((_, j) => j !== i) } })}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => update({ about: { ...content.about, stats: [...content.about.stats, { number: '10+', label: 'New', icon: 'Star' }] } })}>
              <Plus className="w-4 h-4 mr-1" /> Add stat
            </Button>
          </Card>

          <Card className="p-5 space-y-3">
            <h3 className="font-semibold text-slate-800">Values</h3>
            {content.about.values.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-44">
                  <IconPicker value={v.icon} onChange={(icon) => update({ about: { ...content.about, values: content.about.values.map((x, j) => (j === i ? { ...x, icon } : x)) } })} />
                </div>
                <Input value={v.title} onChange={(e) => update({ about: { ...content.about, values: content.about.values.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) } })} />
                <Button variant="ghost" size="icon" onClick={() => update({ about: { ...content.about, values: content.about.values.filter((_, j) => j !== i) } })}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => update({ about: { ...content.about, values: [...content.about.values, { icon: 'Star', title: 'New value' }] } })}>
              <Plus className="w-4 h-4 mr-1" /> Add value
            </Button>
          </Card>

          <Card className="p-5 space-y-4">
            <h3 className="font-semibold text-slate-800">Story, Vision &amp; Mission</h3>
            <Field label="Our Story"><Textarea rows={4} value={content.about.story} onChange={(e) => update({ about: { ...content.about, story: e.target.value } })} /></Field>
            <Field label="Vision"><Textarea rows={3} value={content.about.vision} onChange={(e) => update({ about: { ...content.about, vision: e.target.value } })} /></Field>
            <Field label="Mission"><Textarea rows={3} value={content.about.mission} onChange={(e) => update({ about: { ...content.about, mission: e.target.value } })} /></Field>
          </Card>
        </>
      )}

      {tab === 'contact' && (
        <Card className="p-5 space-y-4">
          <h3 className="font-semibold text-slate-800">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Address"><Input value={content.contact.address} onChange={(e) => saveContact({ address: e.target.value })} /></Field>
            <Field label="Phone"><Input value={content.contact.phone} onChange={(e) => saveContact({ phone: e.target.value })} /></Field>
            <Field label="Email"><Input value={content.contact.email} onChange={(e) => saveContact({ email: e.target.value })} /></Field>
            <Field label="Working hours"><Input value={content.contact.hours} onChange={(e) => saveContact({ hours: e.target.value })} /></Field>
            <Field label="LinkedIn URL"><Input value={content.contact.socials.linkedin} onChange={(e) => saveContact({ socials: { ...content.contact.socials, linkedin: e.target.value } })} /></Field>
            <Field label="Facebook URL"><Input value={content.contact.socials.facebook} onChange={(e) => saveContact({ socials: { ...content.contact.socials, facebook: e.target.value } })} /></Field>
            <Field label="Twitter / X URL"><Input value={content.contact.socials.twitter} onChange={(e) => saveContact({ socials: { ...content.contact.socials, twitter: e.target.value } })} /></Field>
            <Field label="Instagram URL"><Input value={content.contact.socials.instagram} onChange={(e) => saveContact({ socials: { ...content.contact.socials, instagram: e.target.value } })} /></Field>
          </div>
        </Card>
      )}
    </div>
  );
}
