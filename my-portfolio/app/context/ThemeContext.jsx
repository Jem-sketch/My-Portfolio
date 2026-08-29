"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkmode, setDarkmode] = useState(true);

  const toggleTheme = () => {
    setDarkmode((prev) => !prev);
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