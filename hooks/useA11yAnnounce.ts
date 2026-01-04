"use client";

import { useEffect, useRef } from "react";

/**
 * Custom hook for making screen reader announcements
 * Creates a live region for dynamic content updates
 */
export function useA11yAnnounce() {
  const announceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!announceRef.current) {
      const liveRegion = document.createElement("div");
      liveRegion.setAttribute("role", "status");
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
      announceRef.current = liveRegion;
    }

    return () => {
      // Cleanup on unmount
      if (announceRef.current && document.body.contains(announceRef.current)) {
        document.body.removeChild(announceRef.current);
      }
    };
  }, []);

  const announce = (message: string, priority: "polite" | "assertive" = "polite") => {
    if (announceRef.current) {
      announceRef.current.setAttribute("aria-live", priority);
      announceRef.current.textContent = message;
      
      // Clear after announcement to allow repeat announcements
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = "";
        }
      }, 1000);
    }
  };

  return { announce };
}

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
    const firstError = document.querySelector<HTMLElement>('[aria-invalid="true"]');
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
export function useKeyboardNavigation(itemCount: number, onSelect: (index: number) => void) {
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
    const items = document.querySelectorAll('[role="option"]');
    if (items[newIndex]) {
      (items[newIndex] as HTMLElement).focus();
    }
  };

  return { handleKeyDown };
}

