import React from 'react';
import { routers } from '../routes';

const Navbar = () => {
    return (
        <nav className='flex lg:gap-[20px] md:gap-[20px] gap-[10px]'>
            {routers.map(route => (
                route.nav == true ?
                    <a key={route.path} href={route.path}>{route.name}</a>
                :
                    ""
            ))}
        </nav>
    );
};

export default Navbar;