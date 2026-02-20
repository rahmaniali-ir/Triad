import type { HTMLProps } from "react"
import type { Notes } from "./notes"

export type InstrumentProps<T extends {} = {}> = HTMLProps<HTMLDivElement> & {
  constantNotes?: Notes
} & T
