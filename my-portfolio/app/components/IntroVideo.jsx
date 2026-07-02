"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IntroVideo.module.css";

export default function IntroVideo() {
  const [showIntro, setShowIntro] = useState(true);
  const [closingIntro, setClosingIntro] = useState(false);

  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);

  const handleVideoEND = () => {
    document.body.classList.add("IntroDONE");
  };

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("introSeen");

    const navType =
      performance.getEntriesByType("navigation")[0]?.type;

    if (navType === "reload" || !hasSeenIntro) {
      sessionStorage.setItem("introSeen", "true");

      document.body.style.overflow = "hidden";

      const leftVideo = leftVideoRef.current;
      const rightVideo = rightVideoRef.current;
      const videos = [leftVideo, rightVideo];

      Promise.all(
        videos.map(
          (video) =>
            new Promise((resolve) => {
              if (!video) return resolve();

              if (video.readyState >= 3) {
                resolve();
              } else {
                video.oncanplaythrough = resolve;
              }
            })
        )
      ).then(() => {
        videos.forEach((video) => {
          if (!video) return;

          video.muted = true;
          video.play().catch(console.error);

          video.style.filter = "brightness(0.4)";
          video.playbackRate = 1.5;
        });

        setTimeout(() => {
          videos.forEach((video) => {
            if (!video) return;

            video.style.transition = "filter 1s ease";
            video.style.filter =
              "brightness(1) contrast(1.3)";
          });
        }, 2500);
      });

      const handleEnd = () => {
        /* Start sliding door outro */
        setClosingIntro(true);

        setTimeout(() => {
          setShowIntro(false);
          document.body.style.overflow = "auto";
        }, 1200);
      };

      leftVideo?.addEventListener("ended", handleEnd);

      return () => {
        leftVideo?.removeEventListener("ended", handleEnd);
      };

    } else {
      setShowIntro(false);
      document.body.style.overflow = "auto";
    }
  }, []);

  if (!showIntro) return null;

  return (
    <div className={styles.introVideo}>
      {/* LEFT HALF */}
      <div
        className={`${styles.half} ${styles.left} ${
          closingIntro ? styles.closingLeft : ""
        }`}
      >
        <video
          ref={leftVideoRef}
          className={`${styles.splitVideo} ${styles.leftVideo}`}
          muted
          playsInline
          onEnded={handleVideoEND}
        >
          <source
            src="/finalize-logo-animate.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* RIGHT HALF */}
      <div
        className={`${styles.half} ${styles.right} ${
          closingIntro ? styles.closingRight : ""
        }`}
      >
        <video
          ref={rightVideoRef}
          className={`${styles.splitVideo} ${styles.rightVideo}`}
          muted
          playsInline
          onEnded={handleVideoEND}
        >
          <source
            src="/finalize-logo-animate.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}