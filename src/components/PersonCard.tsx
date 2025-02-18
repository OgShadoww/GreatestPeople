import React from 'react';
import { IPerson } from '../types/IPerson';

interface PersonCardProps {
    person: IPerson;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    return (
        <div className='lg:flex lg:flex-col lg:items-start lg:gap-[10px] lg:w-[208px] md:flex md:flex-col md:items-start md:gap-[8px] md:w-[160px] lg:bg-opacity-0 md:bg-opacity-0 lg:p-0 md:p-0 lg: flex items-start gap-[8px] w-full bg-[#505069] bg-opacity-[0.5] p-[10px] rounded-[12px]'>
            <img className='object-cover lg:w-[208px] lg:h-[290px] lg:rounded-[18px] md:w-[150px] md:h-[230px] md:rounded-[18px] w-[65px] h-[100px] rounded-[8px]' src={person.photo !== null ? person.photo : ''} alt={person.name} />
            <div className='flex flex-col'>
                <a className='lg:text-[20px] md:text-[18px] text-[20px]' href={`/person/${person.id}`}>{person.name}</a>
                <span className='lg:text-[14px] opacity-[0.7] md:text-[13px] text-[13px]'>{person.occupation}</span>
            </div>
        </div>
    );
};

export default PersonCard;