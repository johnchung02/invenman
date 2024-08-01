import { useState } from "react";

import ItemCard from './ItemCard';

export default function Inventory() {
    const [searchName, setSearchName] = useState('');
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [items, setItems] = useState([]);
    const [listView, setListView] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let result = await fetch(
            ''
        )

    }

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
            <div>
                <form onSubmit={handleSubmit}>
                    <input  type='text'
                            placeholder='입력'
                            onChange={ev => setSearchName(ev.target.value)}/>
                    <button>검색</button>
                </form>
            </div>
            
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
            
            {listView?.length > 0 ? 
            (
                <div>
                    {listView.map((item) => (
                        <button>
                            <ItemCard item={item} />
                        </button>
                    ))}
                </div>
            ) : 
            (
                <div>
                    <h2>Add Item</h2>
                </div>
            )}
        </div>
    );
}