"use client";

import { useRef } from "react";

/**
 * Custom hook for managing focus
 * Helps with focus management between wizard steps
 */
export function useFocusManagement() {
  const focusRef = useRef<HTMLElement | null>(null);

  const setFocusRef = (element: HTMLElement | null) => {
    focusRef.current = element;
  };

  const focusElement = (selector?: string) => {
    if (selector) {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        element.focus();
        return;
      }
    }

    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  const focusFirstError = () => {
    const firstError = document.querySelector<HTMLElement>(
      '[data-error="true"]'
    );
    if (firstError) {
      firstError.focus();
      return true;
    }
    return false;
  };

  return { setFocusRef, focusElement, focusFirstError };
}

/**
 * Custom hook for keyboard navigation
 * Handles arrow key navigation for lists
 */
export function useKeyboardNavigation(
  itemCount: number,
  onSelect: (index: number) => void
) {
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        newIndex = (currentIndex + 1) % itemCount;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        newIndex = currentIndex === 0 ? itemCount - 1 : currentIndex - 1;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = itemCount - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onSelect(currentIndex);
        return;
      default:
        return;
    }

    // Focus the new item
    const items = document.querySelectorAll("[data-option]");
    if (items[newIndex]) {
      (items[newIndex] as HTMLElement).focus();
    }
  };

  return { handleKeyDown };
}
