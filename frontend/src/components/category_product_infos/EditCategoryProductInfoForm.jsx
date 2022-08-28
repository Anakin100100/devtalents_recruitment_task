import React, { useState, useEffect } from 'react'
import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../LoadingSpinner';


const EditCategoryProductInfoForm = (props) => {
    const links_data = [
        {
            "link_to": "/",
            "link_text": "Main"
        },
        {
            "link_to": "/category_product_infos",
            "link_text": "Category Product Infos"
        }
    ]

    const [id, ,] = useState(props.category_product_info_id)
    const [values, setValues] = useState("")
    const [category_id, setCategoryId] = useState("")
    const [product_id, setProductId] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const submitCategoryProductInfo = async () => {
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: `{"category_id":"${category_id}","values":${values},"product_id":${product_id}}`
        };

        let response = await fetch(`http://localhost:3000/category_product_infos/${id}`, options)
        if (response.ok === true) {
            response = await response.json()
            console.log(response)
            navigate("/category_product_infos");
        } else {
            console.log(response)
            const data = await response.json();
            setError(`Errors encountered, malformed input. Details: ${JSON.stringify(data)}`)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitCategoryProductInfo();
    };

    useEffect(() => {
        const fetchData = async () => {
            console.log("started data fetch")

            const options = { method: 'GET' };

            let response = await fetch(`http://localhost:3000/category_product_infos/${id}`, options)
            let data = await response.json()
            console.log(data)
            if (response.ok === true) {
                setCategoryId(data.category_id)
                setProductId(data.product_id)
                setValues(JSON.stringify(data.values))
                setIsLoading(false)
            } else {
                setError(`Unable to fetch details about category product info, please refresh the page. Details: ${data}`)
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
                Edit Category Product Info
            </h1>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex items-center justify-center">
                    <div className='flex bg-green-400 border-2 border-gray-600 rounded-xl '>
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Category Id</label>
                                <div>
                                    <input
                                        placeholder="Enter Parent Category Id"
                                        value={category_id}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Product Id</label>
                                <div>
                                    <input
                                        placeholder="Enter Product Id"
                                        value={product_id}
                                        onChange={(e) => setProductId(e.target.value)}
                                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Values</label>
                                <div>
                                    <input
                                        placeholder="Enter Values"
                                        value={values}
                                        onChange={(e) => setValues(e.target.value)}
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

export default EditCategoryProductInfoForm