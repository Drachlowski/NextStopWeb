export class TimetableRequest {
    constructor(
        public startStopId?: number,
        public endStopId?: number,
        public departureTime?: Date
    ) {}
}
