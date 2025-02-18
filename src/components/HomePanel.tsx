import React, { FC } from 'react';
import { IPerson } from '../types/IPerson';

interface props {
    person: IPerson;
    occupation: string | undefined;
    time: string | undefined;
}

const HomePanel:FC<props> = ({person, occupation, time}) => {
    const bg = person?.color;

    return (
        <div className="lg:relative lg:p-[20px] lg:w-[690px] lg:h-[380px] lg:mt-[10px] md:relative md:p-[20px] md:w-[500px] md:h-[300px] md:mt-[10px] lg:block md:block relative p-[20px] mt-[10px] flex flex-col items-center gap-[20px] pt-0">
            <div style={{backgroundColor:bg}} className='lg:transition-colors lg:duration-500 lg:absolute lg:inset-0 lg:blur-[6px] lg:z-[-1] lg:rounded-[16px] md:transition-colors md:duration-500 md:absolute md:inset-0 md:blur-[6px] md:z-[-1] md:rounded-[16px] lg:opacity-100 md:opacity-100 opacity-0'></div>
            <h1 className='lg:text-[38px] md:text-[32px] lg:text-start md:text-start text-center sm:text-[36px] text-[22px] lato font-light'>GREATEST <br className='lg:block md:block hidden'/> {occupation} <br className='lg:block md:block hidden'/> OF THE {time} <br className='lg:block md:block hidden'/></h1>
            <img className='lg:w-[290px] lg:h-[380px] lg:rounded-[16px] lg:absolute lg:right-0 lg:top-0 lg:z-[-1] md:w-[220px] md:h-[300px] md:rounded-[16px] md:absolute md:right-0 md:top-0 md:z-[-1] rounded-[16px] z-[-1] sticky w-[230px] shadow-2xl aspect-[0.82] shadow-[#373737] drop-shadow-2xl object-cover' src={person?.photo !== null ? person?.photo : ''} alt={person?.name} />
        </div>
    );
};

export default HomePanel;