"use client";

import styles from "./home.module.css";

import GridTail from "./components/GridTail";
import Navbar from "./components/Navbar";

import themeStyles from "./context/ThemeButton.module.css";
import {ThemeProvider,useTheme,} from "./context/ThemeContext";


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
        className={themeStyles.themeButton}
        onClick={toggleTheme}
      >
        <img
          src={darkmode ? "/icon-sun.png" : "/icon-moon.png"}
          alt={darkmode ? "Light-Mode" : "Dark-Mode"}
          className={themeStyles.themeIcon}
        />
      </button>

        <section className={styles.Profile_Preview}>
          <GridTail />

          <div className={`${styles.profile} ${darkmode ? styles.dark : styles.light}`}>
            <img src="/sample.jpg" alt="profile-image" className={styles.profile_image}></img>
            
            <div className={styles.profile_description}>
              <h1>Jem</h1>
              <p>Full-stack Web Developer passionate about creating modern and interactive web experiences.</p>

              <div className={styles.social_media}>
                <a href="#" target="_blank" rel="noopener noreferrer"><img src="#" alt="facebook" className={styles.social_icon}></img></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><img src="#" alt="instagram" className={styles.social_icon}></img></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><img src="#" alt="telegram" className={styles.social_icon}></img></a>
              </div>
            </div>
          </div>
          
          <div className={`${styles.statistical_container} ${darkmode ? styles.dark : styles.light}`}>
              <div className={styles.stat}>
                <a href="Project"  rel="noopener noreferrer"><h2>15+</h2>
                <p>Project</p>
                </a>
              </div>

              <div className={styles.stat}>
                <a href="Skills"  rel="noopener noreferrer"><h2>10+</h2>
                <p>Skills</p>
                </a>
              </div>

              <div className={styles.stat}>
                <a href="Clients"  rel="noopener noreferrer"><h2>20+</h2>
                <p>Clients</p>
                </a>
              </div>
          </div>
        </section>

        <section className={styles.aboutPreview}>

          {/* ========================= */}
          {/* EXPERIENCE */}
          {/* ========================= */}
          <div className={styles.Experience_overview}>
            <h1>Experience</h1>
            <hr/>
            <h4>2026 - Full-Stack Web Developer</h4>
            <p></p>
            <hr/>
            <h4>2025 - UI/UX Designer</h4>
            <hr/>
            <h4>2020 - Graphic Designer</h4>
            <hr/>
            <h4>2021 - Game Developer</h4>
          </div>

          <br/>

          {/* ========================= */}
          {/* TECH STACK */}
          {/* ========================= */}
          <div className={styles.tech_stack_overview}>
            <legend><h1>Tech Stack</h1></legend>

            <div className={styles.stack_container01}>

              <div className={styles.stack01}>
                <img src="#" alt=""></img>
                <span>Html</span>
              </div>

              <div className={styles.stack02}>
                <img src="#" alt=""></img>
                <span>Css</span>
              </div>

              <div className={styles.stack03}>
                <img src="#" alt=""></img>
                <span>Javascript</span>
              </div>

              <div className={styles.stack04}>
                <img src="#" alt=""></img>
                <span>Python</span>
              </div>

              <div className={styles.stack05}>
                <img src="#" alt=""></img>
                <span>React.Js</span>
              </div>

            </div>
          </div>

          <br/>

          {/* ========================= */}
          {/* VIEW MORE */}
          {/* ========================= */}
          <div className={styles.view_more_01}>
            <a
              href="#"
              targer="_blank"
              rel="noopen noreferrer"
            >
              View More <span className={styles.arrow}>→</span>
            </a>
          </div>

          <br/>

          {/* ========================= */}
          {/* PROJECTS */}
          {/* ========================= */}
          <div className={styles.project_overview}>
            <h1>Project</h1>

            {/* ----- Project 01: Adventure Games ----- */}
            <div className={styles.project01}>
              <div className={styles.project_Header}>
                <span className={styles.project_Status}>
                  <span className={styles.status_Dot}></span>
                  Live
                </span>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.view_Link}
                >
                  View <span>→</span>
                </a>
              </div>
            </div>

            <div className={styles.project_Preview}>
              <div className={styles.project_Info}>
                <h3>Adventure Games</h3>
                <p><i>Academic Project</i></p>
              </div>
            </div>

            <br/>

            {/* ----- Project 02: JRB Website ----- */}
            <div className={styles.project02}>
              <div className={styles.project_Header}>
                <span className={styles.project_Status}>
                  <span className={styles.status_Dot}></span>
                  Live
                </span>

                <a
                  href="#"
                  target="_blank"
                  rel="noopen noreferrer"
                  className={styles.view_Link}
                >
                  View <span>→</span>
                </a>

                <div className={styles.project_Preview}>
                  <div className={styles.project_Info}>
                    <h3>JRB Website</h3>
                    <p><i>Architecte Website</i></p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <br/>

          {/* ----- Project 03: Background Remover ----- */}
          <div className={styles.project03}>
            <div className={styles.project_Header}>
              <span className={styles.project_Status}>
                <span className={styles.status_Dot}></span>
                Live
              </span>

              <a
                href="#"
                target="_blank"
                rel="noopen noreferrer"
                className={styles.view_Link}
              >
                View <span>→</span>
              </a>

              <div className={styles.project_Preview}>
                <div className={styles.project_Info}>
                  <h3>Background Remover</h3>
                  <p><i>Background Image Remover</i></p>
                </div>
              </div>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}