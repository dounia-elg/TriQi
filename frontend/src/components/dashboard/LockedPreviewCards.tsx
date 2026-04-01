import { Target, BookOpen, School } from 'lucide-react';

const lockedItems = [
  {
    label: 'Results Summary',
    icon: Target,
    bg: 'bg-(--tint-blue)',
    border: 'border-(--blue)',
    iconColor: 'text-(--primary)',
    textColor: 'text-(--primary)',
  },
  {
    label: 'Learning Roadmap',
    icon: BookOpen,
    bg: 'bg-(--tint-green)',
    border: 'border-(--green)',
    iconColor: 'text-(--accent)',
    textColor: 'text-(--accent)',
  },
  {
    label: 'Dream Institutions',
    icon: School,
    bg: 'bg-(--tint-pink)',
    border: 'border-(--pink)',
    iconColor: 'text-(--pink)',
    textColor: 'text-(--secondary)',
  },
];

export function LockedPreviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      {lockedItems.map(({ label, icon: Icon, bg, border, iconColor, textColor }) => (
        <div
          key={label}
          className={`${bg} p-8 rounded-4xl border-2 ${border} shadow-sm flex flex-col items-center justify-center text-center h-55 hover:-translate-y-1 transition-transform`}
        >
          <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm ${iconColor} mb-5`}>
            <Icon size={32} />
          </div>
          <p className="font-bold text-(--ink) text-lg mb-2" style={{ fontFamily: 'Lora, serif' }}>
            {label}
          </p>
          <p className={`text-xs font-bold ${textColor} uppercase tracking-wider bg-white/60 px-4 py-1.5 rounded-full`}>
            Take test to unlock
          </p>
        </div>
      ))}
    </div>
  );
}
