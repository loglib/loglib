import { LucideIcon, User2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    data: "2Am",
    visits: 10,
  },
  {
    data: "5Am",
    visits: 23,
  },
  {
    data: "12am",
    visits: 30,
  },
  {
    data: "1pm",
    visits: 20,
  },
  {
    data: "3am",
    visits: 50,
  },
]

export function DemoGraph() {
  const [isMobile, setIsMobile] = useState<boolean>()
  const [, setFilter] = useState(false)
  const isLoading = false
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])
  return (
    <ResponsiveContainer width="100%" height={isMobile ? 100 : 200}>
      {data.length ? (
        <LineChart data={data}>
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
                  <div className="tw-custom-tooltip dark:tw-bg-black tw-bg-white/80 tw-px-2 tw-border tw-rounded-md tw-border-gray-700 tw-py-2">
                    <div className=" tw-flex tw-items-center tw-gap-2 dark:tw-text-emphasis tw-text-black">
                      <User2 size={16} />
                      <p className=" tw-font-medium">{`${
                        payload[0] && payload[0].value
                      } ${"visitors"}`}</p>
                    </div>
                    <p className="tw-text-gray-400 tw-text-sm">{label}</p>
                  </div>
                )
              }
              return null
            }}
          />
        </LineChart>
      ) : (
        <div className=" tw-flex tw-flex-col tw-justify-center tw-gap-2">
          <div className="tw-text-2xl tw-font-bold tw-text-center ">
            {isLoading ? (
              <p className=" tw-text-sm tw-font-medium tw-italic">
                hmm loading...
              </p>
            ) : (
              <>
                <p>No Data Just Yet</p>
                <p className=" tw-text-sm tw-font-light">
                  if you haven't setup tracker refer to the{" "}
                  <a
                    href="https://docs.loglib.io"
                    target="_blank"
                    className=" tw-text-blue-700 tw-underline"
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
