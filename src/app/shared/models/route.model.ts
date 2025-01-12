export class Route {
    constructor(
        public id?: number,
        public routeName?: string,
        public validityStartDate?: Date,
        public validityEndDate?: Date,
        public daysOfOperation?: string,
    ) {}
}