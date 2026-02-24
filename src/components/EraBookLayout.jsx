import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './EraBookLayout.css';

const EraBookLayout = ({ images, title }) => {
    // Calculate total spreads (2 pages per spread)
    const totalSpreads = Math.ceil(images.length / 2);
    const [currentSpread, setCurrentSpread] = useState(0);

    const nextSpread = () => setCurrentSpread(prev => Math.min(prev + 1, totalSpreads - 1));
    const prevSpread = () => setCurrentSpread(prev => Math.max(prev - 1, 0));

    // Prepare sheets representing physical pages that turn
    // Each sheet has a front side (right page of current spread)
    // and a back side (left page of the next spread)
    const sheets = Array.from({ length: totalSpreads }).map((_, i) => ({
        frontImage: images[i * 2 + 1],
        frontIndex: i * 2 + 1,
        backImage: images[(i + 1) * 2],
        backIndex: (i + 1) * 2
    }));

    const handleSwipe = (event, info) => {
        const threshold = 50; // Minimum drag distance to trigger a turn
        const velocityThreshold = 500; // Minimum velocity to trigger a turn

        const swipeDistance = info.offset.x;
        const swipeVelocity = info.velocity.x;

        if (swipeDistance < -threshold || swipeVelocity < -velocityThreshold) {
            // Dragged left -> Next Page
            if (currentSpread < totalSpreads - 1) nextSpread();
        } else if (swipeDistance > threshold || swipeVelocity > velocityThreshold) {
            // Dragged right -> Previous Page
            if (currentSpread > 0) prevSpread();
        }
    };

    const BookContent = () => (
        <motion.div
            className="book-3d-container"
            onPanEnd={handleSwipe}
            style={{ touchAction: 'pan-y' }}
        >
            {/* Base Left (Underneath everything, shows first page) */}
            <div className="book-base book-base-left">
                <div className="page-content">
                    {images[0] ? <img src={images[0]} alt="Page 1" /> : <div className="blank-page" />}
                    <div className="page-number">1</div>
                </div>
            </div>

            {/* Base Right (Underneath everything, shows blank or last back page) */}
            <div className="book-base book-base-right">
                <div className="page-content">
                    <div className="blank-page" />
                </div>
            </div>

            {/* Flippable Sheets */}
            {sheets.map((sheet, i) => {
                const isFlipped = i < currentSpread;
                // Sheets on the right (unflipped) stack with decreasing zIndex (sheet 0 on top)
                // Sheets on the left (flipped) stack with increasing zIndex (latest flipped sheet on top)
                const zIndex = isFlipped ? i + 1 : totalSpreads - i;

                return (
                    <div
                        key={i}
                        className={`book-leaf ${isFlipped ? 'flipped' : ''}`}
                        style={{ zIndex }}
                    >
                        <div className="leaf-face leaf-front">
                            <div className="page-content">
                                {sheet.frontImage ? <img src={sheet.frontImage} alt={`Page ${sheet.frontIndex + 1}`} /> : <div className="blank-page" />}
                                <div className="page-number">{sheet.frontIndex + 1}</div>
                            </div>
                        </div>
                        <div className="leaf-face leaf-back">
                            <div className="page-content">
                                {sheet.backImage ? <img src={sheet.backImage} alt={`Page ${sheet.backIndex + 1}`} /> : <div className="blank-page" />}
                                <div className="page-number">{sheet.backIndex + 1}</div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Visual spine overlay for 3D realism */}
            <div className="book-spine-overlay" />
        </motion.div>
    );

    return (
        <div className="era-book-container">
            <motion.div
                className="book-wrapper"
                layout
            >
                <div className="book-frame">
                    <BookContent />
                </div>

                <div className="book-controls">
                    <button
                        className="book-nav prev"
                        onClick={(e) => { e.stopPropagation(); prevSpread(); }}
                        disabled={currentSpread === 0}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <span className="book-indicator">
                        Spread {currentSpread + 1} of {totalSpreads}
                    </span>
                    <button
                        className="book-nav next"
                        onClick={(e) => { e.stopPropagation(); nextSpread(); }}
                        disabled={currentSpread === totalSpreads - 1}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default EraBookLayout;
