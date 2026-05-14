"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<"div"> & {
  value?: number | null
}

function getProgressValue(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0
  return Math.min(100, Math.max(0, value))
}

function Progress({
  className,
  children,
  value,
  style,
  ...props
}: ProgressProps) {
  const progressValue = getProgressValue(value)

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progressValue}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      style={
        {
          "--progress-value": `${progressValue}%`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </div>
  )
}

function ProgressTrack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      style={{ width: "var(--progress-value)", ...style }}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
