import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Categories from "./routes/categories/categories";
import ShowCategory from './routes/categories/ShowCategory';
import UpsertCategory from './routes/categories/UpsertCategory';
import Products from "./routes/products/products";
import ShowProduct from './routes/products/ShowProduct';
import UpsertProduct from './routes/products/UpsertProduct';
import CategoryProductInfos from './routes/category_product_infos/category_product_infos';
import ShowCategoryProductInfo from './routes/category_product_infos/ShowCategoryProductInfo';
import UpsertCategoryProductInfo from './routes/category_product_infos/UpsertCategoryProductInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category_product_infos" element={<CategoryProductInfos />} />
        <Route path="/products/upsert/:id" element={<UpsertProduct />} />
        <Route path="/products/show/:id" element={<ShowProduct />} />
        <Route path="/categories/upsert/:id" element={<UpsertCategory />} />
        <Route path="/categories/show/:id" element={<ShowCategory />} />
        <Route path="/category_product_infos/upsert/:id" element={<UpsertCategoryProductInfo />} />
        <Route path="/category_product_infos/show/:id" element={<ShowCategoryProductInfo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
