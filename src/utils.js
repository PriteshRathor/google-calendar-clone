import dayjs from "dayjs";

const getMonth = (month = dayjs().month()) => { // Months are zero indexed, so January is month 0.
    month = Math.floor(month);
    const currentYear = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(currentYear, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(currentYear, month, currentMonthCount));
        });
    });
    return daysMatrix
}

export {
    getMonth
}