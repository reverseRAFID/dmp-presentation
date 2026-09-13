import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

const CASES = [
  {
    q: 'If a collision or injury is recorded',
    a: 'The crew stop recording and help — call emergency services and assist as any road user would. The session is logged as ended and that footage is excluded from the public release.',
  },
  {
    q: 'If a traffic offence is caught on camera',
    a: 'The project does not review footage for offences, does not report it to any authority, and does not use it to identify anyone. No number plate is ever read, so no vehicle in this footage can be traced to an owner through our dataset.',
  },
  {
    q: 'If a lawful order is made',
    a: 'The project would comply with an order from a court or competent authority. This limit is written into the consent form our own crew sign, so nothing is promised that could not be honoured.',
  },
  {
    q: 'If anyone objects to being recorded',
    a: 'The crew stop. A session ended by request is logged as such. Any complaint, incident or lost storage device is reported to the Principal Investigator within one working day.',
  },
]

export default function Incidents() {
  return (
    <div className="s-block">
      <div className="s-head">
        <Kicker d={0}>If something happens</Kicker>
        <Reveal as="h2" d={1} className="h1 h1--wide">
          Arranged responses, agreed in advance
        </Reveal>
      </div>

      <div className="qa">
        {CASES.map((c, i) => (
          <Reveal key={c.q} d={2 + i} className="qa__item">
            <span className="qa__q">{c.q}</span>
            <p className="qa__a">{c.a}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
