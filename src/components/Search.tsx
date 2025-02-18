import React, { FC, useCallback, useState } from 'react';
import SearchResult from './SearchResult';
import { useDebounce } from '../app/hooks/useDebounce';
import Close from '../img/close.png'

interface props {
    visible: boolean,
    setVisible: any
}

const Search:FC<props> = ({visible, setVisible}) => {
    const mainStyles = ['absolute opacity-0 pointer-events-none']
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    if(visible) {
        mainStyles.pop()
        mainStyles.push('search')
        document.body.classList.add('overwflow-hidden')
    }
    else {
        mainStyles.push('opacity-0 pointer-events-none')
        document.body.classList.remove('overwflow-hidden')
    }
    return (
        <div className={mainStyles.join(' ')}>
            <div className='lg:w-[720px] lg:h-[auto] md:w-[620px] md:h-auto w-[100%] h-[100%] mx-[auto] lg:pt-[10px] md:pt-[10px] pt-0'>
                <div className='relative flex items-center'>
                    <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder='Search person' className='h-[38px] w-full border-[0] lg:rounded-[4px] md:rounded-[4px] rounded-none bg-[#131722] text-[#fff] outline-none px-[20px] text-[14px]' />
                    <img src={Close} onClick={() => setVisible(false)} className='absolute w-[18px] right-[8px] cursor-pointer text-[16px]' alt="Close" />
                </div>
                <div className='flex flex-col lg:h-auto md:h-auto h-[100%]'>
                    <SearchResult visible={visible} setVisible={setVisible} searchTherm={debouncedSearchTerm}/>
                </div>
            </div>
        </div>
    );
};

export default Search;