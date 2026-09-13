import Reveal from '../Reveal.jsx'
import map from '../../data/dhakaMap.json'

/* The Dhaka road network, drawn from OpenStreetMap data.
   Geometry was fetched from the Overpass API, projected to Web Mercator
   and simplified offline — the slide makes no network request. */
const LAYERS = [
  { key: 'secondary', cls: 'map__road map__road--minor' },
  { key: 'primary', cls: 'map__road map__road--major' },
  { key: 'trunk', cls: 'map__road map__road--trunk' },
  { key: 'motorway', cls: 'map__road map__road--motorway' },
]

export default function DhakaMap({ delay = 0 }) {
  const [ux, uy] = map.university
  const [px, py] = map.universityPct

  return (
    <Reveal as="figure" d={delay} variant="scale" className="viz viz--map">
      <div className="map__frame">
        <svg
          className="map"
          viewBox={map.viewBox}
          role="img"
          aria-label="Map of central Dhaka showing the road network and the rivers, with BRAC University marked."
        >
          <g className="map__rivers">
            {map.rivers.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>

          {LAYERS.map((layer) => (
            <g className={layer.cls} key={layer.key}>
              {map.roads[layer.key].map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
          ))}

          <g className="map__pin">
            <circle cx={ux} cy={uy} r="26" className="map__pin-halo" />
            <circle cx={ux} cy={uy} r="9" className="map__pin-dot" />
          </g>
        </svg>

        <span
          className={`map__pin-label${px > 55 ? ' is-left' : ''}`}
          style={{ left: `${px}%`, top: `${py}%` }}
        >
          BRAC University — base station
        </span>
      </div>

      <figcaption className="map__legend">
        <span className="map__key">
          <i className="map__swatch map__swatch--motorway" /> Motorway &amp; trunk
        </span>
        <span className="map__key">
          <i className="map__swatch map__swatch--major" /> Primary
        </span>
        <span className="map__key">
          <i className="map__swatch map__swatch--minor" /> Secondary
        </span>
        <span className="map__credit">Map data © OpenStreetMap contributors (ODbL)</span>
      </figcaption>
    </Reveal>
  )
}
