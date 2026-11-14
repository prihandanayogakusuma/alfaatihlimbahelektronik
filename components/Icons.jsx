// Ikon SVG ringan (tanpa library tambahan agar website tetap cepat)

const shapes = {
  bin: <path d="M3 7h18M5 7l1 13h12l1-13M9 7V4h6v3M10 11v6M14 11v6" />,
  money: <path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  lock: (<><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>),
  truck: (<><path d="M1 6h13v10H1zM14 10h4l3 3v3h-7" /><circle cx="5" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>),
  doc: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>),
  recycle: <path d="M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L7.2 9.5M11 4.6a1.8 1.8 0 0 1 3.1 0l4 6.9M16 19h3.2a1.8 1.8 0 0 0 1.6-2.7l-1.4-2.4M7 19l3-3M7 19l3 3M14.5 8l1-3.9 3.6 1.7M8.3 13.4 4.5 12.3 6 8.6" />,
  pin: (<><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />,
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  instagram: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></>),
};

export function Icon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{shapes[name]}</svg>;
}
