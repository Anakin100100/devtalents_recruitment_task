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
import Categories from "./routes/categories/Categories";
import UpsertCategory from './routes/categories/UpsertCategory';
import Products from "./routes/products/Products";
import UpsertProduct from './routes/products/UpsertProduct';
import CategoryProductInfos from './routes/category_product_infos/CategoryProductInfos';
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
        <Route path="/categories/upsert/:id" element={<UpsertCategory />} />
        <Route path="/category_product_infos/upsert/:id" element={<UpsertCategoryProductInfo />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
