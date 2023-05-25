import { EventType } from "../components/EventTableRow";

export const EventData : EventType[] = [
  {
    id: "1",
    createdAt: new Date("2023-05-24T02:00:00Z"),
    updatedAt: new Date("2023-05-24T02:00:00Z"),
    eventName: "page_view",
    eventType: "event",
    payload: {
      page_url: "https://www.example.com/index.html",
    },
    pageId: "1",
    sessionId: "1234567890",
    userId: "1234567890",
  },
  {
    id: "2",
    createdAt: new Date("2023-05-24T02:01:00Z"),
    updatedAt: new Date("2023-05-24T02:01:00Z"),
    eventName: "click",
    eventType: "event",
    payload: {
      element_id: "button_id",
    },
    pageId: "34",
    sessionId: "1234567890",
    userId: "1234567890",
  },
  {
    id: "3",
    createdAt: new Date("2023-05-24T02:02:00Z"),
    updatedAt: new Date("2023-05-24T02:02:00Z"),
    eventName: "form_submission",
    eventType: "event",
    payload: {
      form_data: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
    },
    pageId: "3",
    sessionId: "1234567890",
    userId: "1234567890",
  },
];

