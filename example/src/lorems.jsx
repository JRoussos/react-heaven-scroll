import React from 'react'
import lorem from './lorem.json'

const Lorems = ({ paragraphs = null }) => {
    return (
        <div className='loremsWrapper'>
            {lorem.slice(0, paragraphs).map(paragraph => <p key={paragraph.id}>{paragraph.text}</p>)}
        </div>
    )
}

export default Lorems