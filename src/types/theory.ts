import type { Notes } from "./notes"

export type Whole = "W"
export type Half = "H"

export type Step = Whole | Half

export type ScalePattern = Step[]

export type Scale = Notes
