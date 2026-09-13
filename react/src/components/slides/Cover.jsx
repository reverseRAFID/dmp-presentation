import Reveal from '../Reveal.jsx'
import vehicle from '../../assets/brand/research-vehicle.jpg'
import logo from '../../assets/brand/bracu-logo.png'

export default function Cover() {
  return (
    <div className="cover">
      <div className="cover__text">
        <Reveal d={0}>
          <img className="cover__logo" src={logo} alt="BRAC University" />
        </Reveal>

        <Reveal as="span" d={1} className="s-kicker label label--accent">
          Request to the Dhaka Metropolitan Police
        </Reveal>

        <Reveal as="h2" d={2} className="cover__title">
          Permission to record Dhaka roads
        </Reveal>

        <Reveal as="p" d={3} className="cover__sub">
          For a university research dataset. A marked vehicle, driven normally. No person is
          approached, and no number plate is ever read.
        </Reveal>

        <Reveal d={4} className="cover__people">
          <span>
            <b>Dr. Md. Khalilur Rhaman</b>
            <span className="label">Principal Investigator</span>
          </span>
          <span>
            <b>Department of Computer Science &amp; Engineering</b>
            <span className="label">BRAC University</span>
          </span>
        </Reveal>
      </div>

      <Reveal d={2} variant="scale" className="cover__media">
        <img
          src={vehicle}
          alt="The BRAC University pickup, marked with the university name, with its roof sensor frame being installed."
        />
        <span className="cover__tag">
          <b>The vehicle, marked and openly equipped</b>
          <span>Mitsubishi L200 · sensors visible on the roof frame</span>
        </span>
      </Reveal>
    </div>
  )
}
