interface Props {
  style?: React.CSSProperties
  className?: string
  iconSize?: number
}

export function ImagePlaceholder({ style, className, iconSize = 44 }: Props) {
  return (
    <div
      className={className}
      style={{
        background: 'linear-gradient(150deg, #0E3D52 0%, #1B6B8A 60%, #3F8BA5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 56 56" fill="none">
        <rect x="4" y="10" width="48" height="36" rx="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"/>
        <circle cx="18" cy="24" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"/>
        <path d="M4 40 L18 26 L30 36 L40 26 L52 40" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    </div>
  )
}
