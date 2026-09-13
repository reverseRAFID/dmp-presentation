import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

/* The research problem, in plain words, on one slide. */
const QUESTIONS = [
  {
    n: '01',
    q: 'Where am I?',
    lead: 'A robot finds its position from satellite signals — which fail in exactly the places it has to work.',
    points: [
      'Between tall buildings, under flyovers, in narrow lanes, near large metal structures.',
      'Signals bounce off surfaces before arriving, so the position comes out confident and wrong.',
    ],
    kicker: 'A machine that trusts it will drive into a wall.',
  },
  {
    n: '02',
    q: 'Where can I go next?',
    lead: 'A route that looks clear on a map is often not one a machine can physically cross.',
    points: [
      'A broken slab, an open drain, a spoil heap from repair work, a kerb too high to climb.',
      'The ground has to be read as shape and surface — along with everything moving across it.',
    ],
    kicker: 'Neither question can be answered from a computer simulation.',
  },
]

export default function Problem() {
  return (
    <div className="s-block">
      <div className="s-head">
        <Kicker d={0}>The problem</Kicker>
        <Reveal as="h2" d={1} className="h1 h1--wide">
A ground robot must answer two questions, continuously
        </Reveal>
      </div>

      <div className="duo">
        {QUESTIONS.map((item, i) => (
          <Reveal key={item.q} d={2 + i} className="duo__col">
            <span className="duo__n">{item.n}</span>
            <h3 className="duo__q">{item.q}</h3>
            <p className="duo__lead">{item.lead}</p>
            <ul className="duo__list">
              {item.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="duo__kicker">{item.kicker}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
