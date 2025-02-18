import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IPerson } from '../types/IPerson';

interface props {
    person: IPerson,
    visible: boolean,
    setVisible: any
}

const SearchItem:FC<props> = ({person, visible, setVisible}) => {
    return (
        <Link onClick={() => setVisible(false)} to={`/person/${person.id}`} className='flex items-center gap-[12px] border-b-[1px] border-b-[] pb-[6px]'>
            <img className='max-w-[50px] min-w-[50px] w-[50px] min-h-[70px] max-h-[70px] h-[70px] object-cover' src={person?.photo !== null ? person?.photo : ''} alt={person.name} />
            <div className='flex items-center gap-[5px] text-left'>
                <div className='flex flex-col w-[100%]'>
                    <span className='lg:text-[18px] md:text-[16px] text-[16px]'>
                        {person.name}
                    </span>
                    <span className='opacity-[0.68] text-[14px]'>
                        {person.occupation}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default SearchItem;