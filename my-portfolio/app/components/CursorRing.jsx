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

    function animate() {
      if (!isHovering && ring) {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animate);
    }

    animate();  

    // ✅ FIXED SELECTOR (NO CSS MODULE ISSUES)
    const hoverItems = document.querySelectorAll("[data-cursor='hover'], [data-cursor='logo']");

    const handleEnter = (e) => {
      isHovering = true;

      const rect = e.target.getBoundingClientRect();

      ring.style.left = `${rect.left + rect.width / 2}px`;
      ring.style.top = `${rect.top + rect.height / 2}px`;

      ring.classList.add(styles.expand);
    };

    const handleLeave = () => {
      isHovering = false;
      ring.classList.remove(styles.expand);
    };

    hoverItems.forEach((item) => {
      item.addEventListener("mouseenter", handleEnter);
      item.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);

      hoverItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return <div ref={ringRef} className={styles.cursorRing}></div>;
}