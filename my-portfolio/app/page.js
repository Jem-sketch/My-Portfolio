"use client";

import styles from "./home.module.css";

import GridTail from "./components/GridTail";
import Navbar from "./components/Navbar";

import {ThemeProvider,useTheme,} 
from "./context/ThemeContext";


export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}


function HomeContent() {
  const { darkmode, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles.page} ${
        darkmode ? styles.dark : styles.light
      }`}
    >
      <Navbar />

      <main>
        <button
          className={styles.themeButton}
          onClick={toggleTheme}
        >
          <img 
          src={darkmode ? "/icon-sun.png" : "/icon-moon.png"}
          alt={darkmode ? "Light-Mode" : "Dark-Mode"}
          className={styles.themeIcon}
          />
        </button>

        <section className={styles.container}>
          <GridTail />

          <div className={styles.content}>
            <h1></h1>
          </div>
        </section>

        <section className={styles.aboutPreview}>
          <h1>Hello World</h1>
        </section>
      </main>
    </div>
  );
}