import Reveal from '../Reveal.jsx'
import { Figure, Kicker } from './parts.jsx'
import vehicle from '../../assets/brand/research-vehicle.jpg'

const SENSORS = [
  ['Cameras, front and rear', 'ordinary colour video of the road ahead and behind'],
  ['Depth cameras, each side', 'measure the shape of the ground and how far away things are'],
  ['Laser scanner on the roof', 'measures the shape of the surroundings, like a radar'],
  ['Satellite antennas and motion unit', 'record the path of our own vehicle only'],
  ['Microphone', 'ambient traffic sound, so a vehicle out of sight can be heard'],
]

export default function Platform() {
  return (
    <div className="platform">
      <Figure
        src={vehicle}
        alt="The BRAC University Mitsubishi L200 with its roof-mounted sensor frame on a Dhaka street."
        caption="The equipment is mounted openly and is visible from outside. The vehicle carries the university name."
        credit="BRAC University, Department of Computer Science & Engineering"
        d={1}
      />

      <div className="stack">
        <div className="s-head">
          <Kicker d={0}>The vehicle</Kicker>
          <Reveal as="h2" d={1} className="h2">
            One marked pickup, sensors facing outward
          </Reveal>
        </div>

        <div className="sensors">
          {SENSORS.map(([name, what], i) => (
            <Reveal key={name} d={2 + i} className="sensor">
              <span className="sensor__t">
                <b>{name}</b> — {what}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" d={8} className="small">
          The equipment is low in profile and adds negligible weight. The vehicle remains
          road legal, handles normally, and is insured for this use.
        </Reveal>
      </div>
    </div>
  )
}
