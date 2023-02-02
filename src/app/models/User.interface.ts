import { Coordinate } from "./coordinate.interface";


export interface User {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    address: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    imageUrl: string;
    coordinates: Coordinate;
}