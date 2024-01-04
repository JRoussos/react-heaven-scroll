import React, { useEffect, useRef, useCallback, useContext, useState, useLayoutEffect } from "react";
import useResizeObserver from '@react-hook/resize-observer'; 

function useObserverSize( element ) {
    const [ size, setSize ] = useState()
      
    useLayoutEffect(() => {
        element && setSize( element.getBoundingClientRect() )
    }, [ element ])
    
    useResizeObserver( element, entry => setSize(entry.contentRect) )
    return size
}

const Heaven = React.createContext()
/**
 * A React hook to access the current scoll value and delta
 * 
 * @returns Object { delta: 0, scroll: 0 }
 */
export const useHeaven = () => useContext(Heaven)

const clamp = value => Math.max(Math.min(value, 1), 0)

/**
 *  A React context provider that enables smooth scroll on its children.
 *
 *  @param style        Style object to overide the default styling of the parent element.
 *  @param disable      Whether or not the scroll effect will be enabled.
 *  @param velocity     A value from 0 to 1 that determines the strength of the effect.
 *  @param rootId       The id of the root component to hard set the height.
 *  @param resetHeight  An array of dependencies to listen for height resetting.
 */
const HeavenScroll = ({ children, style={}, resetHeight=[], disable=false, velocity=0.1, rootId='root' }) => {
    const scrollableContainerRef = useRef(null)
    const SCROLL_ID = useRef(null)

    const {current: config} = useRef({ velocity: clamp(velocity), current: 0, previous: 0, requestScrollEvent: 0 })
    const {current: heaven} = useRef({ delta: 0, scroll: 0 })

    const obSize = useObserverSize(document.getElementById('scrollableContainer'))

    const setScrollerHeight = useCallback(() => {
        const { height } = scrollableContainerRef.current.getBoundingClientRect()
        document.getElementById(rootId).style.height = `${height}px`
    }, [])

    const smoothScrollingHandler = useCallback(() => {
        config.current = window.scrollY
        const DELTA_SCROLL = (config.current - config.previous) * config.velocity

        config.previous += DELTA_SCROLL

        if (Math.abs(config.current - config.previous) < 0.05) {
            config.previous = config.current
            config.requestScrollEvent = 0
        }

        heaven.delta  = DELTA_SCROLL
        heaven.scroll = config.previous + DELTA_SCROLL

        scrollableContainerRef.current.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -${config.previous}, 0, 1)`

        SCROLL_ID.current = config.requestScrollEvent > 0 ? requestAnimationFrame(smoothScrollingHandler) : null
    }, [SCROLL_ID])

    const scrollHandler = useCallback(() => {
        config.requestScrollEvent++;
        if (!SCROLL_ID.current) SCROLL_ID.current = requestAnimationFrame(smoothScrollingHandler)
    }, [SCROLL_ID, smoothScrollingHandler])

    useEffect(() => {
        if (disable) return

        window.addEventListener('scroll', scrollHandler)
        return () => window.removeEventListener('scroll', scrollHandler)
    }, [scrollHandler]);

    useEffect(() => {
        if (disable) return 

        setScrollerHeight()
        return () => document.getElementById('root').removeAttribute('style')
    }, [obSize, ...resetHeight])

    return disable ? children : (
        <Heaven.Provider value={heaven}>
            <div style={{ position: 'fixed', overflow: 'hidden', height: '100%', width: '100%', ...style }}>
                <main id="scrollableContainer" ref={scrollableContainerRef} style={{ willChange: "transform" }}>{children}</main>
            </div>
        </Heaven.Provider>
    )
}

export default HeavenScroll