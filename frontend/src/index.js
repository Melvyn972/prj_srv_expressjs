import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';
import Register from './components/Register';
import Items from './components/Items';

function App() {
    const [token, setToken] = React.useState(null);

    return (
        <div>
            {!token ? (
                <div>
                    <Login setToken={setToken} />
                    <Register />
                </div>
            ) : (
                <Items token={token} />
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


