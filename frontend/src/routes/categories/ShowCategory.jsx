import React from 'react'
import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";

const ShowCategory = () => {
    const links_data = [
        {
            "link_to": "/categories",
            "link_text": "Categories"
        }
    ]

    return (
        <div>
            <Header />
            <ButtonList links={links_data} />
            <div className='text-center'>
                ShowCategory
            </div>
        </div>
    )
}

export default ShowCategory