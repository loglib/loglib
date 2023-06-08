import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import Loglib from '@loglib/tracker/react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Loglib config={{
                env: "prod"
            }} />
            <Component {...pageProps} >
            </Component>
        </>

    )
}