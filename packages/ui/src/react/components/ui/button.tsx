import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/react/lib/utils"

const buttonVariants = cva(
  "tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-white tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:ring-slate-400 focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800",
  {
    variants: {
      variant: {
        default: "tw-bg-slate-900 text-slate-50 hover:tw-bg-slate-900/90 dark:tw-bg-slate-50 dark:tw-text-slate-900 dark:hover:tw-bg-slate-50/90",
        destructive:
          "tw-bg-red-500 text-slate-50 hover:tw-bg-red-500/90 dark:tw-bg-red-900 dark:tw-text-red-50 dark:hover:bg-red-900/90",
        outline:
          "tw-border tw-border-slate-200 tw-bg-white hover:tw-bg-slate-100 hover:tw-text-slate-900 dark:tw-border-slate-800 dark:tw-bg-slate-950 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-50",
        secondary:
          "tw-bg-slate-100 tw-text-slate-900 hover:tw-bg-slate-100/80 dark:tw-bg-slate-800 dark:tw-text-slate-50 dark:tw-hover:bg-slate-800/80",
        ghost: "hover:tw-bg-slate-100 hover:tw-text-slate-900 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:tw-underline dark:text-slate-50",
      },
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-9 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
