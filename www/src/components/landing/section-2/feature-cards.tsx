"use client"
import { Graph } from "./feature-graph"
import { InsightTables } from "./feature-insight-table"

export const FeatureCards = () => {
  return (
    <div className=" flex items-center justify-center gap-4 w-full flex-col md:flex-row">
      <InsightTables />
      {/* <InsightTables /> */}
      <Graph />
    </div>
  )
}
