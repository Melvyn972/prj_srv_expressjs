import React, { useState, useEffect } from 'react';
import { getItems, createItem, deleteItem } from '../api/api';

function Items({ token }) {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        async function fetchItems() {
            const data = await getItems(token);
            setItems(data);
        }
        fetchItems();
    }, [token]);

    const handleAddItem = async () => {
        const item = await createItem(newItem, token);
        setItems([...items, item]);
        setNewItem('');
    };

    const handleDeleteItem = async (id) => {
        await deleteItem(id, token);
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nouvel item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={handleAddItem}>Ajouter</button>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name}{' '}
                        <button onClick={() => handleDeleteItem(item.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Items;

