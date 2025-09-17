import { Region } from './regions';

type Currency = {
    code: string,
    name: string,
    symbol: string,
};

type Language = {
    name: string,
    iso639_1: string,
    iso639_2: string,
    nativeName: string,
};

export type Country = {
    name: string,
    flag: string,
    flags: {
        png: string,
        svg: string,
    },
    region: Region,
    borders: string[],
    capital: string,
    languages: Language[],
    subregion: string,
    nativeName: string,
    population: number,
    currencies: Currency[],
    topLevelDomain: string[],
}

type Info = {
    title: string,
    description: string,
}

export type CountryInfo = {
    img: string,
    name: string,
    info: Info[],
}