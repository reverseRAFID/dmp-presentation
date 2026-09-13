import Reveal from '../Reveal.jsx'
import { BeforeAfter, Kicker } from './parts.jsx'
import anonBefore from '../../assets/brand/anon-before.jpg'
import anonAfter from '../../assets/brand/anon-after.jpg'

const PIPE = [
  {
    n: '01',
    t: 'Automatic blurring',
    d: 'Faces and number plates, across the whole release — not a sample.',
  },
  {
    n: '02',
    t: 'Checked by a person',
    d: 'One miss sends the whole batch back for reprocessing.',
  },
  {
    n: '03',
    t: 'Speech removed',
    d: 'Speech is detected and deleted. Only traffic noise is published.',
  },
  {
    n: '04',
    t: 'Nothing leaves the university',
    d: 'No cloud service, no outside company.',
  },
]

export default function Privacy() {
  return (
    <div className="s-block">
      <div className="split split--even">
        <div className="stack">
          <div className="s-head">
            <Kicker d={0}>Privacy</Kicker>
            <Reveal as="h2" d={1} className="h2">
Nothing identifiable is published
            </Reveal>
          </div>

          <ol className="steps steps--stack">
            {PIPE.map((s, i) => (
              <Reveal as="li" key={s.n} d={2 + i} className="step">
                <span className="step__n">{s.n}</span>
                <span className="step__t">{s.t}</span>
                <span className="step__d">{s.d}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="stack">
          <BeforeAfter
            before={anonBefore}
            after={anonAfter}
            beforeLabel="As recorded"
            afterLabel="As released"
            caption="Every face is detected and blurred before anything leaves the university. Number plates are treated the same way."
            credit="Illustration produced from our own photograph, BRAC University"
            d={3}
          />

          <Reveal d={7} className="note">
            <span className="note__title">Anyone can ask for removal</span>
            <p className="small">
              A published contact point accepts removal requests from anyone, and honours
              them without asking for a justification.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
