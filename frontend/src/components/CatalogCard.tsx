import React, { FC } from 'react';
import { IPerson } from '../types/IPerson';
import { Link } from 'react-router-dom';

interface props {
    person: IPerson
}

const CatalogCard:FC<props> = ({person}) => {
    return (
        <Link to={`/person/${person.id}`} className='relative flex flex-col items-start justify-end lg:w-[20%] md:w-[20%] sm:w-[25%] w-[33.333%] py-[22px] px-[8px] lg:h-[210px] md:h-[210px] sm:h-[220px] h-[160px] flex-grow-0'>
            <img className='absolute inset-0 object-cover lg:w-[94%] md:w-[94%] w-[92%] lg:h-[94%] md:h-[94%] h-[92%] lg:rounded-[20px] md:rounded-[20px] rounded-[14px]' src={person?.photo !== null ? `${person?.photo}` : ''} alt="" />
            <div className='media-card-caption flex flex-col'>
                <span className='lg:text-[13px] md:text-[13px] text-[12px] opacity-[0.8] overflow-hidden w-full h-[20px]'>{person.occupation}</span>
                <span className='lg:text-[15px] md:text-[15px] text-[14px]'>{person.name}</span>
            </div>
        </Link>
    );
};

export default CatalogCard;