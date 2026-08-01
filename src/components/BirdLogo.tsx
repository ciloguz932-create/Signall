type BirdLogoProps = {
  className?: string;
};

export default function BirdLogo({ className }: BirdLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="30" className="fill-brand-mid" />
      <path
        d="M16 40c5-2 8-5 9-9 4 3 8 4 14 3 4-1 7-3 9-6 0 7-4 12-10 14-6 2-13 2-18-1 2 1 3 1 5 1-3 1-6 0-9-2Z"
        className="fill-white"
      />
      <path
        d="M48 22c-2-3-5-5-9-5-2 0-4 .5-6 1.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
