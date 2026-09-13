import { motion, useReducedMotion } from 'framer-motion'
import { revealMotion, scaleInMotion } from '../motion.js'

/* A single entrance for every element in the deck.
   `d` is the element's place in the stagger, not a delay in ms. */
export default function Reveal({
  as = 'div',
  d = 0,
  variant = 'rise',
  className,
  children,
  ...rest
}) {
  const reduced = useReducedMotion()
  const Tag = motion[as] ?? motion.div

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  const props = variant === 'scale' ? scaleInMotion(d) : revealMotion(d)

  return (
    <Tag className={className} {...props} {...rest}>
      {children}
    </Tag>
  )
}
