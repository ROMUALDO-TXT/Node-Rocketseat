interface IDateProvider{
    compare(start_date: Date, end_date: Date):number;
    dateNow(): Date;
}

export {IDateProvider};