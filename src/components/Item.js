import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Item() {
    const params = useParams();
    const [item, setItem] = useState(null);
    const [form, setForm] = useState({
        price: "",
        quantity: "",
        date: "",
    });
    const allFieldsFilled = form.price && form.quantity && form.date;

    useEffect (() => {
        async function getItem() {
            const response = await fetch (`http://localhost:5050/inventory/item/${params.id}`);
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
    }, [params.id, item]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const delivery = { ...form };
        try {
            let response = await fetch(`http://localhost:5050/inventory/delivery/${params.id}`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(delivery),
            });
            if (!response.ok) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {
            console.error(error);
        }
        setForm({ price: "", quantity: "", date: "" });
    }

    return (
        <div>
            {item ? (
                <>
                    <div className="flex">
                        <div className="w-1/2">
                            {item.name}
                        </div>
                        <form onSubmit={handleSubmit} className="w-1/2 flex flex-col space-y-4">
                            <input  className="border"
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="price"
                                    value={form.price}
                                    onChange={(e) => updateForm({ price: e.target.value })}
                            />
                            <input  className="border"
                                    type="text"
                                    name="quantity"
                                    id="quantity"
                                    placeholder="quantity"
                                    value={form.quantity}
                                    onChange={(e) => updateForm({ quantity: e.target.value })}
                            />
                            <input  className="border"
                                    type="date"
                                    name="date"
                                    id="date"
                                    placeholder="date"
                                    value={form.date}
                                    onChange={(e) => updateForm({ date: e.target.value })}
                            />
                            <button type="submit" disabled={!allFieldsFilled} className="border">New Delivery</button>
                        </form>
                    </div>
                    <div className="border">
                        {item.company}
                        {item.deliveries?.length > 0 ? (
                            item.deliveries.map((delivery, index) => (
                                <div key={index}>
                                    <p>Price: {delivery.price}</p>
                                    <p>Quantity: {delivery.quantity}</p>
                                    <p>Date: {delivery.date}</p>
                                </div>
                            ))
                        ) : (
                            <p>No deliveries available.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
