import { OperatorType } from "@loglib/core"

export type TimeRange = {
  startDate: Date
  endDate: Date
  stringValue?: string
}

export type Filter = {
  key: string
  value: string
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  operator: OperatorType<any>
  data: string
}

export type FilterProp = {
  clearFilter: (key: string) => void
  addFilter: (filter: Filter) => void
  isFilterActive: (key: string) => boolean
}
