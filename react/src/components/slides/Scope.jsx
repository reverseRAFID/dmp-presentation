import Reveal from '../Reveal.jsx'
import { Fact, Kicker } from './parts.jsx'
import DhakaMap from '../viz/DhakaMap.jsx'

const ROADS = [
  'Dense commercial streets',
  'Arterial roads',
  'Older narrow-street areas',
  'Residential streets',
]

export default function Scope() {
  return (
    <div className="s-block">
      <div className="split split--even">
        <div className="stack">
          <div className="s-head">
            <Kicker d={0}>Where and when</Kicker>
            <Reveal as="h2" d={1} className="h2">
              Four road types, by day and at night
            </Reveal>
            <Reveal as="p" d={2} className="lead">
              Routes are chosen by road type, never by anything about the people using them.
              Specific corridors to be agreed with DMP.
            </Reveal>
          </div>

          <Reveal d={3} className="vocab">
            {ROADS.map((r) => (
              <span className="chip chip--new" key={r}>
                {r}
              </span>
            ))}
          </Reveal>

          <div className="s-facts facts-2">
            <Fact value="15 hrs" label="Minimum in the first phase, after two short pilot sessions." d={5} />
            <Fact value="200 hrs" label="Target for extended collection, as storage allows." d={6} />
          </div>
        </div>

        <DhakaMap delay={4} />
      </div>
    </div>
  )
}
