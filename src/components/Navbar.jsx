import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className='flex gap-12 py-10 justify-center items-center  w-11/12 mx-auto  '>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/adduser'>Adduser</NavLink>
         
            <NavLink to='/alluser'>Alluser</NavLink>
        </div>
    );
};

export default Navbar;