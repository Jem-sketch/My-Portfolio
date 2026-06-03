"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorRing.module.css";

export default function CursorRing() {
  const ringRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    function animateRing() {
      if (!isHovering && ring) {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animateRing);
    }

    animateRing();

    const hoverItems = document.querySelectorAll(
      ".nav-left a, .nav-right a, .navbar-logo"
    );

    hoverItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        isHovering = true;

        const rect = item.getBoundingClientRect();

        ring.style.left = `${rect.left + rect.width / 2}px`;
        ring.style.top = `${rect.top + rect.height / 2}px`;

        ring.classList.add(styles.expand);
      });

      item.addEventListener("mouseleave", () => {
        isHovering = false;
        ring.classList.remove(styles.expand);
      });
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={ringRef} className={styles.cursorRing}></div>;
}