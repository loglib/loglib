"use client"
import Link from "next/link";


export default function HomePage() {
  return <div>
    <Link href="/example">
      example
    </Link>
    <button>
      click me
    </button>
  </div>;
}
