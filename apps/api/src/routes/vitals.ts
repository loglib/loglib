import { VitalData, VitalDateWithSession } from "@loglib/types/tracker";
import { getTimeRange } from "../lib/time-helper";

export const getVitalsByDate = (
    events: VitalDateWithSession[],
    startDate: Date,
    endDate: Date,
    timezone: string,
) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const range = getTimeRange(startDate, endDate);

    const formatOptions: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
    };

    if (range / ONE_DAY <= 2) {
        formatOptions.hour = "numeric";
    } else if (range / ONE_DAY <= 364) {
        formatOptions.day = "numeric";
        formatOptions.month = "short";
    } else {
        formatOptions.month = "short";
    }
    const dataByDate: { [key in string]: { originalDate: Date; date: string; value: number }[] } = {}
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const date = new Date(`${event.timestamp.toString().replace(" ", "T")}Z`).toLocaleString(
            "default",
            formatOptions,
        );
        const metric = event.name
        let data = dataByDate[metric]
        if (!data) {
            dataByDate[metric] = [{
                date,
                value: event.delta,
                originalDate: new Date(event.timestamp),
            }]
            continue
        }
        const index = data.findIndex((f) => f.date === date);
        if (index !== -1) {
            data[index].value += event.delta;
        } else {
            dataByDate[metric].push({
                date,
                value: event.delta,
                originalDate: new Date(event.timestamp),
            })
        }
    }
    return dataByDate
};
