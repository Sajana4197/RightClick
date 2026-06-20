// src/components/SendButton.jsx
//
// "Send" button hover effect inspired by
// https://codepen.io/Krar/pen/qYLzXN — a color fill sweeps in from the left
// while a paper-plane icon slides in from the right, and the button's
// padding expands to make room for it.
//
// Recreated with plain CSS transitions (matches the original's approach)
// rather than Framer Motion, since the effect is a hover-state, not a
// one-shot click animation.
//
// Usage:
//   <SendButton type="submit">Send Message</SendButton>

import { FaPaperPlane } from 'react-icons/fa'
import './sendButton.css'

export default function SendButton({
  children = 'Send Message',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rc-fill-btn ${className}`}
    >
      <span className="rc-fill-btn-label">{children}</span>
      <span className="rc-fill-btn-fill" aria-hidden="true" />
      <span className="rc-fill-btn-icon" aria-hidden="true">
        <FaPaperPlane />
      </span>
    </button>
  )
}
