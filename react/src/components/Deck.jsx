import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { slideMotion } from '../motion.js'
import logo from '../assets/brand/bracu-logo.png'

const PREV_KEYS = new Set(['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'p', 'k'])
const NEXT_KEYS = new Set(['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'n', 'j'])
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown'])
const SCROLL_STEP = 120
const SWIPE_MIN = 56

/* Fullscreen, with the older WebKit spelling for Safari. The request must
   come from a user gesture — a keypress qualifies. */
function toggleFullscreen() {
  const doc = document
  const el = doc.documentElement
  const isFull = doc.fullscreenElement || doc.webkitFullscreenElement
  const fn = isFull
    ? doc.exitFullscreen || doc.webkitExitFullscreen
    : el.requestFullscreen || el.webkitRequestFullscreen
  if (!fn) return
  const result = fn.call(isFull ? doc : el)
  if (result && typeof result.catch === 'function') result.catch(() => {})
}

function hashIndex(count) {
  const n = Number.parseInt(window.location.hash.replace(/\D/g, ''), 10)
  return Number.isFinite(n) && n >= 1 && n <= count ? n - 1 : 0
}

export default function Deck({ slides }) {
  const count = slides.length
  const [index, setIndex] = useState(() => hashIndex(count))
  const stageRef = useRef(null)
  const touch = useRef(null)
  const reduced = useReducedMotion()

  const go = useCallback(
    (next) => {
      setIndex((current) => {
        const clamped = Math.max(0, Math.min(count - 1, next))
        return clamped === current ? current : clamped
      })
    },
    [count],
  )

  useEffect(() => {
    function onKey(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const tag = event.target?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      /* Let a slide taller than the window scroll before it advances. */
      const slide = stageRef.current?.querySelector('.slide')
      if (slide && SCROLL_KEYS.has(event.key)) {
        const room = slide.scrollHeight - slide.clientHeight
        const down = event.key === 'ArrowDown'
        if (down ? slide.scrollTop < room - 1 : slide.scrollTop > 1) {
          event.preventDefault()
          slide.scrollBy({ top: down ? SCROLL_STEP : -SCROLL_STEP, behavior: 'smooth' })
          return
        }
      }

      if (NEXT_KEYS.has(event.key)) {
        event.preventDefault()
        go(index + 1)
      } else if (PREV_KEYS.has(event.key)) {
        event.preventDefault()
        go(index - 1)
      } else if (event.key === 'Home') {
        event.preventDefault()
        go(0)
      } else if (event.key === 'End') {
        event.preventDefault()
        go(count - 1)
      } else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault()
        toggleFullscreen()
      } else if (/^[0-9]$/.test(event.key)) {
        event.preventDefault()
        const n = event.key === '0' ? 10 : Number(event.key)
        go(n - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, count, go])

  useEffect(() => {
    const next = `#${index + 1}`
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next)
    }
  }, [index])

  useEffect(() => {
    const onHash = () => setIndex(hashIndex(count))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [count])

  function onTouchStart(event) {
    const t = event.changedTouches[0]
    touch.current = { x: t.clientX, y: t.clientY }
  }

  function onTouchEnd(event) {
    if (!touch.current) return
    const t = event.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy) * 1.4) return
    go(dx < 0 ? index + 1 : index - 1)
  }

  const slide = slides[index]
  const Slide = slide.Component
  const motionProps = reduced
    ? { initial: false, animate: { opacity: 1 } }
    : slideMotion

  return (
    <main className="deck">
      <h1 className="sr-only">
        A multi-sensor road dataset for Dhaka — BRAC University
      </h1>

      <div className="progress" role="presentation">
        <motion.div
          className="progress__fill"
          animate={{ scaleX: (index + 1) / count }}
          initial={false}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <header className="chrome chrome--top">
        <img className="chrome__logo" src={logo} alt="BRAC University" />
        <span className="chrome__sep" role="presentation" />
        <span className="label chrome__section">{slide.section}</span>
        <span className="chrome__spacer" />
        {index === 0 && (
          <span className="hint label" aria-hidden="true">
            <kbd>←</kbd>
            <kbd>→</kbd>
            <span className="hint__sep">·</span>
            <kbd>F</kbd>
            fullscreen
          </span>
        )}
      </header>

      <div
        className="stage"
        ref={stageRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={slide.id}
            className={`slide${slide.bleed ? ' slide--bleed' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${count}: ${slide.title}`}
            tabIndex={-1}
            {...motionProps}
          >
            <div className="slide__inner">
              <Slide />
            </div>
          </motion.section>
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}. {slide.title}.
      </p>

      <footer className="chrome chrome--bottom">
        <span className="chrome__count">
          <b>{String(index + 1).padStart(2, '0')}</b>
          <span aria-hidden="true"> / {String(count).padStart(2, '0')}</span>
        </span>

        <span className="chrome__spacer" />

        <nav className="ticks" aria-label="Slides">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="tick"
              aria-current={i === index}
              aria-label={`${i + 1}. ${s.title}`}
              onClick={() => go(i)}
            />
          ))}
        </nav>

        <span className="chrome__spacer" />

        <div className="nav">
          <button
            type="button"
            className="nav__btn"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label="Previous slide"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            className="nav__btn"
            onClick={() => go(index + 1)}
            disabled={index === count - 1}
            aria-label="Next slide"
          >
            <Chevron dir="right" />
          </button>
        </div>
      </footer>
    </main>
  )
}

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M10 3.5 5.5 8l4.5 4.5' : 'M6 3.5 10.5 8 6 12.5'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
