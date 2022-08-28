import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react'
import LoadingSpinner from "../../components/LoadingSpinner";
import CategoryProductInfoListItem from "../../components/category_product_infos/CategoryProductInfoListItem";

export default function CategoryProductInfos() {
    const links_data = [
        {
            "link_to": "/",
            "link_text": "Main"
        },
        {
            "link_to": "/category_product_infos/upsert/-1",
            "link_text": "New Category Product Info"
        }
    ]

    const [isLoading, setIsLoading] = useState(true);
    const [categoryProductInfos, setCategoryProductInfos] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            console.log("started data fetch")

            const options = { method: 'GET' };

            let response = await fetch(`http://localhost:3000/category_product_infos`, options)
            let data = await response.json()
            console.log(data)
            if (response.ok === true) {
                setCategoryProductInfos(data)
                setIsLoading(false)
            } else {
                setError(`Unable to fetch details about products, please refresh the page. Details: ${data}`)
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
                Products
            </h1>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="flex justify-center">
                    <div className="flex">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>Category Id</th>
                                    <th>Product Id</th>
                                    <th>Values</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                {categoryProductInfos.map((category_product_info) => (
                                    <CategoryProductInfoListItem category_product_info={category_product_info} key={category_product_info.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div>
                {error}
            </div>
        </div>
    );
}