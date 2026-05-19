type BrandPictoProps = {
  className?: string;
  size?: number;
};

export default function BrandPicto({ className, size = 36 }: BrandPictoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mdmPictoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4b39ef" />
          <stop offset="100%" stopColor="#39d2c0" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill="#0F172A" />
      <path
        fill="url(#mdmPictoGrad)"
        d="M 96 96 L 176 96 L 232 232 L 196 232 L 256 360 L 316 232 L 280 232 L 336 96 L 416 96 L 416 416 L 356 416 L 356 232 L 296 360 L 216 360 L 156 232 L 156 416 L 96 416 Z"
      />
    </svg>
  );
}
