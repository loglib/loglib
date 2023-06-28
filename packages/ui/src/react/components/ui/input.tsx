import * as React from "react"

import { cn } from "@/react/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "tw-flex tw-h-10 tw-w-full tw-rounded-md tw-border  tw-border-slate-200 tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-white file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-slate-500 focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-slate-400 focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 dark:tw-border-slate-800 dark:tw-bg-slate-950 dark:tw-ring-offset-slate-950 dark:placeholder:tw-text-slate-400 dark:focus-visible:tw-ring-slate-800",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
