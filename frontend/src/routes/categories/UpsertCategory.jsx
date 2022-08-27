import React from 'react'
import NewCategoryForm from '../../components/categories/NewCategoryForm';
import EditCategoryForm from '../../components/categories/EditCategoryForm';
import { useParams } from "react-router-dom";

const UpsertCategory = () => {
    let params = useParams();

    console.log(params)
    if (params["id"] === "-1") {
        return <NewCategoryForm />
    } else {
        return <EditCategoryForm category_id={params["id"]} />
    }
}

export default UpsertCategory