import React from 'react';
import { motion } from 'framer-motion';
import { getEraCoverImage } from '../utils/assets';
import endImg from '../assets/img/end.jpg';
import imgShowcase from '../assets/img/hall_of_fame/first_showcase.jpg';
import imgSMTown from '../assets/img/hall_of_fame/first_smtown_perform_mexico.jpg';
import imgMama from '../assets/img/hall_of_fame/mama_awards_2025.jpg';
import imgMma from '../assets/img/hall_of_fame/mma_awards_2025.jpg';
import imgGda from '../assets/img/hall_of_fame/gda_awards.jpg';
import './Section3Wrapped.css';

const milestones = [
    {
        date: "February 24, 2025",
        title: "Debut Fan Showcase",
        desc: "Hearts2Hearts (H2H), formed by SM Entertainment, held their debut fan showcase, 'Chase Our Hearts', to mark the release of their first single album, 'The Chase'.",
        img: imgShowcase
    },
    {
        date: "May 9, 2025",
        title: "First SMTOWN Perform",
        desc: "The girls took the global stage at SMTOWN LIVE 2025, held at the massive Estadio GNP Seguros in Mexico City.",
        img: imgSMTown
    },
    {
        date: "November 28-29, 2025",
        title: "2025 MAMA Awards",
        desc: "At the 2025 MAMA Awards in Hong Kong, H2H won three major awards: Best New Artist, Fan's Choice Top 10, and Olive Young K-Beauty Artist.",
        img: imgMama
    },
    {
        date: "December 20, 2025",
        title: "17th Melon Music Awards",
        desc: "Held at Gocheok Sky Dome, rookie group Hearts2Hearts made a major impact by winning New Artist of the Year and Global Fan's Choice, performing 'The Chase' and 'FOCUS'.",
        img: imgMma
    },
    {
        date: "January 10, 2026",
        title: "40th Golden Disc Awards",
        desc: "The 40th Golden Disc Awards concluded at the Taipei Dome, Taiwan. Hearts2Hearts received the prestigious Upbit Most Popular Artist Award.",
        img: imgGda
    }
];

const Section3Wrapped = () => {
    return (
        <section
            id="section-wrapped"
            className="observe-section section-wrapped"
            data-era="outro"
        >
            <div className="hall-of-fame-content">
                <motion.div
                    className="wrapped-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Hall of Fame</h2>
                    <p>A Year of Glorious Milestones</p>
                </motion.div>

                <div className="timeline">
                    {milestones.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            style={{ '--rand-rot': (idx % 2 === 0 ? -1 : 1) * (Math.random() * 2 + 1) }}
                        >
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <div className="timeline-img-wrapper">
                                    <div className="tape"></div>
                                    <img src={item.img} alt={item.title} />
                                </div>
                                <div className="timeline-plaque">
                                    <span className="timeline-date">{item.date}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* The Anniversary End Image as requested */}
                <motion.div
                    className="anniversary-end"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src={endImg} alt="Thank You for 1st Year" className="end-image" />
                    <div className="end-message">
                        <h3>Happy 1st Anniversary, Hearts2Hearts!</h3>
                        <p>It's been an incredible 365 days of walking together. S2U promises to shine alongside you in our second year and beyond. Let's stay together for a long, long time.</p>
                        <p className="signature">- With Love, S2U</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Section3Wrapped;
