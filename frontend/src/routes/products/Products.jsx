import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";
import React, { useState, useEffect } from 'react'
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductListItem from "../../components/products/ProductListItem";

export default function Products() {
    const links_data = [
        {
            "link_to": "/",
            "link_text": "Main"
        },
        {
            "link_to": "/products/upsert/-1",
            "link_text": "New Product"
        }
    ]

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            console.log("started data fetch")

            const options = { method: 'GET' };

            let response = await fetch(`http://localhost:3000/products`, options)
            let data = await response.json()
            console.log(data)
            if (response.ok === true) {
                setProducts(data)
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
                                    <th>CategoryId</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                {products.map((product) => (
                                    <ProductListItem product={product} key={product.id} />
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