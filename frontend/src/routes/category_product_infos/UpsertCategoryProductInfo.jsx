import React from 'react'
import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";

const UpsertCategoryProductInfo = () => {
    const links_data = [
        {
            "link_to": "/category_product_infos",
            "link_text": "Category Product Infos"
        }
    ]

    return (
        <div>
            <Header />
            <ButtonList links={links_data} />
            <div>
                <h2 className="text-center">UpsertCategoryProductInfos</h2>
            </div>
        </div>
    )
}

export default UpsertCategoryProductInfo