import React from 'react'
import HeavenScroll from 'react-heaven-scroll'

import Lorems from './lorems'
import Marquee from './marquee'

function App() {
    return (
        <HeavenScroll velocity={0.06}>
            <div className='container'>
                <h1>react-heaven-scroll</h1>
                <Lorems paragraphs={7} />
                <Marquee text={'on scroll it goes broom..'} />
                <Lorems paragraphs={7} />
            </div>
        </HeavenScroll>
    )
}

export default App
