import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayJsDateProvider implements IDateProvider{
    compare(start_date: Date, end_date: Date): number {
        const startDate = dayjs(start_date).utc().local().format();
        const endDate = dayjs(end_date).utc().local().format();
        return dayjs(endDate).diff(startDate, "hours");
    }
    dateNow(): Date{
        return dayjs().toDate();

    }
}

export { DayJsDateProvider }