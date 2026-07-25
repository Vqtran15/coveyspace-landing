import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94]

export default function FadeUp({ children, delay = 0, className = '', amount = 0.15, as: Tag = 'div' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })
  const MotionTag = motion[Tag] || motion.div

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
