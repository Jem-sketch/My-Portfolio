/* ============================================================
   MAIN.JS — Portfolio Site
   Sections:
   1. DOM Elements & State
   2. Navbar
   3. Projects Section (Open/Close)
   4. Text Scramble Animations
   5. UI Trigger Animations
   6. Custom Cursor
   7. Scroll-Based Logo Swap
   8. Intro Video Logic (Entry Point)
   9. Smooth Scroll (Lenis)
   ============================================================ */


/* ============================================================
   1. DOM ELEMENTS & STATE
   ============================================================ */

const intro          = document.getElementById("intro-video");
const videos         = document.querySelectorAll(".split-video");
const left           = document.querySelector(".left");
const right          = document.querySelector(".right");
const ring           = document.querySelector(".cursor-ring");
const viewWorkBtn    = document.getElementById("button01");
const backBtn        = document.getElementById("back-to-home");
const projectsSection = document.getElementById("projects-section");

// Determine if the user has already seen the intro this session
const navType     = performance.getEntriesByType("navigation")[0].type;
const hasSeenIntro = sessionStorage.getItem("introSeen");

// Character set for the scramble text effect
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

// Roles cycled through in the subtitle scramble animation
const roles  = ["WEB-DEVELOPER", "FRONT-END DEV"];
const roles2 = ["GRAPHIC DESIGN", "WEB-DESIGNER"];


/* ============================================================
   2. NAVBAR
   ============================================================ */

const logoTrigger = document.querySelector(".navbar-logo");
const navbar      = document.querySelector(".navbar");

if (logoTrigger) {
    // On mobile: toggle the nav menu. On desktop: navigate home.
    logoTrigger.addEventListener("click", function (e) {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            e.preventDefault();
            navbar.classList.toggle("nav-active");
        } else {
            window.location.href = "index.html";
        }
    });
}

// Close nav menu when clicking outside of it
document.addEventListener("click", (e) => {
    if (navbar.classList.contains("nav-active") && !navbar.contains(e.target)) {
        navbar.classList.remove("nav-active");
    }
});


/* ============================================================
   3. PROJECTS SECTION — Open / Close
   ============================================================ */

// Reveal the projects section and show the back button
viewWorkBtn.addEventListener("click", () => {
    projectsSection.classList.remove("project-hidden");
    projectsSection.classList.add("active");
    backBtn.classList.add("is-visible");
});

// Hide the projects section and reset state
backBtn.addEventListener("click", () => {
    projectsSection.classList.remove("active");
    backBtn.classList.remove("is-visible");

    // Re-apply display:none after the CSS transition finishes (800ms)
    setTimeout(() => {
        projectsSection.classList.add("project-hidden");
    }, 800);
});


/* ============================================================
   4. TEXT SCRAMBLE ANIMATIONS
   ============================================================ */

/**
 * Animates a single word by scrambling random letters
 * that progressively settle into the final string.
 * @param {Element} targetElement - The DOM element to animate.
 * @param {string}  finalText     - The final string to reveal.
 * @returns {Promise} Resolves when the animation completes.
 */
function animateWord(targetElement, finalText) {
    if (!targetElement) return Promise.resolve();

    let iteration = 0;

    return new Promise((resolve) => {
        const interval = setInterval(() => {
            targetElement.innerText = finalText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) return finalText[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            if (iteration >= finalText.length) {
                clearInterval(interval);
                resolve();
            }
            iteration += 0.8;
        }, 40);
    });
}

/**
 * Runs the scramble animation on both main title elements simultaneously.
 */
async function runAnimations() {
    const webEl     = document.querySelector("#title-web");
    const graphicEl = document.querySelector("#title-graphic");

    await Promise.all([
        animateWord(webEl, "WEB DEVELOPER"),
        animateWord(graphicEl, "GRAPHIC DESIGN"),
    ]);
}

/**
 * Infinitely loops through the subtitle role arrays,
 * scrambling each word in sequence with a pause between cycles.
 */
