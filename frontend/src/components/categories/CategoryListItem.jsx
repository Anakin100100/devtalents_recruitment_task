import React from 'react'
import { useNavigate } from "react-router-dom";

const CategoryListItem = (props) => {
    const navigate = useNavigate();

    const deleteCategory = async () => {
        console.log(`deleting category with id ${props.category.id}`)
        const options = { method: 'DELETE' };

        let response = await fetch(`http://localhost:3000/categories/${props.category.id}`, options)
        let data = response.json()
        console.log(`data is ${data} and the response status is ${response.status}`)

        window.location.reload(true);
    }

    const editCategory = () => {
        navigate(`/categories/upsert/${props.category.id}`)
    }

    return (
        <tr>
            <th>{props.category.id}</th>
            <th>{props.category.parent_category_id}</th>
            <th>{props.category.name}</th>
            <th>{props.category.schema}</th>
            <th>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={editCategory}>
                    Edit
                </button>
            </th>
            <th>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={deleteCategory}>
                    Delete
                </button>
            </th>
        </tr>
    )
}

export default CategoryListItem