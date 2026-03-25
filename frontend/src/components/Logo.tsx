
import Link from 'next/link';

interface LogoProps {
  light?: boolean; 
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { mark: 24, text: '18px' },
  md: { mark: 30, text: '22px' },
  lg: { mark: 36, text: '28px' },
};

export default function Logo({ light = false, size = 'md' }: LogoProps) {
  const { mark, text } = sizes[size];
  const color = light ? '#FBF5EC' : '#2C2416';
  const accent = light ? '#F0B860' : '#E8724A';

  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
      {/* Compass mark */}
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 group-hover:rotate-45"
      >
        {/* Outer ring */}
        <circle cx="16" cy="16" r="14.5" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
        {/* North pointer (filled = primary direction) */}
        <path d="M16 3 L18.5 16 L16 14 L13.5 16 Z" fill={accent} />
        {/* South pointer */}
        <path d="M16 29 L13.5 16 L16 18 L18.5 16 Z" fill={color} fillOpacity="0.35" />
        {/* East pointer */}
        <path d="M29 16 L16 13.5 L18 16 L16 18.5 Z" fill={color} fillOpacity="0.35" />
        {/* West pointer */}
        <path d="M3 16 L16 18.5 L14 16 L16 13.5 Z" fill={color} fillOpacity="0.35" />
        {/* Center dot */}
        <circle cx="16" cy="16" r="2" fill={accent} />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          fontFamily: 'Lora, serif',
          fontSize: text,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color,
          lineHeight: 1,
        }}
      >
        TriQi
      </span>
    </Link>
  );
}