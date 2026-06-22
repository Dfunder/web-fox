import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Close icon SVG component
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-5 w-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const sizeClassMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);
  const modalSizeClass = sizeClassMap[size] || sizeClassMap.md;

  // Handle Escape key press
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      // Trap focus within modal
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [onClose]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Store previous active element and add event listeners when modal opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Focus the modal or first focusable element after animation
      const timer = setTimeout(() => {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements?.length > 0) {
          focusableElements[0].focus();
        } else {
          modalRef.current?.focus();
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        // Restore focus to previous element when modal closes
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop with fade animation */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out animate-fade-in"
        aria-hidden="true"
      />

      {/* Modal content with fade + scale animation */}
      <div
        ref={modalRef}
        className={`relative w-full ${modalSizeClass} mx-4 transform transition-all duration-300 ease-out animate-modal-in`}
        tabIndex={-1}
      >
        <div className="relative rounded-lg bg-white shadow-xl">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900" id="modal-title">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            </div>
          )}

          {/* Close button for modals without title */}
          {!title && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          )}

          {/* Body */}
          <div className={`${title ? 'px-6 py-4' : 'p-6'}`}>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
