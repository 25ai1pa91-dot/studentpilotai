import type { Page } from '../types'
import { HouseIcon, CalendarIcon, ChartBarIcon, TargetIcon, SparkleIcon } from './icons'

type NavProps = {
  page: Page
  onNavigate: (p: Page) => void
}

type Item = { id: Page; label: string; icon: (active: boolean) => React.ReactNode }

const items: Item[] = [
  { id: 'today',    label: 'Today',    icon: a => <HouseIcon size={20} weight={a ? 'bold' : 'regular'} /> },
  { id: 'plan',     label: 'Plan',     icon: a => <CalendarIcon size={20} weight={a ? 'bold' : 'regular'} /> },
  { id: 'progress', label: 'Progress', icon: a => <ChartBarIcon size={20} weight={a ? 'bold' : 'regular'} /> },
  { id: 'gap',      label: 'Gap',      icon: a => <TargetIcon size={20} weight={a ? 'bold' : 'regular'} /> },
  { id: 'mentor',   label: 'Mentor',   icon: a => <SparkleIcon size={20} weight={a ? 'bold' : 'regular'} /> },
]

/* ── Desktop sidebar ────────────────────────────────────── */
export function Sidebar({ page, onNavigate }: NavProps) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 h-dvh bg-surface border-r border-line sticky top-0">
      {/* Wordmark */}
      <div className="px-5 py-6 border-b border-line">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
            <SparkleIcon size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-ink">StudentPilot</span>
          <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-brand/15 text-brand-hi">AI</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {items.map(item => {
          const active = page === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm sp-btn text-left',
                active
                  ? 'bg-brand/12 text-brand-hi font-medium'
                  : 'text-dim hover:text-ink hover:bg-elevated font-normal',
              ].join(' ')}
            >
              {item.icon(active)}
              {item.label}
              {item.id === 'mentor' && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-growth" />
              )}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-line">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-brand-hi">AS</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink truncate">Arjun Sharma</p>
            <p className="text-xs text-ghost truncate">SDE Prep · Week 4</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

/* ── Mobile bottom tab bar ──────────────────────────────── */
export function BottomTabs({ page, onNavigate }: NavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-sm border-t border-line flex safe-area-inset-bottom">
      {items.map(item => {
        const active = page === item.id
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={[
              'flex-1 flex flex-col items-center gap-1 py-3 min-h-[56px] sp-btn relative',
              active ? 'text-brand-hi' : 'text-ghost',
            ].join(' ')}
          >
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full bg-brand" />
            )}
            {item.icon(active)}
            <span className={['text-[10px] leading-none', active ? 'font-medium' : 'font-normal'].join(' ')}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
