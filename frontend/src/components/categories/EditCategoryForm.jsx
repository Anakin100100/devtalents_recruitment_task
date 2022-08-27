import React, { useState, useEffect } from 'react'
import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../LoadingSpinner';

const EditCategoryForm = (props) => {
    const links_data = [
        {
            "link_to": "/",
            "link_text": "Main"
        },
        {
            "link_to": "/categories",
            "link_text": "Categories"
        }
    ]

    const [id, ,] = useState(props.category_id)
    const [name, setName] = useState("")
    const [parent_category_id, setParentCategoryId] = useState("")
    const [schema, setSchema] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const submitCategory = async () => {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: `{"schema":${schema},"name":"${name}","parent_category_id":${parent_category_id}}`
        };

        let response = await fetch(`http://localhost:3000/categories/${id}`, options)
        if (response.ok === true) {
            response = await response.json()
            console.log(response)
            navigate("/categories");
        } else {
            console.log(response)
            const data = await response.json();
            setError(`Errors encountered, malformed input. Details: ${JSON.stringify(data)}`)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitCategory();
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log("started data fetch")

            const options = { method: 'GET' };

            let response = await fetch(`http://localhost:3000/categories/${id}`, options)
            let data = await response.json()
            console.log(data)
            if (response.ok === true) {
                setSchema(JSON.stringify(data.schema))
                setName(data.name)
                setParentCategoryId(data.parent_category_id)
                setIsLoading(false)
            } else {
                setError(`Unable to fetch details about category, please refresh the page. Details: ${data}`)
                setIsLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <ButtonList links={links_data} />
            <h1 className='text-center my-4 font-bold'>
                Edit Category
            </h1>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex items-center justify-center">
                    <div className='flex bg-green-400 border-2 border-gray-600 rounded-xl '>
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Schema</label>
                                <div>
                                    <input
                                        placeholder="Enter schema"
                                        value={schema}
                                        onChange={(e) => setSchema(e.target.value)}
                                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <div>
                                    <input
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Parent Category Id</label>
                                <div>
                                    <input
                                        placeholder="Enter Parent Category Id"
                                        value={parent_category_id}
                                        onChange={(e) => setParentCategoryId(e.target.value)}
                                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <div className='flex'>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold mt-4 px-4 rounded" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </div>
                            <div>
                                {error}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditCategoryForm