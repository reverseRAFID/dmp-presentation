import Deck from './components/Deck.jsx'
import { slides } from './data/slides.js'

export default function App() {
  return <Deck slides={slides} />
}
