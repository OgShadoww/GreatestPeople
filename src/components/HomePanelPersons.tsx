import React, { FC } from 'react';
import { IPerson } from '../types/IPerson';

interface props {
    selected: IPerson | null;
    person: IPerson;
    onClick: () => void;
}

const HomePanelPersons:FC<props> = ({selected, person, onClick}) => {
    return (
        <div className={`person-container cursor-pointer ${selected === person ? 'selected' : ''}`} onClick={onClick}>
            <img className='lg:min-w-[55px] lg:h-[71px] lg:rounded-[9px] md:min-w-[55px] md:h-[71px] md:rounded-[9px] min-w-[52px] h-[62px] rounded-[9px] object-cover' src={person.photo !== null ? person.photo : ''} alt={person.name} />
            <h4 className='lancelot lg:max-w-[80px] md:max-w-[80px] lg:text-[16px] md:text-[16px] text-[14px] text-balance'>
                {person.name}
            </h4>
        </div>
    );
};

export default HomePanelPersons;