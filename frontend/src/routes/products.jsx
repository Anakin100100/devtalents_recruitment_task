import ButtonList from "../components/ButtonList";
import Header from "../components/Header";

export default function Products() {
    let links_data = [
        {
            "link_to": "/",
            "link_text": "Main"
        }
    ]

    return (
        <div>
            <Header />
            <ButtonList links={links_data} />
            <div>
                <h2 className="text-center">Products</h2>
            </div>
        </div>
    );
}