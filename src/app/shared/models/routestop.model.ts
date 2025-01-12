import { Route } from "./route.model";
import { Stop } from "./stop.model";

export class RouteStop {
    constructor(
        public id?: number,
        public routeId?: number,
        public stopId?: number,
        public stopSequence?: number,
        public scheduled?: number,
        public route?: Route,
        public stop?: Stop
    ) {}
}
