import { CLSThresholds, FIDThresholds, INPThresholds, LCPThresholds } from "web-vitals";

const getStyle = (data: number, good: number, improve: number) => {
    return data <= good ? "#618264" : data <= improve ? "#FFB000" : "#C63D2F";
};

export type Stat = typeof stats[0];
export const stats = [
    {
        name: "Largest Contentful Paint",
        short: "LCP",
        description: (
            <p>
                The Largest Contentful Paint (LCP) metric reports the render time of the largest
                image or text block visible within the viewport, relative to when the page first
                started loading. <br />
                To provide a good user experience, sites should strive to have Largest Contentful
                Paint of 2.5 seconds or less. To ensure you're hitting this target for most of your
                users, a good threshold to measure is the 75th percentile of page loads, segmented
                across mobile and desktop devices.
            </p>
        ),
        formatter: (data: number) => `${data / 1000 < 10 ? (data / 1000).toFixed(2) : "> 10"} sec`,
        getRating: (data: number) => {
            const [good, improve] = LCPThresholds;
            return {
                style: getStyle(data, good, improve),
                label: `${data <= good ? "Good" : data <= improve ? "Needs Improvement" : "Poor"}`,
            };
        },
    },
    {
        name: "First Contentful Paint",
        short: "FCP",
        description: (
            <p>
                First Contentful Paint (FCP) is an important, user-centric metric for measuring
                perceived load speed because it marks the first point in the page load timeline
                where the user can see anything on the screen—a fast FCP helps reassure the user
                that something is happening.
            </p>
        ),
        formatter: (data: number) => `${data / 1000 < 10 ? (data / 1000).toFixed(2) : "> 10"} sec`,
        getRating: (data: number) => {
            const [good, improve] = LCPThresholds;
            return {
                style: getStyle(data, good, improve),
                label: `${data <= good ? "Good" : data <= improve ? "Needs Improvement" : "Poor"}`,
            };
        },
    },
    {
        name: "Interaction Paint",
        short: "INP",
        description: (
            <p>
                Interaction to Next Paint (INP) is a pending Core Web Vital metric that will replace
                First Input Delay (FID) in March 2024. INP assesses responsiveness using data from
                the Event Timing API. When an interaction causes a page to become unresponsive, that
                is a poor user experience. INP observes the latency of all interactions a user has
                made with the page, and reports a single value which all (or nearly all)
                interactions were below. A low INP means the page was consistently able to respond
                quickly to all—or the vast majority—of user interactions.
            </p>
        ),
        formatter: (data: number) => `${data.toFixed(2)} ms`,
        getRating: (data: number) => {
            const [good, improve] = INPThresholds;
            return {
                style: getStyle(data, good, improve),
                label: `${data <= good ? "Good" : data <= improve ? "Needs Improvement" : "Poor"}`,
            };
        },
    },
    {
        name: "Content Layout Shift",
        short: "CLS",
        description: (
            <p>
                Cumulative Layout Shift (CLS) is a stable Core Web Vital metric. It is an important,
                user-centric metric for measuring visual stability because it helps quantify how
                often users experience unexpected layout shifts—a low CLS helps ensure that the page
                is delightful.
            </p>
        ),
        formatter: (data: number) => `${data.toFixed(2)}`,
        getRating: (data: number) => {
            const [good, improve] = CLSThresholds;
            return {
                style: getStyle(data, good, improve),
                label: `${data <= good ? "Good" : data <= improve ? "Needs Improvement" : "Poor"}`,
            };
        },
    },
    {
        name: "First Interaction Delay",
        short: "FID",
        description: (
            <p>
                First Input Delay (FID) is the stable Core Web Vital metric for measuring load
                responsiveness because it quantifies the experience users feel when trying to
                interact with unresponsive pages—a low FID helps ensure that the page is usable. FID
                will be replaced by Interaction to Next Paint (INP) as a Core Web Vital in March
                2024.
            </p>
        ),
        formatter: (data: number) => `${data.toFixed(2)} ms`,
        getRating: (data: number) => {
            const [good, improve] = FIDThresholds;
            return {
                style: getStyle(data, good, improve),
                label: `${data <= good ? "Good" : data <= improve ? "Needs Improvement" : "Poor"}`,
            };
        },
    },
];
