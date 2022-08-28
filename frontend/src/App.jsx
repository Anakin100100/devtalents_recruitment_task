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
  const [firstFilterField, setFirstFilterField] = useState("");
  const [firstFilterOperator, setFirstFilterOperator] = useState("");
  const [firstFilterValue, setFirstFilterValue] = useState("");
  const [secondFilterField, setSecondFilterField] = useState("");
  const [secondFilterOperator, setSecondFilterOperator] = useState("");
  const [secondFilterValue, setSecondFilterValue] = useState("");
  const [thirdFilterField, setThirdFilterField] = useState("");
  const [thirdFilterOperator, setThirdFilterOperator] = useState("");
  const [thirdFilterValue, setThirdFilterValue] = useState("");
  const [filtersError, setFiltersError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("using use effect");
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
              <div className="flex">
                <p>Filters:</p>
              </div>
              <div>
                <table>
                  <tbody>
                    <tr>
                      <th>Field</th>
                      <th>Operator</th>
                      <th>Value</th>
                    </tr>
                    <tr>
                      <th>
                        <input
                          value={firstFilterField}
                          onChange={(e) => setFirstFilterField(e.target.value)}
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                      <th>
                        <input
                          value={firstFilterOperator}
                          onChange={(e) =>
                            setFirstFilterOperator(e.target.value)
                          }
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                      <th>
                        <input
                          value={firstFilterValue}
                          onChange={(e) => setFirstFilterValue(e.target.value)}
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <input
                          value={secondFilterField}
                          onChange={(e) => setSecondFilterField(e.target.value)}
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                      <th>
                        <input
                          value={secondFilterOperator}
                          onChange={(e) =>
                            setSecondFilterOperator(e.target.value)
                          }
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                      <th>
                        <input
                          value={secondFilterValue}
                          onChange={(e) => setSecondFilterValue(e.target.value)}
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <input
                          value={thirdFilterField}
                          onChange={(e) => setThirdFilterField(e.target.value)}
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                      <th>
                        <input
                          value={thirdFilterOperator}
                          onChange={(e) =>
                            setThirdFilterOperator(e.target.value)
                          }
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                      <th>
                        <input
                          value={thirdFilterValue}
                          onChange={(e) => setThirdFilterValue(e.target.value)}
                          className="shadow appearance-none border border-red-500 rounded w-full py-1 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex">
                <button
                  onClick={async () => {
                    const products_options = {
                      method: "GET",
                      body: {
                        filters: [
                          {
                            field: firstFilterField,
                            operator: firstFilterOperator,
                            value: firstFilterValue,
                          },
                          {
                            field: secondFilterField,
                            operator: secondFilterOperator,
                            value: secondFilterValue,
                          },
                          {
                            field: thirdFilterField,
                            operator: thirdFilterOperator,
                            value: thirdFilterValue,
                          },
                        ],
                      },
                    };
                    let products_response = await fetch(
                      `http://localhost:3000/get_products_from_a_category_and_all_subcategories/${currentCategoryId}`,
                      products_options
                    );
                    let products_data = await products_response.json();
                    if (products_response.ok === true) {
                      console.log("products:");
                      console.log(products_data);
                      setProducts(products_data);
                    } else {
                      setFiltersError(products_data);
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Apply Filters
                </button>
              </div>
              <div className="flex">
                <p>{filtersError}</p>
              </div>
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
                    <th>Values</th>
                  </tr>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <th>{product.id}</th>
                      <th>{product.category_id}</th>
                      <th>{product.name}</th>
                      <th>
                        {((product) => {
                          let values = [];
                          console.log(product);
                          product.category_product_infos.forEach((element) => {
                            for (const [key, value] of Object.entries(
                              JSON.parse(element.values)
                            )) {
                              values.push(`"${key}":"${value}"`);
                            }
                          });
                          return values.join("\n");
                        })(product)}
                      </th>
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
