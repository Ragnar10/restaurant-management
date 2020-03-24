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
                <NavLink to='/dishes' activeClassName='active' className='link'>Dishes</NavLink>
                <NavLink to='/checks' activeClassName='active' className='link'>Checks</NavLink>
                <NavLink to='/analytics' activeClassName='active' className='link'>Analytics</NavLink>
            </div>
        </>
    );
};

export default Header;