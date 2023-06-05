# LogLib

## Yet Another Web Analytics Tool

![npm](https://img.shields.io/npm/v/@loglib/tracker) ![npm bundle size](https://img.shields.io/bundlephobia/min/@loglib/tracker) ![GitHub license](https://img.shields.io/github/license/LogLib/loglib) ![GitHub issues](https://img.shields.io/github/issues/LogLib/loglib) ![GitHub stars](https://img.shields.io/github/stars/LogLib/loglib)

<p align="center" class="dark-mode">
  <img src="./images/light-logo.png#gh-dark-mode-only" alt="screenshot" height="350" />
</p>

<p align="center" class="light-mode">
  <img src="./images/dark-logo.png#gh-light-mode-only" alt="screenshot" height="350" />
</p>

> ⚠️ Under Construction put here incase anyone visits this repo before it's ready.

**Loglib is a web analytics tool that helps you track your website's analytics. It's a privacy-first, built for js frameworks ecosystem and it's open source. here are more reasons you might wanna consider loglib for your project:**

- Why not?
- No need to deploy it separately. You can easily attach Loglib to your Next js app (more framework support soon), and you can see your website analytics. (despite having 0 users)
- Keep all your data in your existing database, you have the freedom to store your data in your existing db or your choice of db. We currently support prisma and supabase adapters but more supports are on the way.
- A beautiful dashboard built with Shadcn UI.
- Privacy first GDPR compliant out of the box but can be customized.
- You can see basic analytics like vercel analytics but also events aren't paid and it's better than...
- Your mom will be impressed.
- And more things are on the way.


### Quick Links
<div>
<p>
  <a href="#Tracker">
  <strong style="color:blue;">
Tracker
  </strong>
  </a>
</p>
<p>
  <a href="#Prisma">
  <strong style="color:blue;">
  Server with Prisma
  </strong>
  </a>
</p>
<p>
  <a href="#Supabase">
  <strong style="color:blue;">
  Server with Supabase
  </strong>
  </a>
</p>
<p>
  <a href="#Dashboard">
  <strong style="color:blue;">
  Dashboard
  </strong>
  </a>
</p>
</div>


## Get Started

Loglib is consist of three things:

1. **Tracker**: This component tracks your website's analytics.
2. **Loglib Server**: It handles requests without requiring a separate deployment if you already have a backend.
3. **Loglib Dashboard**: It offers a beautiful, minimalistic UI to display your analytics.
  
The idea is that you can integrate a tracker into your website, similar to other analytics tools. However, instead of sending the data to a third-party server or a separately deployed thing like umami (which we love), it is sent to your current server, which can be set up as an endpoint in your Next.js application (other alternatives in the near future). Then, you can utilize a dashboard that is currently built as a React component (again more frameworks soon). You can export this component as page, enabling you to conveniently view and analyze your website analytics.

### Installation: Just like every other libraries out there

```bash
pnpm add @loglib/tracker
```

```bash
pnpm add @loglib/next
```

```bash
pnpm add @loglib/ui
```

## Tracker

let's first setup the tracker to collect data from your website.

### Next-js

App Route

`src/app/layout.tsx`

```js
import LogLib from '@loglib/tracker/react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
         <LogLib config={{
          //  your config here
         }} />
        {children}
      </body>
    </html>
  )
}
```

Page Route

`src/pages/_app.tsx`

```js
import LogLib from '@loglib/tracker';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LogLib config={{}} />
      <Component {...pageProps} />
    </>
  )
}
```

> IMPORTANT: By default the tracker will send data to the loglib server at the current url on route `/api/loglib` if you need to change that you can put LOGLIB_URL in your environment variables with the full path.

### Other Methods

If you want to track a specific event, you can use the `track` method.

```js
import {loglib} from '@loglib/tracker';
export default function page() {
  return (
    <>
      <button onClick={() => loglib.track("search", {term: "iphone"})}>Search</button>
    </>
  )
}
```

To identify a user, you can use the `identify` method.
*this doesn't work unless you have a consent from the user. (more on that below)*

```js
import {loglib} from '@logLib/tracker';
export default function page() {
  return (
    <>
      <button onClick={() => loglib.identify({id: "1", name: "Joe Rogan"})}>Identify</button>
    </>
  )
}

// Identify we know this is hot topic
// Yeah just pass an object you want to identify the user with
```

### User Concent

By default, Loglib tries to track users using their IP address. But, we know you're smart enough to know relying on IP addresses isn't the most reliable way to identify unique users. So, if you want to track better, here's what you can do:

**Step 1:** Display a fancy cookie message on your website. (we'll leave the design up to you but might provide something in the future)

**Step 2**: Once your users click that "Accept" button, trigger the Loglib consent function. This will use local storage to assign a unique identifier to each of your users.

```js
import {loglib} from '@loglib/tracker';
export default function page() {
  return (
    <>
      <button onClick={() => loglib.setConsent("granted")}>Accept</button>
    </>
  )
}
```

> NOTE: If you don't want to show cookie message, but still want to track using user consent, you can set the consent to "granted" by default.

```js
import LogLib from '@loglib/tracker/react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
         <LogLib config={{
            consent: "granted"
         }} />
        {children}
      </body>
    </html>
  )
}
```

| options        | type    | default     | description                               |
| -------------- | ------- | ----------- | ----------------------------------------- |
| `autoTrack`    | boolean | `false`     | Automatically track click events with onclick handlers and on buttons         |
| `consent`      | string  | `"granted"` | The consent status of the user            |
| `debug`        | boolean | `false`     | Enable debug mode                         |
| `env`          | string  | `"auto"`    | The environment of the tracker            |          |
| `postInterval` | number  | `5`         | The interval to send events to the server |

### Other Frameworks

if you're not using next js or react you can use the vanilla version of the tracker that works on any framework just call the record function on the entry point of your application here is example for astro.

```js
<script>
  import {record} from '@loglib/tracker-js';
  record({
    // your config here
  })
</script>
```

> NOTE: currently you can't use loglib server or dashboard in other frameworks other than next js or react but you can attach the dashboard on astro since you can use react in astro and we'll provide astro server soon. And you can always deploy a new next js project separated from your main project and use it as a dashboard and a server. See the example folder for more.

## Server

first you need to setup a database and an adapter for the server to work.
> we currently only support prisma and supabase adapters but more adapters are on the way.

### Prisma

```bash
pnpm add @loglib/prisma-adapter
```

copy this schema to your schema file

#### Relational DB

```prisma
model WebUser {
    id        String   @id @default(cuid())
    data      String   @default("{}")
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")

    Session  WebSession[]
    Pageview WebPageview[]
    WebEvent WebEvent[]

    @@map("web_user")
}

model WebSession {
    id          String        @id @default(cuid())
    createdAt   DateTime      @default(now()) @map("created_at")
    updatedAt   DateTime      @updatedAt @map("updated_at")
    referrer    String        @default("")
    queryParams String        @default("") @map("query_params")
    duration    Int           @default(0)
    country     String?
    city        String?
    device      String?
    os          String?
    browser     String?
    language    String?
    userId      String        @map("user_id")
    Page        WebPageview[]

    User     WebUser    @relation(fields: [userId], references: [id], onDelete: Cascade)
    WebEvent WebEvent[]

    @@map("web_session")
}

model WebPageview {
    id          String   @id @default(cuid())
    createdAt   DateTime @default(now()) @map("created_at")
    updatedAt   DateTime @updatedAt @map("updated_at")
    page        String
    referrer    String   @default("")
    queryParams String   @default("{}") @map("query_params")
    duration    Int      @default(0)
    sessionId   String   @map("web_session_id")
    userId      String   @map("user_id")

    Event      WebEvent[]
    WebSession WebSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
    User       WebUser    @relation(fields: [userId], references: [id], onDelete: Cascade)

    @@map("web_pageview")
}

model WebEvent {
    id        String   @id @default(cuid())
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    eventType String   @map("event_type")
    eventName String   @map("event_name")
    payload   String   @default("")
    pageId    String   @map("page_id")
    sessionId String   @map("web_session_id")
    userId    String   @map("user_id")

    Page       WebPageview @relation(fields: [pageId], references: [id], onDelete: Cascade)
    User       WebUser     @relation(fields: [userId], references: [id], onDelete: Cascade)
    WebSession WebSession  @relation(fields: [sessionId], references: [id], onDelete: Cascade)

    @@map("web_event")
}
```
#### Mongo DB

comming soon

#### app route

put this code in `src/app/loglib/api/route.ts` I know the route isn't ideal if you want to change it something else just put `LOGLIB_URL` in your env file with the full url path.

```js
import { createServerRoutes } from "@loglib/next"
import { prismaAdapter } from "@loglib/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()


export const { POST, GET } = createServerRoutes({
    adapter: prismaAdapter(db)
})
```

#### pages route

put this code in `src/pages/api/loglib.ts`

if you wan

```js
import { createServer } from '@loglib/next';
import { PrismaClient } from '@prisma/client';
import {prismaAdapter} from '@loglib/prisma-adapter';

const prisma = new PrismaClient();

export default createServer({
  adapter: prismaAdapter(prisma),
});
```

### Supabase

```bash
pnpm add @loglib/supabase-adapter
```
```sql
create table if not exists
  public.web_user (
    id text not null,
    data text not null default '{}'::text,
    created_at timestamp without time zone not null default current_timestamp,
    updated_at timestamp without time zone not null,
    constraint web_user_pkey primary key (id)
  ) tablespace pg_default;

create table if not exists
  public.web_session (
    id text not null,
    created_at timestamp with time zone not null,
    updated_at timestamp with time zone not null,
    referrer text not null default ''::text,
    query_params text not null default ''::text,
    duration integer not null default 0,
    country text null,
    city text null,
    device text null,
    os text null,
    browser text null,
    language text null,
    user_id text not null,
    constraint web_session_pkey primary key (id),
    constraint web_session_user_id_fkey foreign key (user_id) references web_user (id) on update cascade on delete cascade
  ) tablespace pg_default;


create table if not exists
  public.web_pageview (
    id text not null,
    created_at timestamp without time zone not null default current_timestamp,
    updated_at timestamp without time zone not null,
    page text not null,
    referrer text not null default ''::text,
    query_params text not null default ''::text,
    duration integer not null default 0,
    session_id text not null,
    user_id text not null,
    constraint web_page_pkey primary key (id),
    constraint web_pageview_session_id_fkey foreign key (session_id) references web_session (id) on delete cascade,
    constraint web_pageview_user_id_fkey foreign key (user_id) references web_user (id) on delete cascade
  ) tablespace pg_default;

create table if not exists
  public.web_event (
    id text not null,
    created_at timestamp without time zone not null default current_timestamp,
    updated_at timestamp without time zone not null,
    event_type text not null,
    event_name text not null,
    payload text not null default ''::text,
    page_id text not null,
    session_id text not null,
    user_id text not null,
    constraint web_event_pkey primary key (id),
    constraint web_event_page_id_fkey foreign key (page_id) references web_pageview (id) on update cascade on delete cascade,
    constraint web_event_session_id_fkey foreign key (session_id) references web_session (id) on delete cascade,
    constraint web_event_user_id_fkey foreign key (user_id) references web_user (id) on update cascade on delete cascade
  ) tablespace pg_default;
 
```
#### app route

```js
import { createServerRoutes } from "@loglib/next"
import { supabaseAdapter } from "@loglib/supabase-adapter"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);


export const { POST, GET } = createServerRoutes({
    adapter: supabaseAdapter(supabase)
})

```

#### pages route

```js
import { createServer } from '@loglib/next';
import { createClient } from '@supabase/supabase-js';
import {supabaseAdapter} from '@loglib/supabase-adapter';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);

export default createServer({
  adapter: supabaseAdapter(supabase),
});
```

for getting user location using their ip you have 3 options:

1. Deploy it in vercel and that's it!
2. If you're not deploying it on serverless environment you can setup maxmind using a cli command

```bash
pnpm loglib setup:maxmind
```

> this will download the maxmind database and put it in your project root directory under geo folder.

3. you can pass a custom function to get location

```js
import { createServer } from '@loglib/next';
import { PrismaClient } from '@prisma/client';
import {prismaAdapter} from '@loglib/prisma-adapter';

const db = new PrismaClient();
const POST = Next13({
    adapter: prismaAdapter(db),
    getLocation: async (ip) => {
        // do your thing
        return {
            city: "city",
            country: "country",
        }
    }
})
```

| options        | type    | default     | description                               |
| -------------- | ------- | ----------- | ----------------------------------------- |
| `adapter`    | Adapter | `none`     |  a database adapter
| `getLocation`      | function  | `none` | a custom location finder using ip address           |                        |
| `disableLocation`          | boolean | `false`    | to disable location resolver

okay now you're tracker is up and your server is listening!!

## Dashboard

now let's get this bad boy to display something

create a page somewhere you want too and just export the dashboard component

```js
"use client"; //for next 13 only

import { Dashboard } from '@loglib/ui';
import "@loglib/ui/dist/index.css"

export default Dashboard;
```

> NOTE: you probably want to protect this route with some kind of authentication. Either by using a middleware or export the dashboard component inside a protected route.

yeah that's it now you have a tracker, a server to handle your request and a beautiful dashboard to display your analytics!!!
