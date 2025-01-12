import { Route } from "./route.model";

export class Trip {
    constructor(
        public id?: number,
        public routeId?: number,
        public startTime?: Date,
        public currentDelay?: number,
        public route: Route
    ) {}
}
