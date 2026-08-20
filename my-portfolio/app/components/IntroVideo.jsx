"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IntroVideo.module.css";

export default function IntroVideo() {
  const [showIntro, setShowIntro] = useState(true);
  const [closingIntro, setClosingIntro] = useState(false);
  const [videoBright, setVideoBright] = useState(false);

  const closingRef = useRef(false);
  const removeTimerRef = useRef(null);
  
  // Re-added the video refs so we can pause them
  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);

  useEffect(() => {
    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    const hasSeenIntro = sessionStorage.getItem("introSeen");
    const navigation = performance.getEntriesByType("navigation")[0];
    const navType = navigation?.type;

    if (navType === "reload" || !hasSeenIntro) {
      sessionStorage.setItem("introSeen", "true");
      lockScroll();

      const brightTimer = setTimeout(() => {
        setVideoBright(true);
      }, 2500);

      return () => {
        clearTimeout(brightTimer);
        unlockScroll();
      };
    }

    setShowIntro(false);
    unlockScroll();
  }, []);

  const closeIntro = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    // FREEZE THE VIDEO: Prevents the video from finishing and turning black 
    // before the 1.2s CSS sliding animation completes
    if (leftVideoRef.current) leftVideoRef.current.pause();
    if (rightVideoRef.current) rightVideoRef.current.pause();

    // Start CSS closing animation
    setClosingIntro(true);

    removeTimerRef.current = setTimeout(() => {
      setShowIntro(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }, 1200);
  };

  const handleVideoEnd = () => {
    closeIntro();
  };

  const handleTimeUpdate = (event) => {
    const video = event.currentTarget;
    if (!Number.isFinite(video.duration)) return;

    const remaining = video.duration - video.currentTime;

    if (remaining <= 0.15) {
      closeIntro();
    }
  };

  useEffect(() => {
    return () => {
      if (removeTimerRef.current) {
        clearTimeout(removeTimerRef.current);
      }
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  if (!showIntro) return null;

  return (
    <div
      className={`${styles.introVideo} ${
        closingIntro ? styles.closing : ""
      }`}
    >
      <div
        className={styles.blackOverlay}
        style={{ opacity: videoBright ? 0 : 0.6 }}
      />

      {/* LEFT */}
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
          autoPlay
          preload="auto"
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src="/finalize-logo-animate.mp4" type="video/mp4" />
        </video>
      </div>

      {/* RIGHT */}
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
          autoPlay
          preload="auto"
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src="/finalize-logo-animate.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}