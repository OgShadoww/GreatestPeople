import React, { useState } from 'react';
import Logotype from './Logotype';
import Navbar from './Navbar';
import Search from './Search';

const Header = () => {
    const [visible, setVisible] = useState<boolean>(false);
    if (visible) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }

    return (
        <header className='lg:px-[40px] md:px-[40px] px-[10px] py-[20px] flex items-center justify-between'>
            <Logotype/>
            <div onClick={() => setVisible(true)} className='cursor-pointer lg:w-[120px] md:w-[120px] w-[80px] flex items-center justify-center text-center bg-[#121824] px-[20px] py-[3px] rounded-[10px] backdrop-blur-[41px] transition-colors duration-500 hover:bg-[#1A212E]'>
                Search
            </div>
            <Search visible={visible} setVisible={setVisible}/>
            <Navbar/>
        </header>
    );
};

export default Header;