"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const navbarRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuHover, setMenuHover] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Scroll direction tracking for hide/show on scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                // Scrolling down -> hide navbar
                setIsVisible(false);
            } else {
                // Scrolling up -> show navbar
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Click outside handler (fixed current typo to contains)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuOpen &&
                navbarRef.current &&
                !navbarRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [menuOpen]);

    const showLinks = menuHover || menuOpen;

    return (
        <nav ref={navbarRef} className={`${styles.navbar} ${isVisible ? styles.show : styles.hide}`}>
            <div 
                className={`${styles.navbarContainer} ${showLinks ? styles.expanded : ""}`}
                onMouseEnter={() => setMenuHover(true)}
                onMouseLeave={() => setMenuHover(false)}
            >
                <ul className={`${styles.navLeft} ${showLinks ? styles.visible : ""}`}>
                    <li>
                        <Link href="/" data-cursor="hover">Home</Link>
                    </li>
                    <li>
                        <Link href="/about" data-cursor="hover">About</Link>
                    </li>
                </ul>

                <Link href="/" className={styles.navbarLogo} data-cursor="logo">
                    <img src="/Logo_jem2.0_.svg" alt="jem-logo" />
                </Link>

                <ul className={`${styles.navRight} ${showLinks ? styles.visible : ""}`}>
                    <li>
                        <Link href="/project" data-cursor="hover">Project</Link>
                    </li>
                    <li>
                        <Link href="/contact" data-cursor="hover">Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}