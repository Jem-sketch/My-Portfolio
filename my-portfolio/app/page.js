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

          <div className={`${styles.profile} ${darkmode ? styles.dark : styles.light}`}>
            <img src="/sample.jpg" alt="profile-image" className={styles.profile_image}></img>
            
            <div className={styles.profile_description}>
              <h1>Jem</h1>
              <p>Web Developer passionate about creating modern and interactive web experiences.</p>

              <div className={styles.social_media}>
                <a href="#" target="_blank" rel="noopener noreferrer"><img src="#" alt="facebook" className={styles.social_icon}></img></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><img src="#" alt="instagram" className={styles.social_icon}></img></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><img src="#" alt="telegram" className={styles.social_icon}></img></a>
              </div>
            </div>
          </div>
          
          <div className={`${styles.statistical_container} ${darkmode ? styles.dark : styles.light}`}>
              <div className={styles.stat}>
                <a href="#" target="_black" rel="noopener noreferrer"><h2>10+</h2></a>
                <p>Project</p>
              </div>

              <div className={styles.stat}>
                <a href="#" target="_black" rel="noopener noreferrer"><h2>7+</h2></a>
                <p>Skills</p>
              </div>

              <div className={styles.stat}>
                <a href="#" target="_black" rel="noopener noreferrer"><h2>20+</h2></a>
                <p>Clients</p>
              </div>
          </div>
        </section>

        <section className={styles.aboutPreview}>
          <h1>Hello World</h1>
        </section>
      </main>
    </div>
  );
}