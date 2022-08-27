import ButtonList from "../../components/ButtonList";
import Header from "../../components/Header";

export default function Categories() {
    const links_data = [
        {
            "link_to": "/",
            "link_text": "Main"
        },
        {
            "link_to": "/categories/upsert/-1",
            "link_text": "New Category"
        }
    ]

    return (
        <div>
            <Header />
            <ButtonList links={links_data} />
            <div>
                <h2 className="text-center">Categories</h2>
            </div>
        </div>
    );
}