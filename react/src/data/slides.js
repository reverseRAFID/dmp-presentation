/* ------------------------------------------------------------------
   Slide registry.

   Audience: the Dhaka Metropolitan Police. The deck asks permission to
   drive a marked university vehicle on public roads and record the
   street for a research dataset.

   Order: the request up front, then why the work exists, then exactly
   what happens on the road and what protects the public.

   Source for every claim: the IRB application (irb.md).
   ------------------------------------------------------------------ */

import Cover from '../components/slides/Cover.jsx'
import Request from '../components/slides/Request.jsx'
import Problem from '../components/slides/Problem.jsx'
import Solution from '../components/slides/Solution.jsx'
import Platform from '../components/slides/Platform.jsx'
import Recorded from '../components/slides/Recorded.jsx'
import Conduct from '../components/slides/Conduct.jsx'
import Privacy from '../components/slides/Privacy.jsx'
import Incidents from '../components/slides/Incidents.jsx'
import Scope from '../components/slides/Scope.jsx'
import Approvals from '../components/slides/Approvals.jsx'
import Ask from '../components/slides/Ask.jsx'
import References from '../components/slides/References.jsx'

export const slides = [
  {
    id: 'cover',
    section: 'Request to the Dhaka Metropolitan Police',
    title: 'Permission to record Dhaka roads for a university research dataset',
    bleed: true,
    Component: Cover,
  },
  {
    id: 'request',
    section: '01 — What we are asking',
    title: 'Permission to drive and record on public roads',
    Component: Request,
  },
  {
    id: 'problem',
    section: '02 — The problem',
    title: 'A ground robot must answer two questions continuously',
    Component: Problem,
  },
  {
    id: 'solution',
    section: '03 — The solution',
    title: 'Record the real road, then measure against it',
    Component: Solution,
  },
  {
    id: 'platform',
    section: '04 — The vehicle',
    title: 'One marked pickup, sensors facing outward',
    Component: Platform,
  },
  {
    id: 'recorded',
    section: '05 — Recording',
    title: 'What is recorded, and what never is',
    Component: Recorded,
  },
  {
    id: 'conduct',
    section: '06 — Conduct on the road',
    title: 'How the vehicle behaves in traffic',
    Component: Conduct,
  },
  {
    id: 'privacy',
    section: '07 — Privacy',
    title: 'Nothing identifiable is published',
    Component: Privacy,
  },
  {
    id: 'incidents',
    section: '08 — If something happens',
    title: 'Arranged responses, agreed in advance',
    Component: Incidents,
  },
  {
    id: 'scope',
    section: '09 — Where and when',
    title: 'Four road types, by day and at night',
    Component: Scope,
  },
  {
    id: 'approvals',
    section: '10 — Approvals',
    title: 'Approvals and legal basis',
    Component: Approvals,
  },
  {
    id: 'ask',
    section: '11 — Our request',
    title: 'What we ask of the Dhaka Metropolitan Police',
    Component: Ask,
  },
  {
    id: 'references',
    section: 'References',
    title: 'References',
    Component: References,
  },
]
