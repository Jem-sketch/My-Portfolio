"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IntroVideo.module.css";

export default function IntroVideo() {
    const [showIntro, setShowIntro] = useState(true);
    const [logoVisible, setLogoVisible] = useState(false);
    const [closingIntro, setClosingIntro] = useState(false);

    const removeTimerRef = useRef(null);

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

        const navigation =
            performance.getEntriesByType("navigation")[0];

        const navType = navigation?.type;

        // Show intro on first visit or reload
        if (navType === "reload" || !hasSeenIntro) {
            sessionStorage.setItem("introSeen", "true");

            lockScroll();

            // Logo enters
            const logoTimer = setTimeout(() => {
                setLogoVisible(true);
            }, 150);

            // Start outro
            const outroTimer = setTimeout(() => {
                setClosingIntro(true);
            }, 2000);

            // Remove intro after animation
            removeTimerRef.current = setTimeout(() => {
                setShowIntro(false);
                unlockScroll();
            }, 3200);

            return () => {
                clearTimeout(logoTimer);
                clearTimeout(outroTimer);

                if (removeTimerRef.current) {
                    clearTimeout(removeTimerRef.current);
                }

                unlockScroll();
            };
        }

        // Don't show intro on normal navigation
        setShowIntro(false);
        unlockScroll();
    }, []);

    if (!showIntro) {
        return null;
    }

    return (
        <div
            className={`${styles.intro} ${
                closingIntro ? styles.closing : ""
            }`}
        >
            {/* Dark background */}
            <div className={styles.background} />

            {/* Logo */}
            <div
                className={`${styles.logoContainer} ${
                    logoVisible ? styles.logoVisible : ""
                } ${
                    closingIntro ? styles.logoClosing : ""
                }`}
            >
                
                <img
                    src="/Logo(jem2.0).png"
                    alt="Jem Celestial Logo"
                    className={styles.logo}
                />

            </div>
        </div>
    );
}