async function loopSubtitle() {
    const subtitle1 = document.querySelector(".subtitle.variant-1");
    const subtitle2 = document.querySelector(".subtitle.variant-2");

    await Promise.all([
        (async () => {
            while (true) {
                for (let role of roles) {
                    await animateWord(subtitle1, role);
                    await new Promise((r) => setTimeout(r, 3000));
                }
            }
        })(),
        (async () => {
            while (true) {
                for (let role of roles2) {
                    await animateWord(subtitle2, role);
                    await new Promise((r) => setTimeout(r, 3000));
                }
            }
        })(),
    ]);
}


/* ============================================================
   5. UI TRIGGER ANIMATIONS
   ============================================================ */

/** Slides in the navbar logo. */
function animateNavbar() {
    const logo = document.querySelector(".navbar-logo");
    if (!logo) return;
    setTimeout(() => {
        logo.classList.add("logo-anim");
        setTimeout(() => {
            logo.style.pointerEvents = "auto";
            logo.style.opacity = "1";
        }, 800);
    }, 100);
}

/** Fades in the large background title. */
function animateTitle() {
    const title = document.querySelector(".bg-title-container p");
    if (title) setTimeout(() => title.classList.add("show-BG-title"), 300);
}

/** Reveals the decorative horizontal line. */
function animateLine() {
    const line = document.querySelector(".line01");
    if (line) setTimeout(() => line.classList.add("show-line01"), 300);
}

/** Fades in the tagline text. */
function animateTagline() {
    const tagline = document.getElementById("tagline01");
    if (tagline) setTimeout(() => tagline.classList.add("show-tagline01"), 300);
}

/** Fades in the primary CTA button. */
function animateButton() {
    const button = document.getElementById("button01");
    if (button) setTimeout(() => button.classList.add("show-button01"), 500);
}

/** Makes the plus-pattern background visible and starts its cycle. */
function showPluses() {
    const rows = document.querySelectorAll(".plus-row");

    document.querySelectorAll(".plus-background").forEach((bg) => {
        bg.style.opacity = "1";
        bg.style.visibility = "visible";
    });

    const states = ["state-1", "state-2", "state-3", "state-4"];
    let index = 0, direction = 1;

    function cycle() {
        rows.forEach((row) => {
            row.classList.remove(...states);
            row.classList.add(states[index]);
        });
        index += direction;
        if (index === states.length - 1 || index === 0) direction *= -1;
    }

    cycle();
    setInterval(cycle, 1000);
}

/** Triggers the spinning circle graphic animation. */
function spinCircle() {
    document.querySelectorAll(".spinCircle-wrapper").forEach((wrapper) => {
        setTimeout(() => wrapper.classList.add("show-spinCircle"), 800);
    });
}

/**
 * Fades in the subtitle elements with a staggered delay.
 * @returns {Promise} Resolves after all subtitles have faded in.
 */
function animateSubtitles() {
    return new Promise((resolve) => {
        document.querySelectorAll(".subtitle.variant-1").forEach((el) =>
            setTimeout(() => el.classList.add("show"), 300)
        );
        document.querySelectorAll(".subtitle.variant-2").forEach((el) =>
            setTimeout(() => el.classList.add("show"), 600)
        );
        setTimeout(resolve, 1200);
    });
}

/**
 * Master function: fires all UI animations in the correct order.
 * Called once the intro sequence finishes (or is skipped).
 */
async function triggerAllAnimations() {
    animateNavbar();
    animateTitle();
    showPluses();
    spinCircle();
    animateLine();
    animateTagline();
    animateButton();

    await animateSubtitles();  // Wait for subtitles to finish fading in
    runAnimations();            // Scramble the main titles
    loopSubtitle();             // Begin the infinite subtitle loop
}


/* ============================================================
   6. CUSTOM CURSOR
   ============================================================ */

