import type { HTMLProps } from "react"
import type { Note, Notes } from "./notes"
import type { Icon } from "./icon"
import type { INSTRUMENTS } from "@/constants/instruments"

export type InstrumentProps<T extends {} = {}> = HTMLProps<HTMLDivElement> & {
  constantNotes?: Notes
  color?: string
} & T

export interface Instrument {
  id: string
  name: string
  range: [Note, Note]
  icon: Icon
}
