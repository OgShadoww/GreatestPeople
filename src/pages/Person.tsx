import React, { FC, useEffect, useState } from 'react';
import { IPerson } from '../types/IPerson';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Person = () => {
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<IPerson | null>(null);

    useEffect(() => {
        // Fetch person data from the API
        const fetchPerson = async () => {
            try {
                const response = await axios.get<IPerson>(`http://127.0.0.1:8000/api/persons/${id}/`);
                setPerson(response.data); // Set the fetched person data to the state
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        };

        fetchPerson(); // Call the fetchPerson function
    }, [id]); // Run the effect whenever the id parameter changes

    return (
        <div className='lg:gap-[12px] lg:px-[40px] lg:py-[20px] md:gap-[12px] md:px-[40px] md:py-[20px] flex flex-col gap-[20px] px-[20px] py-[40px]'>
            <div className='flex lg:flex-row-reverse md:flex-row-reverse lg:justify-between md:justify-between flex-col items-center'>
                <img className='lg:w-[300px] lg:h-[440px] lg:rounded-[20px] md:w-[270px] md:h-[410px] md:rounded-[20px] rounded-[14px] w-[250px] h-[350px] object-cover' src={person?.photo !== null ? `http://127.0.0.1:8000/${person?.photo}` : ''} alt={person?.name} />
                <div className='lg:gap-[40px] flex flex-col lg:items-start md:items-start md:gap-[40px] items-center gap-[20px]'>
                    <h1 className='lancelot lg:text-[52px] md:text-[44px] lg:text-start md:text-start text-center text-[44px]'>{person?.name}</h1>
                    <div className='flex items-center lg:gap-[40px] md:gap-[40px] gap-[10px]'>
                        <div className='flex flex-col lg:items-start lg:gap-[6px] md:items-start md:gap-[6px] items-center'>
                            <span className='opacity-[0.68] lg:text-[16px] md:text-[14px] text-[14px] abeezee'>BORN</span>
                            <span className='lg:text-[28px] md:text-[24px] text-[20px] text-center'>
                            {person?.birth_date_before === 0 ? new Date(person.birth_date_our).getFullYear() : `${person?.birth_date_before.toString()} BCE`}
                            </span>
                            <span className='opacity-[0.68] lg:text-[16px] md:text-[14px] text-[14px] lg:text-left md:text-left text-center abeezee'>{person?.birth_place}</span>
                        </div>
                        <hr className='bg-white lg:w-[100px] md:w-[80px] w-[50px]'/>
                        <div className='flex flex-col lg:items-start lg:gap-[12px] md:items-start md:gap-[12px] items-center'>
                            <span className='opacity-[0.68] lg:text-[16px] md:text-[14px] text-[14px] abeezee'>DIED</span>
                            <span className='lg:text-[28px] md:text-[24px] text-[20px] text-center'>
                            {person?.die_date_before === 0 ? new Date(person.die_date_our).getFullYear() : `${person?.die_date_before.toString()} BCE`}
                            </span>
                            <span className='opacity-[0.68] lg:text-[16px] md:text-[14px] text-[14px] lg:text-left md:text-left text-center abeezee'>{person?.die_place}</span>
                        </div>
                    </div>
                    <div className='flex lg:gap-[40px] md:gap-[40px] gap-[40px]'>
                        <div className='flex flex-col lg:items-start md:items-start items-center gap-[12px]'>
                            <h3 className='lg:text-[24px] md:text-[20px] text-[20px] abeezee'> 
                                Link:
                            </h3>
                            <a className='opacity-[0.68] lg:text-[16px] md:text-[14px] text-[14px] underline abeezee' href={person?.links.toString() ?? ''}>
                                Wikipedia
                            </a>
                        </div>
                        <div className='flex flex-col lg:items-start md:items-start items-center gap-[12px]'>
                            <h3 className='lg:text-[24px] md:text-[20px] text-[20px] abeezee'> 
                                Occupation:
                            </h3>
                            <span className='opacity-[0.68] lg:text-[16px] md:text-[14px] text-[14px] text-center underline abeezee'>
                                {person?.occupation}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-[10px]'>
                <h3 className='abeezee'> 
                    Biography:
                </h3>
                <hr className='w-full opacity-[0.3]'/>
                <p className='lancelot text-wrap opacity-[0.68]'>
                    {person?.description}
                </p>
            </div>
        </div>
    );
};

export default Person;