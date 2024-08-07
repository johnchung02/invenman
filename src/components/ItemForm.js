import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

export default function ItemForm() {
    const [form, setForm] = useState({
        name: "",
        company: "",
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            setIsNew(false);
            const response = await fetch(`http://localhost:5050/item/${params.id.toString()}`);
            if (!response.ok) {
                console.error(response.statusText);
                return;
            }
            const item = await response.json();
            if (!item) {
                navigate("/");
                return;
            }
            setForm(item);
        }
        fetchData();
        return;
    }, [params.id, navigate]);
    
    // these methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // 
    async function handleSubmit(e) {
        e.preventDefault();
        const item = { ...form };
        try {
            let response;
            if (isNew) {
                response = await fetch("http://localhost:5050/item", 
                    {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                });
            }

            if (!response.ok) {
                throw new Error(`${response.status}`)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setForm({ name: "", quantity: "", price: "" });
            navigate("/");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input  type="text"
                        name="name"
                        id="name"
                        placeholder="name"
                        onChange={(e) => updateForm({ name: e.target.value })}
                />
                <input  type="text" 
                        name="company"
                        id="company"
                        placeholder="company"
                        onChange={(e) => updateForm({ company: e.target.value })}
                />
                <button type="submit">add</button>
            </form>
        </>
    );
}