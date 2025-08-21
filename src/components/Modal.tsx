import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Prefer this: id of a heading inside the modal */
  labelledBy?: string;
  /** Fallback if no heading id is available */
  ariaLabel?: string;
  /** Enable clicking on the backdrop to close (default: true) */
  closeOnBackdrop?: boolean;
  /** Optional extra classes */
  overlayClassName?: string;
  contentClassName?: string;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  labelledBy,
  ariaLabel,
  closeOnBackdrop = true,
  overlayClassName = "modal-overlay",
  contentClassName = "modal-content",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const prevActiveRef = useRef<HTMLElement | null>(null);

  // Focus management: trap + restore, and Escape to close
  useEffect(() => {
    if (!isOpen) return;

    prevActiveRef.current = document.activeElement as HTMLElement | null;

    const dialog = dialogRef.current;
    const selectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusable =
      dialog?.querySelector<HTMLElement>(selectors) ?? dialog ?? null;
    firstFocusable?.focus?.();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab" && dialog) {
        const items = Array.from(
          dialog.querySelectorAll<HTMLElement>(selectors)
        ).filter((el) => !el.hasAttribute("disabled"));
        if (items.length === 0) {
          e.preventDefault();
          (dialog as HTMLElement).focus();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first!.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last!.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // restore focus to the element that opened the modal
      prevActiveRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Backdrop close (on mousedown to avoid drag/select oddities)
  const onOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) return;
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      className={overlayClassName}
      onMouseDown={onOverlayMouseDown}
      // Accessibility
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        {...(labelledBy
          ? { "aria-labelledby": labelledBy }
          : ariaLabel
            ? { "aria-label": ariaLabel }
            : {})}
        tabIndex={-1}
        className={contentClassName}
      >
        {children}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
}
