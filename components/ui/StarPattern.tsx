interface StarPatternProps {
  id: string
  color?: string
  scale?: number
}

export function StarPattern({ id, color = '#1B6B8A', scale = 56 }: StarPatternProps) {
  const s = scale
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width={s} height={s} patternUnits="userSpaceOnUse">
          <path
            d={`M${s / 2} 4 L${s / 2 + 4} ${s / 2 - 4} L${s / 2} ${s - 4} L${s / 2 - 4} ${s / 2 - 4} Z`}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            opacity="0.35"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export function DotPattern({ id, color = '#1B6B8A', scale = 24 }: StarPatternProps) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} x="0" y="0" width={scale} height={scale} patternUnits="userSpaceOnUse">
          <circle cx={scale / 2} cy={scale / 2} r="1" fill={color} opacity="0.25" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

interface LogoProps {
  size?: number
  color?: string
}

export function Logo({ size = 32, color = '#B8962E' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2" />
      <path d="M20 8 L24 16 L32 17 L26 23 L28 31 L20 27 L12 31 L14 23 L8 17 L16 16 Z" fill={color} />
    </svg>
  )
}
