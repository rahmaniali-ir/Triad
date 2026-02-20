import type { ScalePattern } from "@/types/theory"

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

export const SCALE_PATTERNS = {
  CHROMATIC: CHROMATIC_SCALE_PATTERN,
  MAJOR: MAJOR_SCALE_PATTERN,
  NATURAL_MINOR: NATURAL_MINOR_SCALE_PATTERN,
}
