import React from 'react'
import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";

const UpsertCategory = () => {
    let links_data = [
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
                UpsertCategory
            </div>
        </div>
    )
}

export default UpsertCategory