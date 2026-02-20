import { INTERVALS } from "@/constants/intervals"
import {
  MAJOR_SCALE_PATTERN,
  NATURAL_MINOR_SCALE_PATTERN,
} from "@/constants/scalePatterns"
import { CHROMATIC_SCALE } from "@/constants/theory"
import type { Interval } from "@/types/interval"
import type { Note } from "@/types/notes"
import type { Scale, ScalePattern } from "@/types/theory"

export function getNoteInterval(
  note: Note,
  interval:
    | Pick<Interval, "halfSteps">
    | Pick<Interval, "name">
    | Pick<Interval, "symbol">,
): Note {
  let newNoteIndex = CHROMATIC_SCALE.findIndex(n => n === note)

  if ("halfSteps" in interval) {
    const { halfSteps } = interval

    const index = newNoteIndex + halfSteps
    newNoteIndex = index % CHROMATIC_SCALE.length
  } else if ("symbol" in interval) {
    const { symbol } = interval

    const halfSteps = INTERVALS.find(i => i.symbol === symbol)?.halfSteps ?? 0
    newNoteIndex = halfSteps % CHROMATIC_SCALE.length
  } else if ("name" in interval) {
    const { name } = interval

    const halfSteps = INTERVALS.find(i => i.name === name)?.halfSteps ?? 0
    newNoteIndex = halfSteps % CHROMATIC_SCALE.length
  }

  return CHROMATIC_SCALE[newNoteIndex]
}

export function getScaleFromPattern(pattern: ScalePattern, tonic: Note): Scale {
  const scale: Scale = [tonic]

  let currentNote = tonic

  for (const step of pattern) {
    if (step === "W") {
      currentNote = getNoteInterval(currentNote, { halfSteps: 2 })
    } else if (step === "H") {
      currentNote = getNoteInterval(currentNote, { halfSteps: 1 })
    }

    scale.push(currentNote)
  }

  return scale
}

export const getMajorScale = (root: Note) =>
  getScaleFromPattern(MAJOR_SCALE_PATTERN, root)

export const getNatrualMinorScale = (root: Note) =>
  getScaleFromPattern(NATURAL_MINOR_SCALE_PATTERN, root)

// export const getHarmonicMinorScale = (root: Note) =>
//   getScaleFromPattern(HARMONIC_MINOR_SCALE_PATTERN, root)

export const getNoteColor = (n: Note) => {
  const unit = 365 / CHROMATIC_SCALE.length

  return `hsl(${CHROMATIC_SCALE.findIndex(x => x === n) * unit}deg 100% 50%)`
}

export const getChromaticScaleFrom = (startingNote: Note, length: number) => {
  const openNoteIndex = CHROMATIC_SCALE.findIndex(n => n === startingNote)

  return Array.from({ length }).map((_, index) => {
    const i = (index + openNoteIndex) % CHROMATIC_SCALE.length
    return CHROMATIC_SCALE[i]
  })
}
