import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemberPolaroid from '../components/MemberPolaroid';
import GalleryPopup from '../components/GalleryPopup';
import EraBookLayout from '../components/EraBookLayout';
import EraCoverflow from '../components/EraCoverflow';
import { getEraCoverImage, getEraOutroImage, getEraPhotoboothImages, getEraBookImages, getEraTeaser2Images, getEraPrettyPleaseImages } from '../utils/assets';
import './Section2TheJourney.css';

const Section2TheJourney = ({ eras }) => {
    const [selectedMember, setSelectedMember] = useState(null);

    // Filter out the intro as it's handled in Section 1
    const journeyEras = eras.filter(era => era.id !== 'intro');

    return (
        <>
            <div className="journey-container">
                {journeyEras.map((era) => (
                    <section
                        key={era.id}
                        id={`era-${era.id}`}
                        className="observe-section era-section"
                        data-era={era.id}
                    >
                        <div className="era-content">
                            {/* Group Polaroid & Title */}
                            <motion.div
                                className="group-polaroid-container"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                            >
                                {era.id === 'cb3' ? (
                                    <EraBookLayout
                                        images={getEraBookImages(era.id)}
                                        title={era.title}
                                    />
                                ) : (
                                    <div
                                        className={`group-polaroid ${era.id === 'cb1' ? 'photobooth' : ''}`}
                                        style={{ cursor: era.id === 'cb2' ? 'default' : 'pointer' }}
                                        onClick={() => era.id !== 'cb2' && setSelectedMember({ member: 'All Members', era })}
                                    >
                                        {era.id === 'cb1' ? (
                                            <div className="photobooth-strip">
                                                {getEraPhotoboothImages(era.id).map((imgUrl, i) => (
                                                    <div key={i} className="polaroid-image pb-img">
                                                        <img src={imgUrl} alt={`${era.title} Photobooth ${i + 1}`} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="polaroid-image">
                                                <img src={getEraCoverImage(era.id)} alt={`${era.title} Group View`} />
                                            </div>
                                        )}
                                        <div className="polaroid-caption">
                                            <h2>{era.title}</h2>
                                            <p>{era.subtitle}</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Transition Quote */}
                            <div className="lyric-quote">
                                <p>"{era.quote}"</p>
                            </div>

                            {/* 2x4 Member Grid */}
                            <div className="members-grid">
                                {era.members.map((member, idx) => (
                                    <MemberPolaroid
                                        key={idx}
                                        member={member}
                                        era={era}
                                        index={idx}
                                        onClick={() => setSelectedMember({ member, era })}
                                    />
                                ))}
                            </div>

                            {/* Additional Coverflow Carousel just for CB2 (Pretty Please) Group Photos */}
                            {era.id === 'cb2' && (
                                <EraCoverflow images={getEraPrettyPleaseImages()} />
                            )}

                            {/* Focus Era All Members Carousel Trigger */}
                            {era.id === 'cb3' && getEraTeaser2Images(era.id).length > 0 && (
                                <motion.div
                                    className="era-outro-image"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-50px" }}
                                    transition={{ duration: 0.8 }}
                                    style={{ marginTop: '3rem', width: '100%', display: 'flex', justifyContent: 'center' }}
                                >
                                    <div
                                        className="group-polaroid"
                                        onClick={() => setSelectedMember({ member: 'All Members', era })}
                                        style={{ cursor: 'pointer', maxWidth: '600px', transform: 'rotate(-2deg)' }}
                                    >
                                        <div className="polaroid-image">
                                            <img src={getEraTeaser2Images(era.id)[1] || getEraTeaser2Images(era.id)[0]} alt="Focus Era All Members" />
                                        </div>
                                        <div className="polaroid-caption">
                                            <h2>All Members</h2>
                                            <p>Focus 1st Mini Album</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Era Outro Photo */}
                            {getEraOutroImage(era.id) && (
                                <motion.div
                                    className="era-outro-image"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <img src={getEraOutroImage(era.id)} alt={`${era.title} Outro`} />
                                </motion.div>
                            )}
                        </div>
                    </section>
                ))}
            </div >

            <AnimatePresence>
                {selectedMember && (
                    <GalleryPopup
                        member={selectedMember.member}
                        era={selectedMember.era}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Section2TheJourney;
