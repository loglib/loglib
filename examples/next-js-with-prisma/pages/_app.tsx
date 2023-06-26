import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Loglib from "@loglib/tracker/react"

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Loglib config={{
      debug: true,
      env: "prod",
      host: "http://localhost:3000",
      id: "loglib_vercel",
    }} />
    <Component {...pageProps} />
  </>
}
