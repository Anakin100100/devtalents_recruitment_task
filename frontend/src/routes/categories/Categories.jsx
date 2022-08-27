import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react'
import LoadingSpinner from "../../components/LoadingSpinner";
import CategoryListItem from "../../components/categories/CategoryListItem";

export default function Categories() {
    const links_data = [
        {
            "link_to": "/",
            "link_text": "Main"
        },
        {
            "link_to": "/categories/upsert/-1",
            "link_text": "New Category"
        }
    ]

    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            console.log("started data fetch")

            const options = { method: 'GET' };

            let response = await fetch(`http://localhost:3000/categories`, options)
            let data = await response.json()
            console.log(data)
            if (response.ok === true) {
                setCategories(data)
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
                Categories
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
                                    <th>ParentCategoryId</th>
                                    <th>Name</th>
                                    <th>Schema</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                {categories.map((category) => (
                                    <CategoryListItem category={category} key={category.id} />
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