export class TripCheckIn {
    constructor(
        public tripId?: number,
        public routeStopId?: number,
        public checkInTime?: Date
    ) {}
}
