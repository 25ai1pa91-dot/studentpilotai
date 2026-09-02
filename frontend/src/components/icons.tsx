type IconProps = { size?: number; className?: string; weight?: 'regular' | 'bold' }

const base = (size: number, className: string) =>
  ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', className })

export function HouseIcon({ size = 20, className = '', weight = 'regular' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={weight === 'bold' ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

export function CalendarIcon({ size = 20, className = '', weight = 'regular' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={weight === 'bold' ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

export function ChartBarIcon({ size = 20, className = '', weight = 'regular' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={weight === 'bold' ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  )
}

export function TargetIcon({ size = 20, className = '', weight = 'regular' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={weight === 'bold' ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}

export function SparkleIcon({ size = 20, className = '', weight = 'regular' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={weight === 'bold' ? 2 : 1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export function UserIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" />
    </svg>
  )
}

export function FlameIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} fill="currentColor" stroke="none">
      <path d="M12 2c0 3.5-3 5-3 8a3 3 0 006 0c0-3-3-4.5-3-8zm-3 10c0-2 1.5-3.5 2-5.5C10 8.5 9 10 9 12a3 3 0 003 3 3 3 0 003-3c0-2-1-3.5-1-5.5.5 2 2 3.5 2 5.5a5 5 0 01-10 0z" />
    </svg>
  )
}

export function ClockIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

export function ArrowRightIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function CheckCircleIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  )
}

export function CircleIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

export function ChevronDownIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function ChevronRightIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function ChevronUpIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}

export function BookOpenIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4.5A1.5 1.5 0 013.5 3H12v18H3.5A1.5 1.5 0 012 19.5v-15z" />
      <path d="M22 4.5A1.5 1.5 0 0020.5 3H12v18h8.5a1.5 1.5 0 001.5-1.5v-15z" />
      <path d="M12 3v18" />
    </svg>
  )
}

export function CodeIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8L3 12l4 4M17 8l4 4-4 4M14 4l-4 16" />
    </svg>
  )
}

export function CopyIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

export function SendIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  )
}

export function LightningIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M13 2L4.5 13.5H11L11 22L19.5 10.5H13L13 2Z" />
    </svg>
  )
}

export function XIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export function SunIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

export function MoonIcon({ size = 18, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" fill="none">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export function TrendUpIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 7l-9.5 9.5-5-5L1 18" />
      <path d="M16 7h6v6" />
    </svg>
  )
}

export function InfoIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v.01M12 12v4" />
    </svg>
  )
}

export function MapPinIcon({ size = 16, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

export function RocketIcon({ size = 20, className = '' }: IconProps) {
  return (
    <svg {...base(size, className)} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}
