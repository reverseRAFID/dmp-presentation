import Reveal from '../Reveal.jsx'

/* Small shared pieces every slide draws from. */

export function Kicker({ children, d = 0 }) {
  return (
    <Reveal as="span" d={d} className="s-kicker label label--accent">
      {children}
    </Reveal>
  )
}

export function Fact({ value, unit, label, accent = false, d = 0 }) {
  return (
    <Reveal d={d} className={`fact${accent ? ' fact--accent' : ''}`}>
      <span className="fact__value">
        {value}
        {unit && <em>{unit}</em>}
      </span>
      {label && <span className="fact__label">{label}</span>}
    </Reveal>
  )
}

export function Source({ children, d = 0 }) {
  return (
    <Reveal as="p" d={d} className="source">
      {children}
    </Reveal>
  )
}

/* A slide-leading statistic: number, rule, unit, then one short line. */
export function StatHero({ value, unit, children, d = 1 }) {
  return (
    <div className="stat-hero">
      <Reveal as="p" d={d} className="stat stat--hero">
        {value}
      </Reveal>
      <Reveal d={d + 1} className="stat-hero__meta">
        <span className="label stat-hero__unit">{unit}</span>
        {children && <p className="stat-hero__caption">{children}</p>}
      </Reveal>
    </div>
  )
}

/* A published figure, always shown with its source and licence. */
export function Figure({ src, alt, caption, credit, contain = false, d = 0 }) {
  return (
    <Reveal as="figure" d={d} variant="scale" className="figure">
      <div className={`figure__frame${contain ? ' is-contain' : ''}`}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
      {(caption || credit) && (
        <figcaption className="figure__cap">
          {caption && <span className="figure__what">{caption}</span>}
          {credit && <span className="figure__credit">{credit}</span>}
        </figcaption>
      )}
    </Reveal>
  )
}

/* Marks a slot for artwork the team still needs to supply.
   Unused right now — kept so a Figure can be swapped back to one. */
export function Placeholder({ label, hint, ratio = '16 / 9', d = 0 }) {
  return (
    <Reveal as="figure" d={d} className="figure">
      <div className="placeholder" style={{ aspectRatio: ratio }}>
        <svg className="placeholder__icon" viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle cx="8.5" cy="10" r="1.6" fill="currentColor" />
          <path
            d="M4 17l5-4.5 3.5 3L16 12l4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="placeholder__label">{label}</span>
        {hint && <span className="placeholder__hint">{hint}</span>}
      </div>
    </Reveal>
  )
}

/* Two frames of the same image, side by side, for a before/after. */
export function BeforeAfter({ before, after, beforeLabel, afterLabel, caption, credit, d = 0 }) {
  return (
    <Reveal as="figure" d={d} variant="scale" className="figure beforeafter">
      <div className="beforeafter__pair">
        {[
          { src: before, label: beforeLabel, alt: `${beforeLabel}: ${caption}` },
          { src: after, label: afterLabel, alt: `${afterLabel}: ${caption}`, on: true },
        ].map((panel) => (
          <div className="beforeafter__panel" key={panel.label}>
            <img src={panel.src} alt={panel.alt} loading="lazy" />
            <span className={`beforeafter__tag${panel.on ? ' is-on' : ''}`}>{panel.label}</span>
          </div>
        ))}
      </div>
      {(caption || credit) && (
        <figcaption className="figure__cap">
          {caption && <span className="figure__what">{caption}</span>}
          {credit && <span className="figure__credit">{credit}</span>}
        </figcaption>
      )}
    </Reveal>
  )
}
