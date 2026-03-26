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
    const wordColor = light ? '#FFFFFF' : '#1E293B';
    const ringColor = light ? 'rgba(255,255,255,0.3)' : 'rgba(91,170,220,0.25)';
    const northColor = '#5BAADC';   /* primary blue — always */
    const restColor = light ? 'rgba(255,255,255,0.5)' : 'rgba(30,41,59,0.25)';
    const dotColor = '#F472A8';   /* pink accent dot */

    return (
        <Link href="/" className="inline-flex items-center gap-2.5 group select-none">
            <svg
                width={mark} height={mark}
                viewBox="0 0 32 32" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-500 group-hover:rotate-45"
            >
                <circle cx="16" cy="16" r="14.5" stroke={ringColor} strokeWidth="1.5" />
                {/* North — blue */}
                <path d="M16 3 L18.5 16 L16 14 L13.5 16 Z" fill={northColor} />
                {/* South */}
                <path d="M16 29 L13.5 16 L16 18 L18.5 16 Z" fill={restColor} />
                {/* East */}
                <path d="M29 16 L16 13.5 L18 16 L16 18.5 Z" fill={restColor} />
                {/* West */}
                <path d="M3 16 L16 18.5 L14 16 L16 13.5 Z" fill={restColor} />
                {/* Center dot — pink */}
                <circle cx="16" cy="16" r="2" fill={dotColor} />
            </svg>

            <span style={{ fontFamily: 'Lora, serif', fontSize: text, fontWeight: 700, letterSpacing: '-0.02em', color: wordColor, lineHeight: 1 }}>
                TriQi
            </span>
        </Link>
    );
}