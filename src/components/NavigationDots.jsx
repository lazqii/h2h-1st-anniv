import React from 'react';
import './NavigationDots.css';

const NavigationDots = ({ currentEra, eras }) => {
    return (
        <div className="nav-dots">
            <div
                className={`dot ${currentEra === 'predebut' ? 'active' : ''}`}
                title="Pre-Debut"
            />
            {eras.map(era => (
                <div
                    key={era.id}
                    className={`dot ${currentEra === era.id ? 'active' : ''}`}
                    style={{ '--dot-color': currentEra === era.id ? era.colors.accent : 'rgba(255,255,255,0.3)' }}
                    title={era.title}
                />
            ))}
            <div
                className={`dot ${currentEra === 'outro' ? 'active' : ''}`}
                title="Wrapped"
            />
        </div>
    );
};

export default NavigationDots;
