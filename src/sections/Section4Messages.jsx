import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import bgImg from '../assets/img/then&now.png';
import './Section4Messages.css';

const Section4Messages = () => {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() && message.trim()) {
            setIsSubmitting(true);
            try {
                await addDoc(collection(db, 'messages'), {
                    name: name.trim(),
                    text: message.trim(),
                    createdAt: serverTimestamp()
                });
                setName('');
                setMessage('');
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Failed to send message. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <section
            id="section-messages"
            className="observe-section section-messages"
            data-era="outro"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="messages-content">
                <motion.div
                    className="messages-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Letters to H2H</h2>
                    <p>Read what fellow S2U members have to say</p>
                </motion.div>

                {/* Scrollable Message Feed */}
                <motion.div
                    className="message-feed-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="message-feed">
                        {messages.map((msg) => (
                            <div key={msg.id} className="feed-item">
                                <div className="feed-header">
                                    <span className="feed-name">{msg.name}</span>
                                    <span className="feed-date">
                                        {msg.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || 'Sending...'}
                                    </span>
                                </div>
                                <p className="feed-text">{msg.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="divider-line"></div>

                {/* Submission Form */}
                <motion.div
                    className="message-compose"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <h3>Leave a Message</h3>
                    <form onSubmit={handleSubmit} className="compose-form">
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Your Name / S2U Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={30}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <textarea
                                placeholder="Write your heartfelt message to the members..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                maxLength={300}
                                rows={4}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Letter'}
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export default Section4Messages;
