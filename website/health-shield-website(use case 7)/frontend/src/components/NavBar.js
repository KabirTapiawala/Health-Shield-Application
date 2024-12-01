import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Health Profile</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
