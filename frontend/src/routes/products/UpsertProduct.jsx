import React from 'react'
import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";

const UpsertProduct = () => {
    const links_data = [
        {
            "link_to": "/products",
            "link_text": "Products"
        }
    ]

    return (
        <div>
            <Header />
            <ButtonList links={links_data} />
            <div>
                <h2 className="text-center">UpsertProduct</h2>
            </div>
        </div>
    );
}

export default UpsertProduct