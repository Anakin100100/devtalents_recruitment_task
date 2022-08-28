import React from 'react'
import { useNavigate } from "react-router-dom";

const CategoryProductInfoListItem = (props) => {
    const navigate = useNavigate();

    const deleteCategoryProductInfo = async () => {
        console.log(`deleting category product info with id ${props.category_product_info.id}`)
        const options = { method: 'DELETE' };

        let response = await fetch(`http://localhost:3000/category_product_infos/${props.category_product_info.id}`, options)
        let data = response.json()
        console.log(`data is ${data} and the response status is ${response.status}`)

        window.location.reload(true);
    }

    const editCategoryProductInfo = () => {
        navigate(`/category_product_infos/upsert/${props.category_product_info.id}`)
    }

    return (
        <tr>
            <th>{props.category_product_info.id}</th>
            <th>{props.category_product_info.category_id}</th>
            <th>{props.category_product_info.product_id}</th>
            <th>{props.category_product_info.values}</th>
            <th>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={editCategoryProductInfo}>
                    Edit
                </button>
            </th>
            <th>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={deleteCategoryProductInfo}>
                    Delete
                </button>
            </th>
        </tr>
    )
}

export default CategoryProductInfoListItem