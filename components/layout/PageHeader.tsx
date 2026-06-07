import Link from 'next/link'
import { StarPattern } from '@/components/ui/StarPattern'
import { Icon } from '@/components/ui/icons'

interface PageHeaderProps {
  crumb: string
  title: string
  sub?: string
}

export function PageHeader({ crumb, title, sub }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="page-header-pattern">
        <StarPattern id="ph-pat" color="#1B6B8A" scale={56} />
      </div>
      <div className="container page-header-inner">
        <div className="crumb">
          <Link href="/">Home</Link>
          <Icon.ChevronRight width={12} height={12} />
          <span style={{ color: 'var(--ink-2)', fontWeight: 500 }}>{crumb}</span>
        </div>
        <h1 className="page-title">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
    </section>
  )
}
