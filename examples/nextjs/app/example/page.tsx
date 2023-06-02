"use client";

import { logLib } from "@loglib/tracker"
import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1>Page</h1>
            <button onClick={() => logLib.track("some button is clicked", {
                username: "bereket"
            })}>
                btn I should track
            </button>
            <Link href="/">
                GO Home
            </Link>
        </div>
    )
}