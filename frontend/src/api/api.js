const API_URL = 'http://localhost:3000';

export async function login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return response.ok ? data.token : null;
}

export async function register(username, password) {
    await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
}

export async function getItems(token) {
    const response = await fetch(`${API_URL}/items`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
}

export async function createItem(name, token) {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
    return response.json();
}

export async function deleteItem(id, token) {
    await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
}