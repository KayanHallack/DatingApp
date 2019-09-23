import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    age: number;
    created: Date;
    lastActive: Date;
    gender: string;
    knownAs: string;
    city: string;
    country: string;
    photoUrl: string;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    photos?: Photo[];
}
