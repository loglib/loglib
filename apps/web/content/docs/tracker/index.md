---
title: Setting up tracker
description: Loglib tracker
---

this is the tracker package for loglib, it's a simple package that you can use to track events in your application.

Start by installing the package

```bash
pnpm i @loglib/tracker
```

## NextJS

usage with nextjs

<Tabs items={["app-route", "pages"]}>
  <Tab value="app-route">
    `src/app/layout.tsx`

    ```ts
    import LogLib from "@loglib/tracker/react";
    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>
            <LogLib
              config={
                {
                 id: //your website Id
                }
              }
            />
            {children}
          </body>
        </html>
      );
    }
    ```

  </Tab>
  <Tab value="pages">
    `src/pages/_app.tsx`

    ```js
    import LogLib from "@loglib/tracker";
    export default function App({ Component, pageProps }: AppProps) {
      return (
        <>
          <LogLib config={{}} />
          <Component {...pageProps} />
        </>
      );
    }
    ```

  </Tab>
</Tabs>

## Other Frameworks

if you're not using next js or react you can use the vanilla version of the tracker that works on any framework just call the record function on the entry point of your application here is example for astro.

```js
<script>
  import {loglib} from '@loglib/tracker';
  loglib.record(
  {
    id: //your website id,
  })
</script>
```

## CDN

To use loglib via the CDN, simply copy the following code into your script tag and replace the host with your deployed version:

> Note that if you don't want to collect development logs, you can pass the env parameter as isDev(your way to know if it's development server) ? "dev": "prod"

```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/@loglib/tracker@latest/dist/index.global.js" data-id="your website id"></script>
</head>
```
