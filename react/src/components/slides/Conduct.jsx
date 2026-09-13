import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

const RULES = [
  {
    t: 'Driving is normal and legal',
    d: 'No manoeuvre is ever performed for the benefit of the sensors. A dedicated driver drives and does nothing else; a separate operator runs the recording and does not drive.',
  },
  {
    t: 'Nobody is followed or waited for',
    d: 'The vehicle does not follow, approach or wait on any individual, and does not stay at any location longer than traffic requires.',
  },
  {
    t: 'We stop when asked',
    d: 'The crew answer questions from the public, stop recording if anyone objects, and comply immediately with any instruction from a police officer.',
  },
  {
    t: 'Papers are carried in the vehicle',
    d: 'A departmental authorisation letter and a short plain-language explanation of the project are in the vehicle at all times, along with proof of insurance.',
  },
  {
    t: 'Sensitive places are avoided',
    d: 'Recording near schools, hospitals, places of worship and public gatherings is avoided. Anything caught inadvertently is deleted rather than published.',
  },
  {
    t: 'Sessions end early when conditions change',
    d: 'Recording is abandoned when rain begins, when a crowd gathers around the vehicle, or in any situation that would require driving other than normally.',
  },
]

export default function Conduct() {
  return (
    <div className="s-block">
      <div className="s-head">
        <Kicker d={0}>Conduct on the road</Kicker>
        <Reveal as="h2" d={1} className="h1 h1--wide">
          How the vehicle behaves in traffic
        </Reveal>
      </div>

      <div className="rules">
        {RULES.map((r, i) => (
          <Reveal key={r.t} d={2 + i} className="rule-card">
            <span className="rule-card__t">{r.t}</span>
            <p className="rule-card__d">{r.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
