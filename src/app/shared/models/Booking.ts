import { Timestamp } from "@angular/fire/firestore";

export interface Booking {
    id: string;
    type?: string;
    movieId: string;
    title: string;
    date: number;
    tickets: number;
    selectedSeats: Array<string>;
    userId: string;
}