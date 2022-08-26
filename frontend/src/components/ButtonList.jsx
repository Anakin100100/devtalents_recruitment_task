import React from 'react'
import Button from './Button'

const ButtonList = (props) => {
    return (
        <div className='flex flex-row justify-center items-center mt-4 space-x-2'>
            {props.links.map((link) => (
                <Button link_to={link.link_to} link_text={link.link_text} key={link.link_to} />
            ))}
        </div>
    )
}

export default ButtonList