import * as React from 'react';
import { Suspense, useState } from 'react';

const CardHover = ({ children, card }) => {
    const [hovering, setHovering] = useState(false);

    function onHover() {
        setHovering(true);
    }

    function offHover() {
        setHovering(false);
    }

    return (
        <div 
            className="relative"
            onMouseEnter={onHover}
            onMouseLeave={offHover}
        >
            {children}
            {
                hovering ? 
                <div className="absolute top-full z-50">
                    <div className="fixed max-w-2xl" onMouseEnter={offHover}>
                        <img src={card.image} alt={card.name} />
                    </div>
                </div>
                : <div />
            }
        </div>
    )
}

export default CardHover;