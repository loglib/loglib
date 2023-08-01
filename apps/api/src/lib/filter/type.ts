import { OperatorType } from "./smallFilter"

export type Filter<T, D> = {
  key: keyof T
  value: T[keyof T]
  operator: OperatorType<T[keyof T]>
  data: D
}
