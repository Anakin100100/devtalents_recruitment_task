import ButtonList from "./components/ButtonList";
import Header from "./components/Header";
export default function App() {
  let links_data = [
    {
      "link_to": "/categories",
      "link_text": "Categories"
    },
    {
      "link_to": "/products",
      "link_text": "Products"
    },
    {
      "link_to": "/product_category_infos",
      "link_text": "Product Category Infos"
    }
  ]

  return (
    <div>
      <Header />
      <ButtonList links={links_data} />
    </div>
  );
}