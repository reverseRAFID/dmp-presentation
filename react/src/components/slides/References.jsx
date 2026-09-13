import Reveal from '../Reveal.jsx'
import { Kicker } from './parts.jsx'

/* Taken from the reference list of the IRB application itself. */
const GROUPS = [
  {
    title: 'Law and practice',
    items: [
      {
        t: 'Personal Data Protection Ordinance, 2025',
        a: 'Government of Bangladesh',
        v: 'Ordinance No. 61 of 2025, gazetted 6 November 2025',
      },
      {
        t: 'Cyber Security Ordinance, 2025',
        a: 'Government of Bangladesh',
        v: 'Ordinance No. 25 of 2025, gazetted 21 May 2025',
      },
      {
        t: 'Datasheets for datasets',
        a: 'Gebru et al.',
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
        a: 'Cordts et al.',
        v: 'CVPR 2016, 3213–3223',
      },
      {
        t: 'nuScenes: A multimodal dataset for autonomous driving',
        a: 'Caesar et al.',
        v: 'CVPR 2020, 11621–11631',
      },
      {
        t: 'Scalability in perception for autonomous driving: Waymo Open Dataset',
        a: 'Sun et al.',
        v: 'CVPR 2020, 2446–2454',
      },
      {
        t: 'BDD100K: A diverse driving dataset for heterogeneous multitask learning',
        a: 'Yu et al.',
        v: 'CVPR 2020, 2636–2645',
      },
    ],
  },
  {
    title: 'India',
    items: [
      {
        t: 'IDD: A dataset for exploring problems of autonomous navigation in unconstrained environments',
        a: 'Varma et al.',
        v: 'WACV 2019, 1743–1751',
      },
      {
        t: 'IDD-3D: Indian Driving Dataset for 3D unstructured road scenes',
        a: 'Dokania et al.',
        v: 'WACV 2023, arXiv:2210.12878',
      },
      {
        t: 'DriveIndia: An object detection dataset for diverse Indian traffic scenes',
        a: 'Kumar, Reddy, Rajalakshmi',
        v: '2025, arXiv:2507.19912',
      },
    ],
  },
  {
    title: 'Pakistan and Sri Lanka',
    items: [
      {
        t: 'CARL-D: A vision benchmark suite and large scale dataset for vehicle detection and scene segmentation',
        a: 'Butt et al., Control, Automotive & Robotics Lab, MUST',
        v: 'Signal Processing: Image Communication',
      },
      {
        t: 'R2S100K: Road-region segmentation dataset for semi-supervised autonomous driving in the wild',
        a: 'Butt et al.',
        v: '2023, arXiv:2308.06393',
      },
      {
        t: 'Towards real-time traffic sign and traffic light detection on embedded systems',
        a: 'Jayasinghe et al.',
        v: 'CeyRo dataset, Sri Lanka. IEEE Intelligent Vehicles Symposium 2022',
      },
    ],
  },
  {
    title: 'Bangladesh',
    items: [
      {
        t: 'BadODD: Bangladeshi autonomous driving object detection dataset',
        a: 'Baig et al.',
        v: '2024, arXiv:2401.10659',
      },
      {
        t: 'Bangladeshi native vehicle detection in the wild (BNVD)',
        v: '2024, arXiv:2405.12150',
      },
      {
        t: 'Poribohon-BD: Bangladeshi local vehicle image dataset with annotation for classification',
        a: 'Tabassum et al.',
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
        <b>Figure credits:</b> BadODD and IDD-3D figures reproduced under CC BY 4.0 with
        attribution. <b>Full detail:</b> the complete data collection plan, storage tiers,
        labelling procedure, consent forms and release arrangements are set out in the IRB
        application submitted to BRAC University.
      </Reveal>
    </div>
  )
}
