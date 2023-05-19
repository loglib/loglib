## Requests 


### New Session
Route: `/api/session`
Data: `{
	data: { 
            userAgent: string,
            pathname: string,
            host: string,
            referer: string,
            firstTimeUser: boolean,
            queryParams: object,
            screenWidth: number,
            screenHeight: number,
            language: string | [string],
    },
    userId: string;
    sessionId: string;
}`

### Event
Route: `/api/event`
Data: `{
	data:{  id: string;
            event_name: string;
            event_type: string;
            payload: Record<string, string>;
            page: string;
    },
    sessionId: string;
    userId: string;
}`

### Page View
Route: `/api/pageview`
Data: `{
	data: {     
        currentUrl: string;
        currentRef: string;
        duration: number;
        isLast: boolean;
        isFirst: boolean;
        queryParams: Record<string, string>;
        events: Array<{
            id: string;
            event_name: string;
            event_type: string;
            payload: Record<string, string>;
            page: string;
        }>;
    },
    sessionId: string;
    userId: string;
}`