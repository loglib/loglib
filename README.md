# LogLib

## Yet another web analytics tool but for Javascript Frameworks

![screenshot](./examples/screenshot/dashboard.png)

> Note: we currently support Next.js only. More frameworks are on the way!

### Why Choose Loglib?

- Why not? Let's add another tool to our never-ending collection!
- No need to deploy it separately. You can easily attach Loglib to your Next js app (and more frameworks are on the way), saving you time and effort.
- Keep all your data in your existing database, you have the freedom to store your data in your existing db. And this will help you like if your platform displays analytics for users, you can track events or pageviews using the tracker and provide them with detailed analytics.
- A beautiful dashboard built with Shadcn UI.
- Privacy first GDPR compliant out of the box but can be customized.

And if the above statements didn't make you giggle or raise an eyebrow, well, maybe Loglib isn't the right match for you. But hey, no hard feelings! We understand that not every tool is a match made for larvel apps. woo that come out of nowhere.

### Get Started

Loglib is consist of three things:

1. **Tracker**: This component tracks your website's analytics.
2. **Loglib Server**: It handles requests without requiring a separate deployment if you already have a backend.
3. **Loglib Dashboard**: It offers a beautiful, minimalistic UI to display your analytics.

you can put any of those anywhere means you can put the tracker on ur website put the server on other next js project then put the dashboard on separate next js project and it will work just fine. Or you can just put everything on your next js project. I think the later sounds better but it's up to you.

#### Installation: Just like every other libraries out there

```bash
pnpm add @loglib/tracker
```

```bash
pnpm add @loglib/next
```

```bash
pnpm add @loglib/ui
```

#### Tracker

let's first setup the tracker to collect data from your website.

##### Next-js

App Route

```js
import LogLib from 'logLib/tracker-js/react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
         <LogLib config={{autoTrack: true}} />
        {children}
      </body>
    </html>
  )
}

// Boom! That's it! You're done!
```

Page Route

```js
import LogLib from 'logLib/tracker-js';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LogLib config={{autoTrack: true}} />
      <Component {...pageProps} />
    </>
  )
}
```

##### Other Methods

If you want to track a specific event, you can use the `track` method.

```js
import {track} from 'logLib/tracker-js/react';
export default function page() {
  return (
    <>
      <button onClick={() => track("search", {term: "iphone"})}>Search</button>
    </>
  )
}
```

To identify a user, you can use the `identify` method.

```js
import {identify} from 'logLib/tracker-js/react';
export default function page() {
  return (
    <>
      <button onClick={() => identify({id: "1", name: "Joe Rogan"})}>Identify</button>
    </>
  )
}

// Identify we know this is hot topic
// Yeah just pass an object you want to identify the user with
```

##### GDPR things

By default, Loglib tries to track users using their IP address. But hey, we know you're smart enough to realize that relying on IP addresses isn't the most foolproof way to identify unique users. So, if you want to be a tracking superstar, here's what you can do:

**Step 1:** Display a fancy cookie message on your website. You know, one of those pop-ups that everyone loves. Make it irresistible!

For permission to track a user, do the following:

```js
import {setConsent} from 'logLib/tracker-js';
export default function page() {
  return (
    <>
      <button onClick={() => setConsent("granted")}>Accept</button>
    </>
  )
}
```

| options        | type    | default     | description                               |
| -------------- | ------- | ----------- | ----------------------------------------- |
| `autoTrack`    | boolean | `false`     | Automatically track page views            |
| `consent`      | string  | `"granted"` | The consent status of the user            |
| `debug`        | boolean | `false`     | Enable debug mode                         |
| `env`          | string  | `"auto"`    | The environment of the tracker            |
| `postInterval` | number  | `5`         | The interval to send events to the server |

#### Server

> we currently only support prisma but more adapters are on the way

##### pages route

put this code in `src/pages/api/loglib.ts`

```js
import { createServer } from '@loglib/next';
import { PrismaClient } from '@prisma/client';
import {prismaAdapter} from '@loglib/prisma-adapter';

const prisma = new PrismaClient();

export default createServer({
  adapter: prismaAdapter(prisma),
});
```

##### app route

put this code in `src/app/loglib/api/route.ts` I know the route isn't ideal if you want to change it something else just put `LOGLIB_SERVER_URL` in your env file and it will work just fine

```js
import { Next13 } from "@loglib/next"
import { prismaAdapter } from "@loglib/prisma-adapter"
import { PrismaClient } from "@prisma/client"


const db = new PrismaClient()
const POST = Next13({
    adapter: prismaAdapter(db),
})
const GET = Next13({
    adapter: prismaAdapter(db),
})
export { POST, GET }
```

for getting user location using their ip you have 3 options:

1. Deploy it in vercel and you don't need to worry! (vercel please sponsor us)
2. If you're not deploying it on serverless environment you can setup maxmind using a cli command

```bash
pnpm loglib setup-maxmind
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

#### Dashboard

now let's get this bad boy to display something

create a page somewhere you want too and just export the dashboard component

```js
import { Dashboard } from '@loglib/ui';
import "@loglib/ui/dist/index.css"

export default Dashboard;
```

yeah that's it now you have a tracker, a server to handle your request and a beautiful dashboard to display your analytics!!!