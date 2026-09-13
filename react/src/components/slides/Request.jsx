import Reveal from '../Reveal.jsx'
import { Fact, Kicker } from './parts.jsx'

export default function Request() {
  return (
    <div className="s-block">
      <div className="split split--wide-left">
        <div className="s-head">
          <Kicker d={0}>What we are asking</Kicker>
          <Reveal as="h2" d={1} className="h1">
            Permission to drive and record on public roads
          </Reveal>
        </div>
        <Reveal as="p" d={2} className="lead">
          One university vehicle. Two crew. Normal, legal driving. Cameras and sensors
          facing outward at the road.
        </Reveal>
      </div>

      <div className="s-facts facts-4">
        <Fact value="1" unit="vehicle" label="Marked with the BRAC University name, equipment mounted openly." d={3} />
        <Fact value="2" unit="crew" label="A dedicated driver and a separate recording operator." d={4} />
        <Fact value="15→200" unit="hours" label="At least 15 hours in the first phase, then extended collection." d={5} />
        <Fact value="4" unit="road types" label="Commercial, arterial, older narrow-street and residential." accent d={6} />
      </div>

      <Reveal d={7} className="note">
        <span className="note__title">What we are not asking for</span>
        <p className="small">
          No road closure, no escort, no traffic management, no access to any restricted
          area, and no data from the police. We ask only to be permitted to drive in
          ordinary traffic with recording equipment visible on the vehicle.
        </p>
      </Reveal>
    </div>
  )
}
