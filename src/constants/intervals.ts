import type { IntervalDetails } from "@/types/interval"

export const INTERVALS: IntervalDetails[] = [
  {
    halfSteps: 0,
    name: "Unison",
    symbol: "P1",
  },
  {
    halfSteps: 1,
    name: "Half Step",
    symbol: "H",
  },
  {
    halfSteps: 1,
    name: "minor 2nd",
    symbol: "m2",
  },
  {
    halfSteps: 2,
    name: "Whole Step",
    symbol: "W",
  },
  {
    halfSteps: 2,
    name: "Major 2nd",
    symbol: "M2",
  },
  {
    halfSteps: 3,
    name: "Aug 2nd",
    symbol: "A2",
  },
  {
    halfSteps: 3,
    name: "minor 3rd",
    symbol: "m3",
  },
  {
    halfSteps: 4,
    name: "Major 3rd",
    symbol: "M3",
  },
  {
    halfSteps: 5,
    name: "Perfect 4th",
    symbol: "P4",
  },
  {
    halfSteps: 6,
    name: "Aug 4th",
    symbol: "A4",
  },
  {
    halfSteps: 6,
    name: "dim 5th",
    symbol: "d5",
  },
  {
    halfSteps: 7,
    name: "Perfect 5th",
    symbol: "P5",
  },
  {
    halfSteps: 8,
    name: "Aug 5th",
    symbol: "A5",
  },
  {
    halfSteps: 8,
    name: "minor 6th",
    symbol: "m6",
  },
  {
    halfSteps: 9,
    name: "Major 6th",
    symbol: "M6",
  },
  {
    halfSteps: 10,
    name: "minor 7th",
    symbol: "m7",
  },
  {
    halfSteps: 11,
    name: "Major 7th",
    symbol: "M7",
  },
  {
    halfSteps: 12,
    name: "Octave",
    symbol: "P8",
  },
]

export const INTERVAL_NAMES = INTERVALS.map(interval => interval.name)
export const INTERVAL_SYMBOLS = INTERVALS.map(interval => interval.symbol)
