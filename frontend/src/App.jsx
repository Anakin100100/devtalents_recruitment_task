import ButtonList from "./components/ButtonList";
import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  const links_data = [
    {
      link_to: "/categories",
      link_text: "Categories",
    },
    {
      link_to: "/products",
      link_text: "Products",
    },
    {
      link_to: "/category_product_infos",
      link_text: "Product Category Infos",
    },
  ];

  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let current_id = currentCategoryId;
      if (currentCategoryId === 0) {
        console.log("started data fetch");

        const current_category_request_options = { method: "GET" };

        let current_category_request_response = await fetch(
          `http://localhost:3000/get_root_category_id`,
          current_category_request_options
        );
        let current_category_request_data =
          await current_category_request_response.json();
        console.log("response data");
        console.log(current_category_request_data.id.id);
        setCurrentCategoryId(current_category_request_data.id.id);
        current_id = current_category_request_data.id.id;
        setCurrentCategoryName(current_category_request_data.id.name);
      }

      setHistory([...history, currentCategoryId]);

      const options = { method: "GET" };
      let response = await fetch(
        `http://localhost:3000/categories/get_sub_categories/${current_id}`,
        options
      );
      let data = await response.json();
      console.log("categories:");
      console.log(data);
      setCategories(data);

      const products_options = { method: "GET" };

      let products_response = await fetch(
        `http://localhost:3000/get_products_from_a_category_and_all_subcategories/${current_id}`,
        products_options
      );
      let products_data = await products_response.json();
      console.log("products:");
      console.log(products_data);
      setProducts(products_data);

      setIsLoading(false);
    };

    fetchData();
  }, [currentCategoryId]);

  return (
    <div>
      <Header />
      <ButtonList links={links_data} />
      <div className="flex flex-grow mt-4">
        <div className="flex bg-cyan-200 w-1/4">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex items-center flex-col flex-grow">
              <div className="flex">
                <button
                  onClick={() => {
                    console.log("history");
                    console.log(history);
                    let previous_category_id = history[history.length - 2];
                    console.log(
                      `previous category id: ${previous_category_id}`
                    );
                    setHistory(history.slice(0, -1));
                    setCurrentCategoryId(previous_category_id);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Go Back
                </button>
              </div>
              <div className="flex">
                <p>Current category: {currentCategoryName}</p>
              </div>
              <div className="flex">
                <p>Sub Categories:</p>
              </div>
              {categories.map((category) => (
                <div className="flex" key={category.id}>
                  <button
                    onClick={() => {
                      setCurrentCategoryId(category.id);
                    }}
                    className="font-bold"
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex bg-cyan-400 w-3/4 justify-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex">
              <table>
                <tbody>
                  <tr>
                    <th>Id</th>
                    <th>CategoryId</th>
                    <th>Name</th>
                  </tr>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <th>{product.id}</th>
                      <th>{product.category_id}</th>
                      <th>{product.name}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
