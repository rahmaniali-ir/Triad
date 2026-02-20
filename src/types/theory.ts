import type { Notes } from "./notes"

export type Unison = "P1"

export type Half = "H"
export type Whole = "W"

export type MinorSecond = "m2"
export type MajorSecond = "M2"
export type MinorThird = "m3"
export type MajorThird = "M3"
export type PerfectFourth = "P4"
export type Tritone = "TT"
export type PerfectFifth = "P5"
export type MinorSixth = "m6"
export type MajorSixth = "M6"
export type MinorSeventh = "m7"
export type MajorSeventh = "M7"
export type Octave = "P8"

export type Interval =
  | Unison
  | Half
  | MinorSecond
  | Whole
  | MajorSecond
  | MinorThird
  | MajorThird
  | PerfectFourth
  | Tritone
  | PerfectFifth
  | MinorSixth
  | MajorSixth
  | MinorSeventh
  | MajorSeventh
  | Octave

export type ScalePattern = Interval[]

export type Scale = Notes
