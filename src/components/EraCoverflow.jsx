import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './EraCoverflow.css';

const EraCoverflow = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const totalImages = images.length;

    const nextSlide = () => {
        if (activeIndex < totalImages - 1) setActiveIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        if (activeIndex > 0) setActiveIndex(prev => prev - 1);
    };

    const handleSwipe = (event, info) => {
        const threshold = 50;
        const velocityThreshold = 500;

        const swipeDistance = info.offset.x;
        const swipeVelocity = info.velocity.x;

        if (swipeDistance < -threshold || swipeVelocity < -velocityThreshold) {
            nextSlide();
        } else if (swipeDistance > threshold || swipeVelocity > velocityThreshold) {
            prevSlide();
        }
    };

    // Calculate dynamic styles based on relationship to active index
    const getVariantStyles = (index) => {
        const diff = index - activeIndex;
        const absDiff = Math.abs(diff);

        // Hide items that are too far away for performance and visual clarity
        if (absDiff > 3) {
            return {
                opacity: 0,
                x: diff < 0 ? -1000 : 1000,
                scale: 0.5,
                zIndex: 0,
                rotateY: 0,
                display: 'none'
            };
        }

        const maxScale = 1;
        const scaleStep = 0.2;
        const scale = Math.max(0.4, maxScale - (absDiff * scaleStep));

        const rotateStep = 45;
        const rotateY = diff === 0 ? 0 : diff < 0 ? rotateStep : -rotateStep;

        // Base X shift for spacing
        // The further away, the more it compresses
        const shiftStep = 150;
        const xOffset = diff * shiftStep * (1 - (absDiff * 0.15));

        return {
            x: `${xOffset}px`,
            scale: scale,
            rotateY: rotateY,
            rotateX: 0,
            zIndex: 100 - absDiff,
            opacity: absDiff === 0 ? 1 : 1 - (absDiff * 0.25),
            display: 'block'
        };
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="coverflow-wrapper">
            <div className="coverflow-container" style={{ perspective: '1200px' }}>
                <motion.div
                    className="coverflow-track"
                    onPanEnd={handleSwipe}
                    style={{ touchAction: 'pan-y' }}
                >
                    <AnimatePresence initial={false}>
                        {images.map((imgUrl, index) => {
                            const styles = getVariantStyles(index);
                            return (
                                <motion.div
                                    key={index}
                                    className="coverflow-slide"
                                    initial={styles}
                                    animate={styles}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        mass: 0.8
                                    }}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="coverflow-image-wrapper">
                                        <img src={imgUrl} alt={`Cover ${index + 1}`} />
                                        {/* Optional shadow/reflection overlay can go here */}
                                        <div className="coverflow-reflection"></div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Navigation Controls */}
            <div className="coverflow-controls">
                <button
                    className="coverflow-btn"
                    onClick={prevSlide}
                    disabled={activeIndex === 0}
                >
                    <ChevronLeft size={24} />
                </button>
                <div className="coverflow-indicator">
                    {activeIndex + 1} / {totalImages}
                </div>
                <button
                    className="coverflow-btn"
                    onClick={nextSlide}
                    disabled={activeIndex === totalImages - 1}
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default EraCoverflow;
