## LogLib JS Library


### Installation: Just like every other library!

```bash
pnpm add @loglib/tracker-js
#or
yarn add @loglib/tracker-js
#or
npm install @loglib/tracker-js
```

### Basic Usage

### Next-js

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
      <body
        className={`${neueHaasGroteskDisplayPro.variable} ${helveticaNeue.variable} font-neueHaas`}
      >
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

### Other Methods
If you want to track a specific event, you can use the `trackEvent` method.

```js
import {track} from 'logLib/tracker-js';
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
import {identify} from 'logLib/tracker-js';
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

To group a user, you can use the `group` method.

```js
import {group} from 'logLib/tracker-js';
export default function page() {
  return (
    <>
      <button onClick={() => group("user-123", "group-123")}>Group</button>
    </>
  )
}
```


### Other Frameworks

- On other frameworks, you can use the `record` method to initialize the  
- The record method should be called on mount of the app. 
- And you should pass the env to the record method. Here is a simple example:
```js
import {record} from 'logLib/tracker-js';
import {env} from "eviroment";
<script>
  record({autoTrack: true, env: env === "production" ? "prod" : "dev"});
</script>
```

vue example:
```js
import {record} from 'logLib/tracker-js';
export default {
  mounted() {
    record({autoTrack: true});
  }
}
```

svelte example:
```js
import {record} from 'logLib/tracker-js';
onMount(() => {
  record({ autoTrack: true });
});
```

angular example:
```js
import { Component, OnInit } from '@angular/core';
import { record } from 'logLib/tracker-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to my app!</h1>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {
    record({ autoTrack: true, env: environment.production ? 'prod' : 'dev' });
  }
}

// Even if you're angular user, we won't judge. 
// We'll still provide exmaple!
// Not sure if it works honestly it's GPD 4
```

### CDN
You can also use the CDN version of the library. Here is an example:
```html
<script src="https://cdn.jsdelivr.net/npm/@loglib/tracker-js"></script>
<script>
  LogLib.record({autoTrack: true});
</script>
```

### Advanced Usage
If you want to ask for permission to track a user, do the following:
1. Initialize the tracker with `consent: "pending"`
```js
import LogLib from 'logLib/tracker-js/react';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${neueHaasGroteskDisplayPro.variable} ${helveticaNeue.variable} font-neueHaas`}
      >
         <LogLib config={{consent: "pending"}} />
        {children}
      </body>
    </html>
  )
}
```
2. When the user accepts, call `setConsent("granted")`
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