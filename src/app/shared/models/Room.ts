import { Seat } from "./Seat";

export interface Room {
    rows: number;
    columns: number;
    occupiedSeats: Array<string>;
}