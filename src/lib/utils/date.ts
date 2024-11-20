const dateUtils = {
    compareDate: (date1: Date, date2: Date) => {
        const date1OnlyDate = new Date(date1);
        const date2OnlyDate = new Date(date2);
        date1OnlyDate.setHours(0, 0, 0, 0);
        date2OnlyDate.setHours(0, 0, 0, 0);

        return date1OnlyDate.getTime() === date2OnlyDate.getTime();
    },
    betweenRangeDate: (date: Date, range: [Date, Date], mode?: "exclusive" | "inclusive") => {
        const dateSemHora = new Date(date);
        const [range1, range2] = range;
        const range1OnlyDate = new Date(range1);
        const range2OnlyDate = new Date(range2);
        dateSemHora.setHours(0, 0, 0, 0);
        range1OnlyDate.setHours(0, 0, 0, 0);
        range2OnlyDate.setHours(0, 0, 0, 0);

        if (mode === "exclusive")
            return dateSemHora.getTime() > range1OnlyDate.getTime() && dateSemHora.getTime() < range2OnlyDate.getTime();
        return dateSemHora.getTime() >= range1OnlyDate.getTime() && dateSemHora.getTime() <= range2OnlyDate.getTime();
    },
};

export default dateUtils;
