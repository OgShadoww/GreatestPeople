import React, { useEffect, useState } from 'react';
import { IPerson } from '../types/IPerson';
import axios from 'axios';
import CatalogCard from '../components/CatalogCard';
import SortIcon from '../img/sort-icon.png'
import DropDownList from '../components/DropDownList';
import personData from '../personData/personData.json'
import filterIcon from '../img/filter.svg'

const Catalog = () => {
    const [persons, setPersons] = useState<IPerson[]>([]);
    const [visible, setVisible] = useState<boolean>(false)
    const [value, setValue] = useState('Rating')
    const [filterValueNationality, setFilterValueNationality] = useState("")
    const [filterValueOccupation, setFilterValueOccupation] = useState("")
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch person data from the API
        const fetchPerson = async () => {
            try {
                let response;
                if (searchTerm.trim() !== '') {
                    // Fetch filtered data if search term is not empty
                    response = await axios.get<IPerson[]>(`http://127.0.0.1:8000/api/persons/?name=${searchTerm}&nationality=${filterValueNationality}&occupation=${filterValueOccupation}`);
                } else {
                    // Fetch all data if search term is empty
                    response = await axios.get<IPerson[]>(`http://127.0.0.1:8000/api/persons/?nationality=${filterValueNationality}&occupation=${filterValueOccupation}`);
                }
    
                // Sort the data based on the value
                if (value === 'Rating') {
                    const sortedPeople = response.data.sort((a, b) => (b.rank || 0) - (a.rank || 0));
                    setPersons(sortedPeople);
                } else if (value === 'Name') {
                    const sortedPeople = [...response.data].sort((a, b) => a.name.localeCompare(b.name));
                    setPersons(sortedPeople);
                }
            } catch (error) {
                console.error('Error fetching person data:', error);
            }
        };
    
        fetchPerson(); // Call the fetchPerson function
    }, [value, searchTerm, filterValueNationality, filterValueOccupation]);

    const handleClickValue = (value: string) => {
        setValue(value)
    }
    const handleClickFilter = (nationality?: string, occupation?: string) => {
        if(nationality !== undefined) {
            setFilterValueNationality(nationality)
        }
        if(occupation !== undefined) {
            setFilterValueOccupation(occupation)
        }
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='lg:px-[40px] md:px-[40px] sm:px-[20px] px-[0px] flex lg:justify-between items-start lg:gap-[20px] md:justify-center md:pb-[100px]'>
            <div className='bg-[#0D0D17] lg:rounded-[25px] md:rounded-[20px] sm:rounded-[15px] rounded-[0px] lg:py-[10px] lg:px-[20px] flex flex-col gap-[20px] lg:w-[830px] md:w-[830px] px-[25px] py-[10px] border-t-[1px] border-t-[#fff]'>
                <h1 className='lg:text-[36px] md:text-[36px] text-[28px] lato'>
                    Gallery
                </h1>
                <div className='flex justify-between w-full'>
                    {/* <input placeholder='Search by name...' className='border-[#AFAFAF] border-[1px] bg-[#8A8A8A] bg-opacity-[0.13] lg:px-[15px] lg:py-[6px] rounded-[12px] w-[80%] text-[14px]' type="text" /> */}
                    <input 
                        placeholder='Search by name...' 
                        className='border-[#AFAFAF] border-[1px] bg-[#8A8A8A] bg-opacity-[0.13] lg:px-[15px] md:px-[12px] px-[10px] lg:py-[6px] md:py-[6px] py-[6px] lg:rounded-[12px] md:rounded-[12px] rounded-[8px] lg:w-[80%] md:w-[80%] sm:w-[70%] w-[65%] text-[14px]' 
                        type="text" 
                        value={searchTerm}
                        onChange={handleInputChange} // Handle input change
                    />
                    <div className='relative'>
                            <button onClick={() => setVisible(!visible)} className='lg:px-[8px] md:px-[8px] px-[2px] lg:py-[8px] md:py-[8px] py-[8px] flex-nowrap flex items-center lg:gap-[6px] md:gap-[6px] gap-[2px] lg:text-[14px] md:text-[14px] text-[12px] hover:bg-[#14141E] transition-colors duration-500 lg:rounded-[12px] md:rounded-[12px] rounded-[6px]'>
                                <img className='w-[16px]' src={SortIcon}/>
                                <span className=''>Sort by {value}</span>
                            </button>
                            <DropDownList isVisible={visible}>
                                <div className='text-secondary text-[12px] mx-[10px] my-[5px]'>
                                    Sorting by
                                </div>
                                <label className='py-[7px] px-[12px] lg:text-[13px] text-[12px] flex gap-[8px] items-center cursor-pointer hover:bg-[]'>
                                    <input checked={value === 'Rating' ? true : false} value='check' onChange={() => handleClickValue("Rating")} type="radio" className='control-input' />
                                    <span className='rounded-[50%] border-[#ffffff95] border-[1px] control-indicator'></span>
                                    <span>By rating</span>
                                </label>
                                <label className='py-[7px] px-[12px] lg:text-[13px] text-[12px] flex gap-[8px] items-center cursor-pointer'>
                                    <input checked={value === 'Name' ? true : false} onChange={() => handleClickValue("Name")} type="radio" className='control-input' />
                                    <span className='rounded-[50%] border-[#ffffff95] border-[1px] control-indicator'></span>
                                    <span>By name</span>
                                </label>
                            </DropDownList>
                    </div>
                </div>
                <div className='flex flex-wrap'>
                    {persons.map(person => (
                        <CatalogCard key={person.id} person={person}/>
                    ))}
                </div>
            </div>
            <div className='bg-[#0D0D17] lg:flex lg:flex-col lg:gap-[15px] lg:px-[20px] lg:py-[20px] lg:static md:fixed lg:w-[30%] md:w-[70px] md:h-[70px] md:cursor-pointer md:rounded-[50%] md:bottom-[10px] lg:shadow-none lg:h-auto md:shadow-[0_0px_50px_rgba(223,_236,_255,_0.7)] lg:rounded-[25px] sm:rounded-[15px]'>
                <div className='lg:hidden md:flex items-center justify-center w-full h-full'>
                    <img className='w-[30px]' src={filterIcon} alt="" />
                </div>
                <div className='lg:block md:hidden'>
                    <div className='flex flex-col gap-[8px]'>
                        <h3 className='text-[18px] font-[600]'>Nationality:</h3>
                        <div className='flex flex-wrap gap-[8px]'>
                            <label className='py-[2px] lg:text-[13px] text-[12px] flex gap-[8px] items-center cursor-pointer hover:bg-[]'>
                                <input checked={filterValueNationality == "" ? true : false} value='check' onClick={() => handleClickFilter("", undefined)} type="radio" className='control-input' />
                                <span className='rounded-[4px] border-[#ffffff95] border-[1px] control-indicator'></span>
                                <span>All</span>
                            </label>
                            {personData.nationality.map(person => (
                                <label className='py-[2px] lg:text-[13px] text-[12px] flex gap-[8px] items-center cursor-pointer hover:bg-[]'>
                                    <input checked={filterValueNationality === person ? true : false} value='check' onClick={() => handleClickFilter(person, undefined)} type="radio" className='control-input' />
                                    <span className='rounded-[4px] border-[#ffffff95] border-[1px] control-indicator'></span>
                                    <span>{person}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <h3 className='text-[18px] font-[600]'>Occupation:</h3>
                        <div className='flex flex-wrap gap-[8px]'>
                            <label className='py-[2px] lg:text-[13px] text-[12px] flex gap-[8px] items-center cursor-pointer hover:bg-[]'>
                                <input checked={filterValueOccupation === "" ? true : false} value='check' onClick={() => handleClickFilter(undefined, "")} type="radio" className='control-input' />
                                <span className='rounded-[4px] border-[#ffffff95] border-[1px] control-indicator'></span>
                                <span>All</span>
                            </label>
                            {personData.occupation.map(person => (
                                <label className='py-[2px] lg:text-[13px] text-[12px] flex gap-[8px] items-center cursor-pointer hover:bg-[]'>
                                    <input checked={filterValueOccupation === person ? true : false} value='check' onClick={() => handleClickFilter(undefined, person)} type="radio" className='control-input' />
                                    <span className='rounded-[4px] border-[#ffffff95] border-[1px] control-indicator'></span>
                                    <span>{person}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;