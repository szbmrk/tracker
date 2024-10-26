import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function NavLink(props) {

    const isActive = useLocation().pathname === props.to ? " active" : ""
    return (
        <Link className={"nav-link menu" + isActive} to={props.to}>
            {props.children}
        </Link>
    )
}