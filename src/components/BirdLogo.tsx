import { useId } from "react";

type BirdLogoProps = {
  className?: string;
  animated?: boolean;
};

export default function BirdLogo({ className, animated = true }: BirdLogoProps) {
  const gradId = useId();

  return (
    <div className={`relative inline-block ${className ?? ""}`}>
      {animated && (
        <div className="animate-halo absolute inset-0 rounded-full bg-brand-light/25" />
      )}
      {animated && (
        <div className="animate-spin-slow absolute inset-0">
          <svg viewBox="0 0 150 150" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`${gradId}-ring`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7fb89a" />
                <stop offset="100%" stopColor="#2e8b5f" />
              </linearGradient>
            </defs>
            <circle
              cx="75"
              cy="75"
              r="72"
              fill="none"
              stroke={`url(#${gradId}-ring)`}
              strokeOpacity="0.55"
              strokeWidth="1"
              strokeDasharray="1.8 4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
      <div className="relative h-full w-full overflow-hidden rounded-full shadow-inner ring-1 ring-white/20">
        <img
          src="/menar-bird.svg"
          alt="Menar logo"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover ${animated ? "animate-bird-glide" : ""}`}
        />
      </div>
    </div>
  );
}
