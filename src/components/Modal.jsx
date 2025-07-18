import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  // Extract replayText from App button for use in aria-label
  const title = children[1].props.children
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => document.removeEventListener("keydown", handleKeyDown)
    // Close modal when isOpen/onClose values are changed
  }, [isOpen, onClose])

  // Otherwise, do nothing
  if (!isOpen) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Confirmation: ${title}`}>
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &#x2715;
        </button>
      </div>
    </div>
  )
}