import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

const STEPS = [
  {
    n: '01',
    t: 'Record',
    d: 'Drive ordinary routes in ordinary traffic while outward-facing sensors record the road.',
  },
  {
    n: '02',
    t: 'Anonymise',
    d: 'Every face and every number plate is automatically blurred. Speech is removed from the sound.',
  },
  {
    n: '03',
    t: 'Develop',
    d: 'Use the recordings to teach a machine to find its own position and judge where it can drive.',
  },
  {
    n: '04',
    t: 'Publish',
    d: 'Release the anonymised result for non-commercial research use, so other universities can build on it.',
  },
]

export default function Solution() {
  return (
    <div className="s-block">
      <div className="split split--wide-left">
        <div className="s-head">
          <Kicker d={0}>The solution</Kicker>
          <Reveal as="h2" d={1} className="h1">
            Record the real road, then measure against it
          </Reveal>
        </div>
        <Reveal as="p" d={2} className="lead">
          No dataset of this kind exists for Dhaka. The vehicle stands in for the robot: it
          carries the same sensors, and is driven normally through the traffic a robot
          would one day have to handle.
        </Reveal>
      </div>

      <ol className="steps">
        {STEPS.map((s, i) => (
          <Reveal as="li" key={s.n} d={3 + i} className="step">
            <span className="step__n">{s.n}</span>
            <span className="step__t">{s.t}</span>
            <span className="step__d">{s.d}</span>
          </Reveal>
        ))}
      </ol>

      <Reveal d={8} className="note">
        <span className="note__title">Why Dhaka</span>
        <p className="small">
          Dhaka provides in ordinary conditions what other cities can only create
          artificially: satellite reception that genuinely degrades between buildings and
          under flyovers, irregular road surfaces, and traffic that negotiates right of way
          rather than following lanes. A method that works here has been tested against a
          harder case than an orderly city can offer.
        </p>
      </Reveal>
    </div>
  )
}
