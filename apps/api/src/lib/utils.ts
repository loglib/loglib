export const convertDate = (date: Date | string) => {
    if (typeof date === "string") {
        const d = new Date(date);
        return d.toISOString().slice(0, 19).replace("T", " ");
    }
    return date.toISOString().slice(0, 19).replace("T", " ");
};

export const getNow = () => {
    return new Date(convertDate(new Date()));
};

export const getQuery = (query: string) => {
    const q = new URLSearchParams(query.split("?")[1]);
    const queryObject = Object.fromEntries(q.entries());
    return queryObject;
};

// Function to convert timezone time to UTC time
export function convertToUTC(timezoneTime: string | Date) {
    // Create a new Date object using the timezone time
    const date = new Date(timezoneTime);
    // Get the time in milliseconds since January 1, 1970, UTC
    const timeInMillis = date.getTime();
    // Get the timezone offset in minutes and convert it to milliseconds
    const timezoneOffsetInMillis = date.getTimezoneOffset() * 60000;
    // Calculate the UTC time by subtracting the timezone offset
    const utcTime = timeInMillis - timezoneOffsetInMillis;
    // Create a new Date object using the UTC time
    const utcDate = new Date(utcTime);
    return utcDate.toISOString().slice(0, 19).replace("T", " ");
}
