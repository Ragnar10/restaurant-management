import React from 'react';
import {NavLink, Link} from "react-router-dom";

import './Header.css';


const Header = () => {
    return (
        <>
            <h1 className='home_caption'>
                <Link to='/tables' className='home_link'>Management</Link>
            </h1>
            <div className='header'>
                <NavLink to='/tables' activeClassName='active' className='link'>Tables</NavLink>
                <NavLink to='/waiters' activeClassName='active' className='link'>Waiters</NavLink>
            </div>
        </>
    );
};

export default Header;