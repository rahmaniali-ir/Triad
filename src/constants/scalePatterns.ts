import type { ScalePatternDetails } from "@/types/scalePattern"
import type { ScalePattern } from "@/types/theory"

export const SINGLE_TONIC_SCALE_PATTERN: ScalePattern = ["P8"]

export const CHROMATIC_SCALE_PATTERN: ScalePattern = [
  "H",
  "H",
  "H",
  "H",
  "H",
  "H",
  "H",
  "H",
  "H",
  "H",
  "H",
  "H",
]

export const MAJOR_PENTATONIC_SCALE_PATTERN: ScalePattern = [
  "W",
  "W",
  "M3",
  "W",
  "M3",
]
export const MINOR_PENTATONIC_SCALE_PATTERN: ScalePattern = [
  "m3",
  "W",
  "W",
  "m3",
  "W",
]

export const PENTATONIC_SCALE_PATTERN: ScalePattern = ["W", "W", "H", "W", "W"]

export const HEXATONIC_SCALE_PATTERN: ScalePattern = [
  "W",
  "W",
  "H",
  "W",
  "W",
  "W",
]

export const MAJOR_SCALE_PATTERN: ScalePattern = [
  "W",
  "W",
  "H",
  "W",
  "W",
  "W",
  "H",
]

export const NATURAL_MINOR_SCALE_PATTERN: ScalePattern = [
  "W",
  "H",
  "W",
  "W",
  "H",
  "W",
  "W",
]

export const HARMONIC_MINOR_SCALE_PATTERN: ScalePattern = [
  "W",
  "H",
  "W",
  "W",
  "H",
  "W",
  "W",
]

export const SCALE_PATTERNS = {
  SINGLE_TONIC: SINGLE_TONIC_SCALE_PATTERN,
  CHROMATIC: CHROMATIC_SCALE_PATTERN,
  MAJOR_PENTATONIC: MAJOR_PENTATONIC_SCALE_PATTERN,
  MINOR_PENTATONIC: MINOR_PENTATONIC_SCALE_PATTERN,
  HEXATONIC: HEXATONIC_SCALE_PATTERN,
  MAJOR: MAJOR_SCALE_PATTERN,
  NATURAL_MINOR: NATURAL_MINOR_SCALE_PATTERN,
  HARMONIC_MINOR: HARMONIC_MINOR_SCALE_PATTERN,
}

export const SCALE_PATTERN_DETAILS: Record<
  keyof typeof SCALE_PATTERNS,
  ScalePatternDetails
> = {
  SINGLE_TONIC: {
    id: "SINGLE_TONIC",
    name: "Single Tonic",
    pattern: SINGLE_TONIC_SCALE_PATTERN,
  },
  CHROMATIC: {
    id: "CHROMATIC",
    name: "Chromatic",
    pattern: CHROMATIC_SCALE_PATTERN,
  },
  MAJOR_PENTATONIC: {
    id: "MAJOR_PENTATONIC",
    name: "Major Pentatonic",
    pattern: MAJOR_PENTATONIC_SCALE_PATTERN,
  },
  MINOR_PENTATONIC: {
    id: "MINOR_PENTATONIC",
    name: "Minor Pentatonic",
    pattern: MINOR_PENTATONIC_SCALE_PATTERN,
  },
  HEXATONIC: {
    id: "HEXATONIC",
    name: "Hexatonic",
    pattern: HEXATONIC_SCALE_PATTERN,
  },
  MAJOR: {
    id: "MAJOR",
    name: "Major",
    pattern: MAJOR_SCALE_PATTERN,
  },
  NATURAL_MINOR: {
    id: "NATURAL_MINOR",
    name: "Natural Minor",
    pattern: NATURAL_MINOR_SCALE_PATTERN,
  },
  HARMONIC_MINOR: {
    id: "HARMONIC_MINOR",
    name: "Harmonic Minor",
    pattern: HARMONIC_MINOR_SCALE_PATTERN,
  },
}

export const SCALE_PATTERN_DETAILS_LIST = Object.values(SCALE_PATTERN_DETAILS)
