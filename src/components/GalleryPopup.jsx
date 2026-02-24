import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMemberGalleryImages } from '../utils/assets';
import './GalleryPopup.css';

const GalleryPopup = ({ member, era, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Get actual or placeholder images for the gallery
    const images = getMemberGalleryImages(era.id, member);
    const totalPhotos = images.length;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPhotos);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
    };

    return (
        <motion.div
            className="gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <button className="close-btn" onClick={onClose} aria-label="Close Gallery">
                <X size={32} />
            </button>

            <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
                <div className="gallery-header">
                    <h3>{member}</h3>
                    <p>{era.title} Era</p>
                </div>

                <div className="gallery-slider">
                    <button className="nav-btn prev" onClick={handlePrev}><ChevronLeft size={32} /></button>

                    <div className="slider-track">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={images[currentIndex]}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                alt={`${member} photo ${currentIndex + 1}`}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = offset.x;
                                    if (swipe < -50) {
                                        handleNext();
                                    } else if (swipe > 50) {
                                        handlePrev();
                                    }
                                }}
                            />
                        </AnimatePresence>
                    </div>

                    <button className="nav-btn next" onClick={handleNext}><ChevronRight size={32} /></button>
                </div>

                <div className="gallery-indicators">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`indicator ${i === currentIndex ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default GalleryPopup;
