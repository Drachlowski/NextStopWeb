export class TimetableResponse {
    constructor(
        public tripId?: number,
        public routeName?: string,
        public delay?: number,
        public departureTime?: Date,
        public arrivalTime?: Date,
        public connections?: TimetableResponse[]
    ) {}
}
