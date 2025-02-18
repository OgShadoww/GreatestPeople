import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IPerson } from '../types/IPerson';
import PersonCard from './PersonCard';

const PopularPeople = () => {
    const [people, setPeople] = useState<IPerson[]>([]);
    const apiUrl = 'http://127.0.0.1:8000/api/persons/';

    useEffect(() => {
        axios.get<IPerson[]>(apiUrl)
            .then(response => {
                const sortedPeople = response.data
                    .sort((a, b) => (b.rank || 0) - (a.rank || 0))
                    .slice(0, 10); // Slice to include only the top 10 people
                setPeople(sortedPeople);
            })
            .catch(error => {
                console.error('Error fetching popular people:', error);
            });
    }, []);

    return (
        <div className='lg:flex lg:flex-col lg:items-start lg:gap-[20px] lg:w-[700px] lg:relative md:flex md:flex-col md:items-start md:gap-[10px] md:w-[700px] md:relative flex flex-col items-center gap-[12px] relative'>
            <h2 className='lg:text-[26px] md:text-[24px] text-[22px]'>
                Popular people
            </h2>
            <div className='lg:flex lg:gap-[15px] md:flex md:gap-[12px] lg:flex-row md:flex-row flex flex-col gap-[12px] lg:w-auto md:w-auto w-full'>
                {people.map(person => (
                    <PersonCard key={person.id} person={person} />
                ))}
            </div>
        </div>
    );
};

export default PopularPeople;