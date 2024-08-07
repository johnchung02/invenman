import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Item() {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect (() => {
        async function getItem() {
            const response = await fetch (`http://localhost:5050/inventory/item/${id}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const item = await response.json();
            setItem(item);
        }
        getItem();
        return;
    }, [id]);

    if (item === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {item.name}
        </div>
    );
}