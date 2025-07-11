// Reusable button component
export default function Button({ onClick, children, ariaLabel, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`game-button ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
