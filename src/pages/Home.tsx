import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import PopularPeople from '../components/PopularPeople';
import HomePanel from '../components/HomePanel';
import { IPerson } from '../types/IPerson';
import axios from 'axios';
import HomePanelPersons from '../components/HomePanelPersons';
import { IPanelVar } from '../types/IPalenVar';

const Home = () => {
    const [people, setPeople] = useState<IPerson[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<IPerson>(people[0]);
    const [occupation, setOccupation] = useState<string | undefined>(""); // Update type to make it nullable
    const [time, setTime] = useState<string | undefined>(""); 
    const apiUrl = 'http://127.0.0.1:8000/api/persons/';

    useEffect(() => {
        axios.get<IPerson[]>(apiUrl)
            .then(response => {
                const mathPersons19thCentury = response.data.filter(person => {
                    // Check if occupation includes "Mathematics" and if the birth year is in the 19th century (1800 - 1899)
                    return person.occupation.includes("Mathematic") && person.century == 19;
                });
                const ancientPhilosophers = response.data.filter(person => {
                    return person.birth_date_before !== 0 &&  person.occupation.includes("Philosopher");
                })
                const japanPeople = response.data.filter(person => {
                    return person.nationality === "Japan"; // Added return statement
                });
                const writerPeople = response.data.filter(person => {
                    return (person.occupation.includes("Writer") && person.century && person.century >= 17 && person.century <= 19)
                });
                const athletePeople = response.data.filter(person => {
                    return person.occupation.includes("Athlete")
                });

                const panelVar:IPanelVar[] = [
                    {
                        occupation: "MATHEMATICS",
                        time: "19TH CENTURY",
                        person: mathPersons19thCentury.slice(0,5),
                    },
                    {
                        occupation: "PHILOSOPHERS",
                        time: "ANCIENT",
                        person: ancientPhilosophers.slice(0,5),
                    },
                    {
                        occupation: "PEOPLE",
                        time: "JAPAN",
                        person: japanPeople.slice(0,5),
                    },
                    {
                        occupation: "WRITERS",
                        time: "17-19 CENTURIES",
                        person: writerPeople.slice(0,5),
                    },
                    {
                        occupation: "ATHLETE",
                        time: "ALL TIME",
                        person: athletePeople.slice(0,5),
                    },
                ]
                const randomIndex = Math.floor(Math.random() * panelVar.length);
                const randomlySelectedPanel = panelVar[randomIndex];

                setSelectedPerson(randomlySelectedPanel.person[0])
                setPeople(randomlySelectedPanel.person)
                setOccupation(randomlySelectedPanel.occupation)
                setTime(randomlySelectedPanel.time)
            })
            .catch(error => {
                console.error('Error fetching popular people:', error);
            });
    }, []);
    const handlePersonClick = (person: IPerson) => {
        setSelectedPerson(person); // Update the selected person
    };

    return (
        <div className='lg:flex lg:gap-[30px] lg:w-full lg:h-full lg:pt-[20px] lg:px-[40px] md:flex md:gap-[30px] md:w-full md:h-full md:pt-[20px] md:px-[40px] lg:flex-row md:flex-row flex flex-col gap-[30px] w-full h-full pt-[20px] px-[40px] overflow-hidden'>
            <div className='lg:flex lg:flex-col lg:gap-[20px] md:flex md:flex-col md:gap-[20px] lg:items-start md:items-start flex flex-col items-center gap-[30px]'>
                <HomePanel occupation={occupation} time={time} person={selectedPerson}/>
                <div className='lg:flex lg:gap-[20px] md:flex md:gap-[12px] flex gap-[12px] transition-all duration-500'>
                    {people.map(person => (
                        <HomePanelPersons
                            selected={selectedPerson}
                            key={person.id}
                            person={person}
                            onClick={() => handlePersonClick(person)} // Pass the click handler
                        />
                    ))}
                </div>
            </div>
            <div className='lg:overflow-scroll md:overflow-scroll'>
                <PopularPeople/>
            </div>
        </div>
    );
};

export default Home;