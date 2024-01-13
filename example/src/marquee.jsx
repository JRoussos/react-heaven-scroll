import React, { useCallback, useEffect, useRef } from 'react'
import { useHeaven } from 'react-heaven-scroll'

const Marquee = ({ text }) => {
    const animationFrameID = useRef(null)
    const marqueeRef = useRef(null)
    
    const current_position = useRef(0)
    const width = useRef(0)

    const heaven = useHeaven()

    const animate = useCallback(() => {
        if (!marqueeRef.current) return
        animationFrameID.current = requestAnimationFrame(animate)

        current_position.current += 1 + Math.abs(heaven.delta)
        if (current_position.current > width.current ) current_position.current = 0

        marqueeRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -${current_position.current}, 0, 0, 1)`
    }, [heaven])

    
    useEffect(() => {
        const initializePositions = () => {
            width.current = marqueeRef.current.clientWidth/2
        }
        
        window.addEventListener('resize', initializePositions)
        setTimeout(initializePositions, 100)
        
        animate()

        return () => {
            window.removeEventListener('resize', initializePositions)
            cancelAnimationFrame(animationFrameID.current)
        }
    }, [animate])

    return (
        <div className='marquee-container'>
            <div ref={marqueeRef} className='marquee'>
                <h1>{`${text} 🏎️ `}&nbsp;</h1>
                <h1>{`${text} 🏎️ `}&nbsp;</h1>
                <h1>{`${text} 🏎️ `}&nbsp;</h1>
                <h1>{`${text} 🏎️ `}&nbsp;</h1>
                <h1>{`${text} 🏎️ `}&nbsp;</h1>
                <h1>{`${text} 🏎️ `}&nbsp;</h1>
            </div>
        </div>
    )
}

export default Marquee;