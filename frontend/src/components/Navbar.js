import React from 'react';
import NavLink from './NavLink';
import '../styles/navbar.css';

export default function Navbar() {

    return (
        <nav className="navbar">
            <NavLink to="/overall">Overall</NavLink>
            <NavLink to="/season/Y9S3">Y9S3</NavLink>
            <NavLink to="/season/Y9S2">Y9S2</NavLink>
            <NavLink to="/season/Y9S1">Y9S1</NavLink>
            <NavLink to="/season/Y8S4">Y8S4</NavLink>
            <NavLink to="/season/Y8S3">Y8S3</NavLink>
            <NavLink to="/season/Y8S2">Y8S2</NavLink>
            <NavLink to="/season/Y8S1">Y8S1</NavLink>
            <NavLink to="/season/Y7S4">Y7S4</NavLink>
            <NavLink to="/season/Y7S3">Y7S3</NavLink>
        </nav>
    );
}
