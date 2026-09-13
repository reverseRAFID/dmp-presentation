import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

/* Taken from the reference list of the IRB application itself. */
const GROUPS = [
  {
    title: 'Legal instruments',
    items: [
      {
        t: 'Personal Data Protection Ordinance, 2025',
        a: 'Government of Bangladesh',
        v: 'Ordinance No. 61 of 2025, gazetted 6 November 2025',
      },
      {
        t: 'Cyber Security Ordinance, 2025',
        a: 'Government of Bangladesh',
        v: 'Ordinance No. 25 of 2025, gazetted 21 May 2025, repealing the Cyber Security Act, 2023',
      },
    ],
  },
  {
    title: 'Practice',
    items: [
      {
        t: 'Datasheets for datasets',
        a: 'Gebru, Morgenstern, Vecchione, Vaughan, Wallach, Daumé III, Crawford',
        v: 'Communications of the ACM, 64(12), 86–92 (2021)',
      },
    ],
  },
  {
    title: 'Datasets recorded elsewhere',
    items: [
      {
        t: 'Are we ready for autonomous driving? The KITTI vision benchmark suite',
        a: 'Geiger, Lenz, Urtasun',
        v: 'CVPR 2012, 3354–3361',
      },
      {
        t: 'The Cityscapes dataset for semantic urban scene understanding',
        a: 'Cordts, Omran, Ramos, Rehfeld, Enzweiler, Benenson, Franke, Roth, Schiele',
        v: 'CVPR 2016, 3213–3223',
      },
      {
        t: 'nuScenes: A multimodal dataset for autonomous driving',
        a: 'Caesar, Bankiti, Lang, Vora, Liong, Xu, Krishnan, Pan, Baldan, Beijbom',
        v: 'CVPR 2020, 11621–11631',
      },
      {
        t: 'Scalability in perception for autonomous driving: Waymo Open Dataset',
        a: 'Sun, Kretzschmar, Dotiwalla, Chouard, Patnaik and others',
        v: 'CVPR 2020, 2446–2454',
      },
      {
        t: 'BDD100K: A diverse driving dataset for heterogeneous multitask learning',
        a: 'Yu, Chen, Wang, Xian, Chen, Liu, Madhavan, Darrell',
        v: 'CVPR 2020, 2636–2645',
      },
    ],
  },
  {
    title: 'South Asia',
    items: [
      {
        t: 'IDD: A dataset for exploring problems of autonomous navigation in unconstrained environments',
        a: 'Varma, Subramanian, Namboodiri, Chandraker, Jawahar',
        v: 'WACV 2019, 1743–1751',
      },
      {
        t: 'Poribohon-BD: Bangladeshi local vehicle image dataset with annotation for classification',
        a: 'Tabassum, Ullah, Al-nur, Shatabda',
        v: 'Data in Brief, 33, 106465 (2020)',
      },
    ],
  },
]

const NUMBERED = (() => {
  let n = 0
  return GROUPS.map((g) => ({
    ...g,
    items: g.items.map((item) => ({ ...item, n: (n += 1) })),
  }))
})()

export default function References() {
  return (
    <div className="s-block">
      <div className="s-head">
        <Kicker d={0}>References</Kicker>
      </div>

      <div className="refs">
        {NUMBERED.map((group, gi) => (
          <Reveal key={group.title} d={1 + gi} className="refgroup">
            <span className="refgroup__title">{group.title}</span>
            {group.items.map((item) => (
              <p className="ref" key={item.t}>
                <span className="ref__n">[{item.n}]</span>
                <span>
                  <em>{item.t}.</em> {item.a}. {item.v}.
                </span>
              </p>
            ))}
          </Reveal>
        ))}
      </div>

      <Reveal as="p" d={6} className="source">
        <b>Full detail:</b> the complete data collection plan, storage tiers, labelling
        procedure, consent forms and release arrangements are set out in the IRB
        application submitted to BRAC University.
      </Reveal>
    </div>
  )
}
