import Reveal from '../Reveal.jsx'
import { Figure, Kicker } from './parts.jsx'
import badodd from '../../assets/papers/badodd.png'
import iddVehicle from '../../assets/papers/idd3d-vehicle.png'
import iddScene from '../../assets/papers/idd3d-scene.png'

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
          Four countries have built public road datasets; only India has gone past the
          camera — with a rig much like ours. What nobody has built is the Bangladeshi
          one.
        </Reveal>
      </div>

      <div className="figrow">
        <Figure
          src={badodd}
          alt="Sample frames from the BadODD dataset across Sylhet, Dhaka, Rajshahi, Mymensingh, Maowa Expressway and Dhaka at night, each with 2D boxes drawn around vehicles."
          caption="Bangladesh — BadODD: nine districts, day and night, 2D boxes on smartphone photographs."
          credit="Baig, Hajong, Patwary, Rahman, Chowdhury (2024), arXiv:2401.10659 · CC BY 4.0"
          short
          d={3}
        />
        <Figure
          src={iddVehicle}
          alt="The IDD-3D collection car: a small white sedan with a laser scanner and six cameras mounted on a roof frame."
          caption="India — the IDD-3D collection car: six cameras and a roof LiDAR. The same configuration we propose, on a smaller vehicle."
          credit="Dokania et al., WACV 2023, arXiv:2210.12878 · CC BY 4.0"
          short
          d={4}
        />
        <Figure
          src={iddScene}
          alt="An IDD-3D scene: a bird's-eye LiDAR point cloud with colour-coded 3D boxes and tracking numbers on each road user, with three camera views inset showing auto-rickshaws and motorcycles."
          caption="What that rig produces: every road user boxed in three dimensions and tracked, with the camera views alongside."
          credit="Dokania et al., WACV 2023, arXiv:2210.12878 · CC BY 4.0"
          short
          d={5}
        />
      </div>

      <div className="region">
        {REGION.map((r, i) => (
          <Reveal
            key={r.place}
            d={6 + i}
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
