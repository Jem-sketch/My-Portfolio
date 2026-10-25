
"use client";

import { createContext, useContext, useState } from "react";
import { flushSync } from "react-dom";


const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkmode, setDarkmode] = useState(true);

  const toggleTheme = (event) => {
    const root = document.documentElement;

    // Start the animation from the click position
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

    document.startViewTransition(() => {
      updateTheme();
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        darkmode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
