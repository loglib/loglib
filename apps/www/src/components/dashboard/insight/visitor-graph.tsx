import { TimeRange } from "../type"
import { LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function Graph({
  data,
  name,
  isLoading,
  setTimeRange,
  Icon,
}: {
  data: { date: string; visits: number }[]
  name: string
  Icon: LucideIcon
  isLoading: boolean
  setTimeRange: (range: TimeRange) => void
}) {
  const [isMobile, setIsMobile] = useState<boolean>()
  const [, setFilter] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  return (
    <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
      {data.length ? (
        <LineChart
          data={data}
          onClick={(e) => {
            if (!data) return
            const startDate = new Date(
              e.activePayload && e.activePayload[0].payload.originalDate
            )
            startDate.setHours(startDate.getHours() - 1)
            const endDate = new Date(
              e.activePayload && e.activePayload[0].payload.originalDate
            )
            endDate.setHours(endDate.getHours() + 1)
            setTimeRange({
              startDate: new Date(
                e.activePayload && e.activePayload[0].payload.originalDate
              ),
              endDate: new Date(endDate),
              stringValue: "custom",
            })
            setFilter(true)
          }}
        >
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Line dataKey="visits" fill="#fff" label="Visitors" />
          <Tooltip
            contentStyle={{
              backgroundColor: "black",
              borderRadius: "10px",
            }}
            itemStyle={{
              color: "white",
            }}
            label="visitors"
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="custom-tooltip dark:bg-black bg-white/80 px-2 border rounded-md border-gray-700 py-2">
                    <div className=" flex items-center gap-2 dark:text-emphasis text-black">
                      <Icon size={16} />
                      <p className=" font-medium">{`${
                        payload[0] && payload[0].value
                      } ${name}`}</p>
                    </div>
                    <p className="text-gray-400 text-sm">{label}</p>
                  </div>
                )
              }
              return null
            }}
          />
        </LineChart>
      ) : (
        <div className=" flex flex-col justify-center gap-2">
          <div className="text-2xl font-bold text-center ">
            {isLoading ? (
              <p className=" text-sm font-medium italic">hmm loading...</p>
            ) : (
              <>
                <p>No Data Just Yet</p>
                <p className=" text-sm font-light">
                  if you haven`&apos;t setup tracker refer to the{" "}
                  <a
                    href="https://loglib.io/docs"
                    target="_blank"
                    className=" text-blue-700 underline"
                  >
                    doc
                  </a>{" "}
                  on how to do that.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </ResponsiveContainer>
  )
}
