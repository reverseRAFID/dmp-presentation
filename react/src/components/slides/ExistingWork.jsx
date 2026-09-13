import Reveal from '../Reveal.jsx'
import { Figure, Kicker } from './parts.jsx'
import badodd from '../../assets/papers/badodd.png'
import idd3d from '../../assets/papers/idd3d.png'

/* What the region has already built, and the modality each stops at. */
const REGION = [
  {
    place: 'India',
    sets: 'IDD · IDD-3D · DriveIndia',
    reach: 'LiDAR and camera, 3D boxes',
  },
  {
    place: 'Pakistan',
    sets: 'CARL-D · R2S100K · PDrive20K',
    reach: 'Stereo camera, road-region masks',
  },
  {
    place: 'Bangladesh',
    sets: 'BadODD · BNVD · BRSSD10K · Poribohon-BD',
    reach: 'Single camera, 2D boxes and masks',
    here: true,
  },
  {
    place: 'Sri Lanka',
    sets: 'CeyRo',
    reach: 'Traffic signs and lights only',
  },
]

export default function ExistingWork() {
  return (
    <div className="s-block">
      <div className="split split--wide-left">
        <div className="s-head">
          <Kicker d={0}>Existing work</Kicker>
          <Reveal as="h2" d={1} className="h2">
            Camera datasets exist across South Asia. Navigation datasets do not.
          </Reveal>
        </div>
        <Reveal as="p" d={2} className="lead">
          Four countries have built road datasets. Only India has gone past the camera —
          and none of them records the vehicle&rsquo;s own corrected path.
        </Reveal>
      </div>

      <div className="split split--even">
        <Figure
          src={badodd}
          alt="Sample frames from the BadODD dataset across Sylhet, Dhaka, Rajshahi, Mymensingh, Maowa Expressway and Dhaka at night, each with 2D boxes drawn around vehicles."
          caption="Bangladesh — BadODD: nine districts, day and night, 2D boxes on smartphone photographs."
          credit="Baig, Hajong, Patwary, Rahman, Chowdhury (2024), arXiv:2401.10659 · CC BY 4.0"
          short
          d={3}
        />
        <Figure
          src={idd3d}
          alt="IDD-3D figure: LiDAR point clouds with 3D boxes, a camera view of unstructured Indian traffic, and LiDAR points projected onto the camera image."
          caption="India — IDD-3D: laser point clouds, 3D boxes and a synchronised camera."
          credit="Dokania, Hafez, Subramanian, Chandraker, Jawahar, WACV 2023, arXiv:2210.12878 · CC BY 4.0"
          short
          d={4}
        />
      </div>

      <div className="region">
        {REGION.map((r, i) => (
          <Reveal
            key={r.place}
            d={5 + i}
            className={`region__col${r.here ? ' is-here' : ''}`}
          >
            <span className="region__place">{r.place}</span>
            <span className="region__sets">{r.sets}</span>
            <span className="region__reach">{r.reach}</span>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
