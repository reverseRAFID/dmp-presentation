import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

const YES = [
  'Video of the road ahead, behind and to the sides',
  'The shape of the road surface and of nearby objects',
  'The path of our own vehicle',
  'General traffic sound',
]

const NO = [
  'No number plate is read, written down or stored as text — at any stage',
  'No conversation. Speech is detected and removed from the sound',
  'No recording inside any other vehicle',
  'No camera zooms in and no microphone is pointed at any person',
  'No name, address or personal detail about anyone',
  'No attempt to identify anyone, or to link a recording to any other record',
]

export default function Recorded() {
  return (
    <div className="s-block">
      <div className="s-head">
        <Kicker d={0}>Recording</Kicker>
        <Reveal as="h2" d={1} className="h1 h1--wide">
          What is recorded — and what never is
        </Reveal>
      </div>

      <div className="ledger">
        <Reveal d={2} className="ledger__col ledger__col--yes">
          <span className="ledger__head">Recorded</span>
          <ul className="ledger__list">
            {YES.map((t) => (
              <li key={t}>
                <Mark kind="yes" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal d={3} className="ledger__col ledger__col--no">
          <span className="ledger__head">Never recorded</span>
          <ul className="ledger__list">
            {NO.map((t) => (
              <li key={t}>
                <Mark kind="no" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}

function Mark({ kind }) {
  return (
    <svg className={`mark mark--${kind}`} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" className="mark__ring" />
      {kind === 'yes' ? (
        <path d="M5.8 10.3l2.7 2.7 5.7-5.7" className="mark__glyph" />
      ) : (
        <path d="M6.8 6.8l6.4 6.4M13.2 6.8l-6.4 6.4" className="mark__glyph" />
      )}
    </svg>
  )
}
