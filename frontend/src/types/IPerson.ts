import { Url } from "url"

export interface IPerson {
    id: number;
    name: string;
    occupation: string;
    birth_date_our: Date;
    birth_date_before: number;
    birth_place: string;
    die_date_our: Date;
    die_date_before: number;
    die_place: string;
    photo: string;
    color: string;
    description: string;
    links: Url;
    rank?: number;
    works?: Url[];
    nationality: string;
    century?: number; // Optional field
}


