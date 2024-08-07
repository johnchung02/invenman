import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Item = (props) => (
    <div className="flex">
        {props.item.name}
        {props.item.company}
        <Link to={`/inventory/item/${props.item._id}`}>
            배송 추가
        </Link>
    </div>
);

export default function ItemList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([]);

    useEffect (() => {
        if (items.length === 0 && searchTerm.length === 0) {
            async function getItems() {
                const response = await fetch (`http://localhost:5050/inventory/`)
                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    console.error(message);
                    return;
                }
                const items = await response.json();
                setItems(items);
            }
            getItems();
            return;
        }
    }, [items]);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch (`http://localhost:5050/inventory/${searchTerm}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return;
        }
        const items = await response.json();
        setItems(items);
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input  type='text'
                            placeholder='입력'
                            onChange={ev => setSearchTerm(ev.target.value)}/>
                    <button>검색</button>
                </form>
            </div>
            {items?.length > 0 ? 
            (
                <div>
                    {items.map((item) => (
                        <div key={item._id}>
                            <button>
                                <Item item={item} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : 
            (
                <div>
                    <h2>Nothing ...</h2>
                </div>
            )}
        </div>
    );
}