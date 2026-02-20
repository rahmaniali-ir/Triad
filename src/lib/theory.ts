import { INTERVALS } from "@/constants/intervals"
import {
  HARMONIC_MINOR_SCALE_PATTERN,
  MAJOR_PENTATONIC_SCALE_PATTERN,
  MAJOR_SCALE_PATTERN,
  MINOR_PENTATONIC_SCALE_PATTERN,
  NATURAL_MINOR_SCALE_PATTERN,
} from "@/constants/scalePatterns"
import { CHROMATIC_SCALE } from "@/constants/theory"
import type { Note } from "@/types/notes"
import type { Interval, Scale, ScalePattern } from "@/types/theory"

export function getNoteInterval(note: Note, interval: Interval | number): Note {
  let noteIndex = CHROMATIC_SCALE.findIndex(n => n === note)

  const newIndex =
    noteIndex +
    (typeof interval === "number" ? interval : getIntervalHalfSteps(interval))

  return CHROMATIC_SCALE[newIndex % CHROMATIC_SCALE.length]
}

export function getIntervalHalfSteps(interval: Interval): number {
  return INTERVALS.find(i => i.symbol === interval)?.halfSteps ?? 0
}

export function getScaleFromPattern(pattern: ScalePattern, tonic: Note): Scale {
  const scale: Scale = [tonic]

  let currentNote = tonic

  for (const step of pattern) {
    currentNote = getNoteInterval(currentNote, step)

    scale.push(currentNote)
  }

  return scale
}

export const getMajorPentatonicScale = (root: Note) =>
  getScaleFromPattern(MAJOR_PENTATONIC_SCALE_PATTERN, root)

export const getMinorPentatonicScale = (root: Note) =>
  getScaleFromPattern(MINOR_PENTATONIC_SCALE_PATTERN, root)

export const getMajorScale = (root: Note) =>
  getScaleFromPattern(MAJOR_SCALE_PATTERN, root)

export const getNatrualMinorScale = (root: Note) =>
  getScaleFromPattern(NATURAL_MINOR_SCALE_PATTERN, root)

export const getHarmonicMinorScale = (root: Note) =>
  getScaleFromPattern(HARMONIC_MINOR_SCALE_PATTERN, root)

export const getNoteColor = (n: Note) => {
  const unit = 365 / CHROMATIC_SCALE.length

  return `hsl(${CHROMATIC_SCALE.findIndex(x => x === n) * unit - 90}deg 100% 50%)`
}

export const getChromaticScaleFrom = (
  startingNote: Note,
  length: number = CHROMATIC_SCALE.length,
) => {
  const openNoteIndex = CHROMATIC_SCALE.findIndex(n => n === startingNote)

  return Array.from({ length }).map((_, index) => {
    const i = (index + openNoteIndex) % CHROMATIC_SCALE.length
    return CHROMATIC_SCALE[i]
  })
}
