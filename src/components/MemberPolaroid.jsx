import React from 'react';
import { motion } from 'framer-motion';
import { getMemberImage } from '../utils/assets';

const MemberPolaroid = ({ member, era, index, onClick }) => {

    const handleInteraction = () => {
        // Vibrate API for tactile feedback
        if (typeof window !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50); // 50ms subtle vibration
        }
        onClick();
    };

    // Stagger animation based on index
    return (
        <motion.div
            className="member-polaroid"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={handleInteraction}
            whileHover={{ y: -10, scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="m-polaroid-image">
                <img
                    src={getMemberImage(era.id, member)}
                    alt={member}
                    loading="lazy"
                />
            </div>
            <div className="m-polaroid-caption">
                <span className="member-name">{member}</span>
            </div>
        </motion.div>
    );
};

export default MemberPolaroid;
