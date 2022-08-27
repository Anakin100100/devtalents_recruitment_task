import React from 'react'
import { useNavigate } from "react-router-dom";

const ProductListItem = (props) => {
    const navigate = useNavigate();

    const deleteProduct = async () => {
        console.log(`deleting product with id ${props.product.id}`)
        const options = { method: 'DELETE' };

        let response = await fetch(`http://localhost:3000/products/${props.product.id}`, options)
        let data = response.json()
        console.log(`data is ${data} and the response status is ${response.status}`)

        window.location.reload(true);
    }

    const editProduct = () => {
        navigate(`/products/upsert/${props.product.id}`)
    }

    return (
        <tr>
            <th>{props.product.id}</th>
            <th>{props.product.category_id}</th>
            <th>{props.product.name}</th>
            <th>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={editProduct}>
                    Edit
                </button>
            </th>
            <th>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={deleteProduct}>
                    Delete
                </button>
            </th>
        </tr>
    )
}

export default ProductListItem