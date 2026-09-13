import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

const ASKS = [
  'Written permission to operate the marked research vehicle on public roads in Dhaka, day and night.',
  'A point of contact within DMP we can notify before each collection phase.',
  'Guidance on any road, area or time we should avoid.',
]

export default function Ask() {
  return (
    <div className="s-block">
      <div className="split split--wide-left">
        <div className="s-head">
          <Kicker d={0}>Our request</Kicker>
          <Reveal as="h2" d={1} className="h1">
            What we ask of the Dhaka Metropolitan Police
          </Reveal>
        </div>

        <Reveal as="p" d={2} className="pull">
          We record the road, not the people on it.
        </Reveal>
      </div>

      <ol className="asks">
        {ASKS.map((a, i) => (
          <Reveal as="li" key={a} d={3 + i} className="ask">
            <span className="ask__n">{i + 1}</span>
            <span className="ask__t">{a}</span>
          </Reveal>
        ))}
      </ol>

      <Reveal d={7} className="contact">
        <span className="label">Contact</span>
        <p className="contact__body">
          <b>Dr. Md. Khalilur Rhaman</b> — Professor, Department of Computer Science and
          Engineering, School of Data and Sciences, BRAC University.
          <br />
          Kha 224 Bir Uttam Rafiqul Islam Avenue, Merul Badda, Dhaka 1212 ·
          khalilur@bracu.ac.bd · +8801752042223
        </p>
      </Reveal>
    </div>
  )
}
