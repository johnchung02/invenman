import { useState } from "react";

export default function Inventory() {
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [items, setItems] = useState([]);

    const listItems = items.map((item, index) => (
        <li key={index}>
            {item.name} - {item.quantity} - {item.price}
        </li>
    )); 

    function addItem(event) {
        event.preventDefault();

        const newItem = {
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
        };

        setItems([...items, newItem]);
    }

    return (
        <div>
            <form onSubmit={addItem}>
                <input  type="text" 
                        placeholder='name' 
                        onChange={(ev) => setItemName(ev.target.value)}
                />
                <input  type="text" 
                        placeholder='quant' 
                        onChange={(ev) => setItemQuantity(ev.target.value)}
                />
                <input  type="text" 
                        placeholder='price' 
                        onChange={(ev) => setItemPrice(ev.target.value)}
                />
                <button type="submit">add</button>
            </form>
            <ul>
                {listItems}
            </ul>
        </div>
    );
}