import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getPreDebutImage } from '../utils/assets';
import './Section1PreDebut.css';

const Section1PreDebut = () => {
    const containerRef = useRef(null);

    // Track scroll progress within this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transform scroll progress to blur value. Starts at 20px, ends at 0px.
    const blurValue = useTransform(scrollYProgress, [0, 0.5], ["blur(30px)", "blur(0px)"]);
    // Transform opacity of the image
    const imgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

    // Transform opacity of the text (fades out as scrolled down)
    const textOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);

    const [text, setText] = useState('');
    const fullText = "Our promises echoed in the empty practice room... before the world knew our name.";

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
                clearInterval(typingInterval);
            }
        }, 50);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <section
            ref={containerRef}
            id="section-predebut"
            className="observe-section section-predebut"
            data-era="intro"
        >
            <div className="sticky-container">
                <motion.div
                    className="hero-image-container"
                    style={{ filter: blurValue, opacity: imgOpacity }}
                >
                    <img
                        src={getPreDebutImage()}
                        alt="The Beginning - Blurred Dreams"
                        className="hero-image"
                    />
                </motion.div>

                <motion.div
                    className="text-overlay"
                    style={{ opacity: textOpacity }}
                >
                    <h1 className="typewriter-text">{text}<span className="cursor">|</span></h1>
                </motion.div>

                <div className="scroll-indicator">
                    <span>Scroll down to develop the memory</span>
                    <div className="line"></div>
                </div>
            </div>
        </section>
    );
};

export default Section1PreDebut;
