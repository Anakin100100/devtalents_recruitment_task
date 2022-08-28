import React from 'react'
import NewCategoryProductInfoForm from '../../components/category_product_infos/NewCategoryProductInfoForm';
import EditCategoryProductInfoForm from '../../components/category_product_infos/EditCategoryProductInfoForm';
import { useParams } from "react-router-dom";

const UpsertCategoryProductInfo = () => {
    let params = useParams();

    console.log(params)
    if (params["id"] === "-1") {
        return <NewCategoryProductInfoForm />
    } else {
        return <EditCategoryProductInfoForm category_product_info_id={params["id"]} />
    }
}

export default UpsertCategoryProductInfo