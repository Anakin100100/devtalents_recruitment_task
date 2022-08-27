import React from 'react'
import EditProductForm from '../../components/products/EditProductForm';
import NewProductForm from '../../components/products/NewProductFrom';
import { useParams } from "react-router-dom";

const UpsertProduct = () => {
    let params = useParams();

    console.log(params)
    if (params["id"] === "-1") {
        return <NewProductForm />
    } else {
        return <EditProductForm product_id={params["id"]} />
    }
}

export default UpsertProduct