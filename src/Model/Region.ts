import {ImageSourcePropType} from 'react-native';

export interface Region {
    country: string;
    cities: City[];
    server: string;
    image?: ImageSourcePropType;
}

export interface City {
    name: string;
    config: string;
}
