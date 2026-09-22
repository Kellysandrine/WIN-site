import type { ChangeEvent, ReactNode } from 'react';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Upload } from 'lucide-react';
import { ICON_CHOICES, iconFor } from './store';

const selectCls = 'w-full h-9 rounded-md border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0022E8]';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>{children}</div>;
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</Label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function TSelect({ value, onChange, options, className = '' }: {
  value: string; onChange: (v: string) => void;
  options: { value: string; label: string }[]; className?: string;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`${selectCls} ${className}`}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const Preview = iconFor(value);
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-md border border-slate-200 flex items-center justify-center shrink-0 bg-slate-50">
        <Preview className="w-4 h-4 text-[#0022E8]" />
      </div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {ICON_CHOICES.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
  );
}

export const PUBLIC_IMAGES = [
  '/hero-bg.jpg', '/hr-services.jpg', '/events-services.jpg', '/communication-services.jpg',
  '/office-building.jpg', '/about-leader.jpg', '/women-empowerment.jpg',
  '/project-conference.jpg', '/project-documentary.jpg', '/project-gala-event.jpg',
  '/project-health-ads.jpg', '/project-tv-commercial.jpg', '/project-women-empowerment.jpg',
];

export function ImagePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = '';
  };
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} list="win-images" placeholder="/image.jpg or https://..." />
        <label className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md border border-slate-300 text-sm cursor-pointer hover:bg-slate-50 shrink-0">
          <Upload className="w-4 h-4" /> Upload
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
      </div>
      <datalist id="win-images">
        {PUBLIC_IMAGES.map((i) => <option key={i} value={i} />)}
      </datalist>
      {value && <img src={value} alt="" className="h-20 rounded-lg object-cover border border-slate-200" />}
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel = 'Delete' }: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; description: string; confirmLabel?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { onConfirm(); onClose(); }}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
