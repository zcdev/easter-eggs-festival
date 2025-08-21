import React, { forwardRef } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Optional accessible label if visible text isn't sufficient */
  ariaLabel?: string;
};

/**
 * Reusable, accessible button.
 * - Strongly typed via native HTML button props
 * - Defaults to type="button"
 * - Forwards ref for focus management
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ariaLabel, className, type = "button", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={["game-button", className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
