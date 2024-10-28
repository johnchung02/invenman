import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Item = (props) => (
    <>
        <th className="px-4 py-2 text-left border border-gray-300">{props.item.name}</th>
        <td className="px-4 py-2 text-left border border-gray-300">{props.item.company}</td>
        <td className="px-4 py-2 text-left border border-gray-300">
            <Link to={`/inventory/item/${props.item._id}`}>
                배송 추가
            </Link>
        </td>
    </>
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
        <div className="">
            <div className="p-10">
                <form onSubmit={handleSubmit} class="w-full max-w-[330px]">
                    <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white" for="default-search">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            >
                                <path
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                stroke-width="2"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            class="block w-full p-4 py-5 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={ev => setSearchTerm(ev.target.value)}
                        />
                        <button type="submit" class="absolute end-2.5 bottom-1/2 translate-y-1/2 p-4 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                class="w-4 h-4"
                            >
                                <path
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                stroke-width="2"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke="currentColor"
                                ></path>
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </div>
                </form>
            </div>
            <div className="overflow-x-auto p-10">
                <table className="min-w-full border border-gray-600">
                    <thead className="bg-gray-400">
                        <tr>
                            <th className="px-4 py-2 text-left border border-gray-300 w-1/3">Product name</th>
                            <th className="px-4 py-2 text-left border border-gray-300 w-1/3">Company Name</th>
                            <th className="px-4 py-2 text-left border border-gray-300 w-1/3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items?.length > 0 ? 
                        (
                            items.map((item) => (
                                <tr key={item._id} className="bg-white">
                                    <Item item={item} />
                                </tr>
                            ))
                        ) : 
                        (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    <h2>Nothing ...</h2>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}