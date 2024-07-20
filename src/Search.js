import { useState } from "react";

export default function Search() {
    const [searchName, setSearchName] = useState('');
    
    async function handleSubmit(ev) {
        alert(searchName);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input  type='text' 
                        placeholder='입력'
                        onChange={ev => setSearchName(ev.target.value)}/>
                <button>검색</button>
            </form>
            <button>
                <div>
                    <h1>dsdsds</h1>
                </div>
            </button>
        </div>
    );
}