let mouseX = 0, mouseY = 0;
let ringX = 0,  ringY = 0;
let isHovering = false;

// Track raw mouse position
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

/**
 * Smoothly interpolates (lerp) the cursor ring toward the mouse position,
 * creating a natural lag effect.
 */
function animateRing() {
    if (!isHovering && ring) {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + "px";
        ring.style.top  = ringY + "px";
    }
    requestAnimationFrame(animateRing);
}
animateRing();

// Snap & expand the ring when hovering over interactive nav elements
const hoverItems = document.querySelectorAll(".nav-left a, .nav-right a, .navbar-logo");
hoverItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        isHovering = true;
        const rect = item.getBoundingClientRect();
        ring.style.left = rect.left + rect.width  / 2 + "px";
        ring.style.top  = rect.top  + rect.height / 2 + "px";
        ring.classList.add("expand");
    });
    item.addEventListener("mouseleave", () => {
        isHovering = false;
        ring.classList.remove("expand");
    });
});


/* ============================================================
   7. SCROLL-BASED LOGO SWAP
   Swaps the navbar logo between black and white versions
   depending on whether the dark section is in view.
   ============================================================ */

const jemLogo = document.getElementById("jemLogo");

window.addEventListener("scroll", () => {
    const blackSection = document.querySelector(".black-section");
    const rect = blackSection.getBoundingClientRect();

    if (rect.top <= 80 && rect.bottom >= 80) {
        jemLogo.src = "Images/original design - noBG-white.png";
    } else {
        jemLogo.src = "Images/original design - noBG-black.png";
    }
});


/* ============================================================
   8. INTRO VIDEO LOGIC — Entry Point
   Plays the split-screen intro on first visit/reload;
   skips it on subsequent navigations within the same session.
   ============================================================ */

if (navType === "reload" || !hasSeenIntro) {
    // Mark intro as seen so it won't replay on soft navigations
    sessionStorage.setItem("introSeen", "true");

    if (intro) {
        document.body.style.overflow = "hidden"; // Lock scroll during intro
        intro.style.display = "block";
    }

    // Wait for all split-screen videos to be ready before playing
    const videoLoadPromises = Array.from(videos).map((v) =>
        new Promise((resolve) => {
            if (v.readyState >= 3) resolve();
            else v.oncanplaythrough = resolve;
        })
    );

    Promise.all(videoLoadPromises).then(() => {
        videos.forEach((v) => {
            v.muted = true;
            v.play();
            v.style.filter = "brightness(0.4)";
            v.playbackRate = 1.5;
        });

        // Brighten the videos after 2.5 seconds for a dramatic reveal
        setTimeout(() => {
            videos.forEach((v) => {
                v.style.transition = "filter 1s ease";
                v.style.filter = "brightness(1) contrast(1.3)";
            });
        }, 2500);
    });

    // When the intro ends, slide the panels apart and show the site
    if (videos[0]) {
        videos[0].addEventListener("ended", () => {
            left.style.transform  = "translateX(-100%)";
            right.style.transform = "translateX(100%)";

            setTimeout(() => {
                if (intro) intro.style.display = "none";
                document.body.style.overflow = "auto";
                triggerAllAnimations();
            }, 1200); // Wait for the panel slide transition to complete
        });
    }

} else {
    // Returning visitor: skip the intro and load the site immediately
    if (intro) intro.style.display = "none";
    document.body.style.overflow = "auto";
    triggerAllAnimations();
}


/* ============================================================
   9. SMOOTH SCROLL — Lenis
   Applied only to the projects section container.
   ============================================================ */

const lenis = new Lenis({
    wrapper:     projectsSection,
    content:     projectsSection,
    duration:    1.2,
    easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

// Drive Lenis with the browser's animation loop
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Scroll the projects section back to the top whenever it's opened
viewWorkBtn.addEventListener("click", () => {
    lenis.scrollTo(0, { immediate: true });
});