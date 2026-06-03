
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogoClick = (e) => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            e.preventDefault();;
            setMenuOpen((prev) => !prev);
        }else{
            window.location.href = "/";
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(
                menuOpen &&
                navbarRef.current &&
                !navbarRef.current.contain(e.target)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [menuOpen]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>

                <ul className={styles.navLeft}>
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

                <ul className={styles.navRight}>
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