import React from 'react'
import { Link } from "react-router-dom";


const Button = (props) => {
    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                <Link to={props.link_to}>{props.link_text}</Link>
            </button>
        </div>
    )
}

export default Button