---
title: User Consent And Identify Visitor
description: how to identify a visitor
---
By default, Loglib tries to track users using their IP address. But, we know you're smart enough to know relying on IP addresses isn't the most reliable way to identify unique users. So, if you want to track better, here's what you can do:

<Steps>
    ### Step 1

    Display a fancy cookie message on your website. (we'll leave the design up to you but might provide something in the future)

    ### Step 2

    Once your users click that "Accept" button, trigger the Loglib consent function. This will use local storage to assign a unique identifier to each of your users.

    ```js
    import { loglib } from "@loglib/tracker";
    export default function page() {
      return (
        <>
          <button onClick={() => loglib.setConsent("granted")}>Accept</button>
        </>
      );
    }
    ```

    > NOTE: If you don't want to show cookie message, but still want to track using user consent, you can set the consent to "granted" by default.

    ```js
    import LogLib from "@loglib/tracker/react";
    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode,
    }) {
      return (
        <html lang="en">
          <body>
            <LogLib
              config={{
                consent: "granted",
              }}
            />
            {children}
          </body>
        </html>
      );
    }
    ```

</Steps>

### Identify User

To identify a user, you can use the `identify` method.
_this doesn't work unless you have a consent from the user. (more on that below)_

```js
import { loglib } from "@logLib/tracker"
export default function page() {
  return (
    <>
      <button onClick={() => loglib.identify({ id: "1", name: "Joe Rogan" })}>
        Identify
      </button>
    </>
  )
}

// Identify we know this is hot topic
// Yeah just pass an object you want to identify the user with
```
