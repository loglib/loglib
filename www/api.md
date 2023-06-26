# Loglib API Documentation

This is a documentation for loglib api until we merge with docs.

Note: The API request body follows a syntax that matches Prisma's findMany query. We have made efforts to support most of the common API functionalities. Even if you're not familiar with Prisma, don't worry! This API provides you with simple and granular access to your logs, similar to accessing your database.

On all request apiKey is required and other fields are optional.

### Sessions

path: https://loglib.io/api/v1/session

method: POST

request body:

```json
{
  "apiKey": "string", //required
  "take": 10,
  "skip": 0,
  "orderBy": {
    "createdAt": "desc"
  },
  "where": {
    "id": "string",
    "createdAt": {
      "gt": "string",
      "lt": "string",
      "gte": "string",
      "lte": "string"
    },
    "device": "string",
    "city": "string",
    "country": "string",
    "referrer": "string",
    "browser": "string",
    "os": "string",
    "visitorId": "string",
    "pageviewId": "string"
  },
  "include": {
    "pageview": false,
    "event": false,
    "visitors": false
  }
}
```

apiKey (string, required): Represents the API key.

take (number, optional, default: 10): Specifies the maximum number of results to return.

skip (number, optional, default: 0): Specifies the number of results to skip.

orderBy (object, optional, default: { "createdAt": "desc" }): Specifies the field to order the results by and the sort order. Valid field values are "createdAt", "updatedAt", "id", "device", "os". Valid sort order values are "asc" and "desc".

where (object, optional, default: {}): Contains optional filters for the query. Properties include:

id (string, optional): Filters by ID.

createdAt (object, optional): Filters based on createdAt timestamps using the following operators: "gt" (greater than), "lt" (less than), "gte" (greater than or equal to), "lte" (less than or equal to). The values should be strings in ISO format.

device, city, country, referrer, browser, os, visitorId, pageviewId (strings, optional): Filters based on corresponding fields.

include (object, optional, default: { "pageview": false, "event": false, "visitors": false }): Specifies which related entities to include in the results. Properties include: "pageview", "event", "visitors". By default, all properties are set to false.

### Pageview

path: https://loglib.io/api/v1/pageview

method: POST

request body:

```json
{
  "apiKey": "string",
  "take": 10,
  "skip": 0,
  "orderBy": {
    "createdAt": "desc"
  },
  "where": {
    "id": "string",
    "createdAt": {
      "gt": "string",
      "lt": "string",
      "gte": "string",
      "lte": "string"
    },
    "sessionId": "string",
    "visitorId": "string",
    "page": "string"
  },
  "include": {
    "session": false,
    "event": false,
    "visitors": false
  }
}
```

apiKey (string, required): Represents the API key.

take (number, optional, default: 10): Specifies the maximum number of results to return.

skip (number, optional, default: 0): Specifies the number of results to skip.

orderBy (object, optional, default: { "createdAt": "desc" }): Specifies the field to order the results by and the sort order. Valid field values are "createdAt", "updatedAt", "id", "page". Valid sort order values are "asc" and "desc".

where (object, optional, default: {}): Contains optional filters for the query. Properties include:

id (string, optional): Filters by ID.

createdAt (object, optional): Filters based on createdAt timestamps using the following operators: "gt" (greater than), "lt" (less than), "gte" (greater than or equal to), "lte" (less than or equal to). The values should be strings in ISO format.

sessionId, visitorId, page (strings, optional): Filters based on corresponding fields.

include (object, optional, default: { "session": false, "event": false, "visitors": false }): Specifies which related entities to include in the results. Properties include: "session", "event", "visitors". By default, all properties are set to false.

### Events

path: https://loglib.io/api/v1/event

method: POST

```json
{
  "apiKey": "string",
  "take": 10,
  "skip": 0,
  "orderBy": {
    "createdAt": "desc"
  },
  "where": {
    "id": "string",
    "sessionId": "string",
    "page": "string",
    "visitorId": "string"
  },
  "include": {
    "session": false
  }
}
```

apiKey (string, required): Represents the API key.

take (number, optional, default: 10): Specifies the maximum number of results to return.

skip (number, optional, default: 0): Specifies the number of results to skip.

orderBy (object, optional, default: { "createdAt": "desc" }): Specifies the field to order the results by and the sort order. Valid field values are "createdAt", "updatedAt", "id". Valid sort order values are "asc" and "desc".

where (object, optional, default: {}): Contains optional filters for the query. Properties include:

id (string, optional): Filters by ID.

sessionId, page, visitorId (strings, optional): Filters based on corresponding fields.

include (object, optional, default: { "session": false }): Specifies which related entities to include in the results. Properties include: "session". By default, the property is set to false.

Visitors

path: https://loglib.io/api/v1/event

method: POST

```json
{
  "apiKey": "string",
  "take": 10,
  "skip": 0,
  "orderBy": {
    "createdAt": "desc"
  },
  "where": {
    "id": "string",
    "createdAt": {
      "gt": "string",
      "lt": "string",
      "gte": "string",
      "lte": "string"
    },
    "payload": {
      "key1": "value1",
      "key2": "value2"
    }
  },
  "include": {
    "pageview": false,
    "event": false,
    "session": false
  }
}
```

apiKey (string, required): Represents the API key.

take (number, optional, default: 10): Specifies the maximum number of results to return.

skip (number, optional, default: 0): Specifies the number of results to skip.

orderBy (object, optional, default: { "createdAt": "desc" }): Specifies the field to order the results by and the sort order. Valid field values are "createdAt", "updatedAt", "id", "device", "os". Valid sort order values are "asc" and "desc".

where (object, optional, default: {}): Contains optional filters for the query. Properties include:

id (string, optional): Filters by ID.

createdAt (object, optional): Filters based on createdAt timestamps using the following operators: "gt" (greater than), "lt" (less than), "gte" (greater than or equal to), "lte" (less than or equal to). The values should be strings in ISO format.

payload (object, optional): Filters based on payload key-value pairs. The payload object should contain one or more key-value pairs.

include (object, optional, default: { "pageview": false, "event": false, "session": false }): Specifies which related entities to include in the results. Properties include: "pageview", "event", "session". By default, all properties are set to false.
