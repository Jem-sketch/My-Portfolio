"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
const [showIntro, setShowIntro] = useState(true);

const HalfLeft = useRef(null);
const HalfRight = useRef(null);

useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("introSeen");

    const navType =
    performance.getEntriesByType("navigation")[0]?.type;

    if (navType === "reload" || !hasSeenIntro) {
    sessionStorage.setItem("introSeen", "true");

    document.body.style.overflow = "hidden";

    const videos = [
        HalfLeft.current,
        HalfRight.current,
    ];

    const videoLoadPromises = videos.map(
        (video) =>
        new Promise((resolve) => {
            if (video.readyState >= 3) {
            resolve();
            } else {
            video.oncanplaythrough = resolve;
            }
        })
    );

Promise.all(videoLoadPromises).then(() => {
        videos.forEach((video) => {
            video.muted = true;
            video.play().catch(console.error);
            video.style.filter = "brightness(0.4)";
            video.playbackRate = 1.5;
        });

        setTimeout(() => {
            videos.forEach((video) => {
            video.style.transition = "filter 1s ease";
            video.style.filter =
            "brightness(1) contrast(1.3)";
        });
        }, 2500);
    });

    const handleEnd = () => {
        setShowIntro(false);
        document.body.style.overflow = "auto";

        // triggerAllAnimations();
    };

    HalfLeft.current?.addEventListener(
        "ended",
        handleEnd
    );

    return () => {
        HalfLeft.current?.removeEventListener(
        "ended",
        handleEnd
        );
    };
    } else {
    setShowIntro(false);
    document.body.style.overflow = "auto";

      // triggerAllAnimations();
    }
    }, []);

    if (!showIntro) return null;

return (
    <div id="intro-video">
        <div className="half left">
        <video
            ref={HalfLeft}
            className="split-video"
            muted
            playsInline
        >
            <source
            src="/finalize-logo-animate.mp4"
            type="video/mp4"
            />
        </video>
        </div>

        <div className="half right">
        <video
            ref={HalfRight}
            className="split-video"
            muted
            playsInline
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