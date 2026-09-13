import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

const ITEMS = [
  {
    t: 'University ethics approval',
    d: 'The study is under review by the Institutional Review Board of BRAC University. No recording takes place until that approval is in place.',
  },
  {
    t: 'Departmental authorisation',
    d: 'A written statement of support and vehicle authorisation letter from the Department of Computer Science and Engineering is carried in the vehicle.',
  },
  {
    t: 'Personal Data Protection Ordinance, 2025',
    d: 'The Ordinance exempts processing for research and statistics where the data subject is not identified as a result. This study is designed to sit inside that exemption, not to rely on it after the fact: no individual is identified at any stage.',
  },
  {
    t: 'No external sponsor',
    d: 'Funded from BRAC University internal resources. No company is involved in the design, collection or release, and the licence permits non-commercial research use only.',
  },
]

export default function Approvals() {
  return (
    <div className="s-block">
      <div className="s-head">
        <Kicker d={0}>Approvals and legal basis</Kicker>
        <Reveal as="h2" d={1} className="h1">
          What is already in place
        </Reveal>
      </div>

      <div className="rules rules--2">
        {ITEMS.map((r, i) => (
          <Reveal key={r.t} d={2 + i} className="rule-card">
            <span className="rule-card__t">{r.t}</span>
            <p className="rule-card__d">{r.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
