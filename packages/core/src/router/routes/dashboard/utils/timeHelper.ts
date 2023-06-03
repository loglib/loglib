export const getTimeRange = (startDate: Date, endDate: Date) => {
    const diff = endDate.getTime() - startDate.getTime();
    return diff;
}