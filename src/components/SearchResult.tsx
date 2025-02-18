import React, { FC, useEffect, useState } from 'react';
import SearchItem from './SearchItem';
import { IPerson } from '../types/IPerson';
import axios from 'axios';

interface props {
    searchTherm: string,
    visible: boolean,
    setVisible: any
}

const SearchResult:FC<props> = ({searchTherm, visible, setVisible}) => {
    const [persons, setPersons] = useState<IPerson[]>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/person/search/?name=${searchTherm}`);
                setPersons(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        // Fetch data only if search term is not empty
        if (searchTherm.trim() !== '') {
            fetchData();
        } else {
            setPersons([]); // Clear the search results if the search term is empty
        }
    }, [searchTherm]);


    if(persons?.length === 0) {
        return (
            <div className='relative rounded-[3px] overflow-hidden'>
                <div className='search-suggestions'>
                    <div className='p-[10px] pl-[20px]'>
                        <span className='text-[14px]'>
                            Not found
                        </span>
                    </div>
                </div>  
            </div>  
        )
    }
    if(searchTherm === '' ) {
        return (
            <div className='relative rounded-[3px] overflow-hidden'>
                <div className='search-suggestions p-[10px]'></div>  
            </div>  
        )
    }

    return (
        <div className='relative rounded-[3px] overflow-hidden'>
            <div className='search-suggestions flex flex-col gap-[20px] px-[20px] py-[10px]'>
                {persons?.map(person => 
                    <SearchItem visible={visible} setVisible={setVisible} key={person.id} person={person}/>    
                )}
            </div>
        </div>
    );
};

export default SearchResult;