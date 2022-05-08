export interface Movie {
    id: string;
    title: string;
    image: string;
    imageUrl: string;
    rating: number;
    genre: Array<string>;
    playTime: number;
    when: Map<string, Array<string>>;
}