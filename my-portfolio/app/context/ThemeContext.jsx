"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkmode, setDarkmode] = useState(true);
  const transitionRef = useRef(null);

  useEffect(() => {
    let forward = null;
    let timer = null;

    // Tap/click during the animation: skip it and remember where the tap was
    const onPointerDown = (e) => {
      if (!transitionRef.current) return;

      forward = { x: e.clientX, y: e.clientY };
      clearTimeout(timer);
      timer = setTimeout(() => (forward = null), 400);

      transitionRef.current.skipTransition();
      transitionRef.current = null;
    };

    // That tap landed on the snapshot, so the click targets <html>.
    // Forward it to the real element underneath.
    const onClick = (e) => {
      if (!forward) return;
      const { x, y } = forward;
      forward = null;

      if (e.target !== document.documentElement) return;
      e.stopPropagation();
      document.elementFromPoint(x, y)?.click();
    };

    // Scrolling / keyboard should also end the animation
    const skip = () => {
      transitionRef.current?.skipTransition();
      transitionRef.current = null;
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("click", onClick, true);
    window.addEventListener("wheel", skip, { capture: true, passive: true });
    window.addEventListener("touchmove", skip, { capture: true, passive: true });
    window.addEventListener("keydown", skip, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("wheel", skip, true);
      window.removeEventListener("touchmove", skip, true);
      window.removeEventListener("keydown", skip, true);
    };
  }, []);

  const toggleTheme = (event) => {
    const root = document.documentElement;

    const x = event?.clientX ?? window.innerWidth - 30;
    const y = event?.clientY ?? window.innerHeight - 40;

    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);

    const updateTheme = () => {
      flushSync(() => {
        setDarkmode((prev) => !prev);
      });
    };

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateTheme();
      return;
    }

    const transition = document.startViewTransition(updateTheme);
    transitionRef.current = transition;

    transition.finished.finally(() => {
      if (transitionRef.current === transition) {
        transitionRef.current = null;
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ darkmode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}