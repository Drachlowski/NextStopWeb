export class Holiday {
    constructor(
        public id?: number,
        public name?: string,
        public date?: Date,
        public endDate?: Date,
        public isSchoolHoliday?: boolean
    ) {}
}
