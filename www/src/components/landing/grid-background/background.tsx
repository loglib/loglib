"use client"

import { ReactNode } from "react"
import styles from "./background.module.css"

export default function Background() {
  return (
    <div className={styles.main}>
      <div className={styles.content} />
    </div>
  )
}
