import { SCALE_PATTERN_DETAILS, SCALE_PATTERN_DETAILS_LIST } from "@/constants/scalePatterns";
import { getMajorScale, getScaleFromPattern } from "@/lib/theory";
import type { Note } from "@/types/notes";
import { useMemo, useState } from "react";
import { NoteElement } from "../core/noteElement";
import { NoteSelect } from "../core/noteSelect";
import { Scale } from "../core/scale";
import { Guitar } from "../instruments/guitar/guitar";
import { Piano } from "../instruments/piano/piano";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Staff } from "../core/staff";

export function ScaleSelect({ value, tonic, onValueChange }: { value: string, tonic?: Note, onValueChange: (value: string) => void }) {
  const selectedScale = useMemo(() => SCALE_PATTERN_DETAILS[value as keyof typeof SCALE_PATTERN_DETAILS], [value])

  const scales = SCALE_PATTERN_DETAILS_LIST

  const singleTonicScales = scales.filter(s => s.pattern.length === 1)
  const chromaticScales = scales.filter(s => s.pattern.length === 12)
  const pentatonicScales = scales.filter(s => s.pattern.length === 5)
  const diatonicScales = scales.filter(s => s.pattern.length === 7)

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="p-1.5">
        <SelectValue placeholder="Select a scale">
          {tonic && <NoteElement colorize note={tonic} className="size-6 min-w-6" />}

          {selectedScale.name}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {/* single tonic scales */}
        <SelectGroup>
          <SelectLabel>Single Tonic</SelectLabel>
          {singleTonicScales.map(scale => (
            <SelectItem key={scale.id} value={scale.id}>
              {tonic && <NoteElement colorize={scale.id === selectedScale.id} note={tonic} className="size-6 min-w-6" />}

              {scale.name}
            </SelectItem>
          ))}
        </SelectGroup>

        {/* chromatic scales */}
        <SelectGroup>
          <SelectLabel>Chromatic</SelectLabel>
          {chromaticScales.map(scale => (
            <SelectItem key={scale.id} value={scale.id}>
              {tonic && <NoteElement colorize={scale.id === selectedScale.id} note={tonic} className="size-6 min-w-6" />}
              {scale.name}
            </SelectItem>
          ))}
        </SelectGroup>

        {/* pentatonic scales */}
        <SelectGroup>
          <SelectLabel>Pentatonic</SelectLabel>
          {pentatonicScales.map(scale => (
            <SelectItem key={scale.id} value={scale.id}>
              {tonic && <NoteElement colorize={scale.id === selectedScale.id} note={tonic} className="size-6 min-w-6" />}
              {scale.name}
            </SelectItem>
          ))}
        </SelectGroup>

        {/* diatonic scales */}
        <SelectGroup>
          <SelectLabel>Diatonic</SelectLabel>
          {diatonicScales.map(scale => (
            <SelectItem key={scale.id} value={scale.id}>
              {tonic && <NoteElement colorize={scale.id === selectedScale.id} note={tonic} className="size-6 min-w-6" />}
              {scale.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function ScaleSection({ selectedScaleId, tonic, onScaleChange }: { selectedScaleId: keyof typeof SCALE_PATTERN_DETAILS, tonic: Note, onScaleChange: (scaleId: keyof typeof SCALE_PATTERN_DETAILS) => void }) {
  const [scaleId, setScaleId] = useState<keyof typeof SCALE_PATTERN_DETAILS>(selectedScaleId)

  const scaleDetails = useMemo(() => SCALE_PATTERN_DETAILS[scaleId], [scaleId])

  const scale = useMemo(
    () => getScaleFromPattern(scaleDetails.pattern, tonic)
    , [tonic, scaleDetails.pattern]
  )

  const selectScale = (scaleId: keyof typeof SCALE_PATTERN_DETAILS) => {
    setScaleId(scaleId)
    onScaleChange(scaleId)
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-neutral-100">
      <ScaleSelect value={scaleId} tonic={tonic} onValueChange={selectScale as (value: string) => void} />

      <Scale scale={scale} pattern={scaleDetails.pattern} className="px-1.5" />
    </div>
  )
}

export function Main() {
  const [key, setKey] = useState<Note>('C/B#')
  const [selectedScaleId, setSelectedScaleId] = useState<keyof typeof SCALE_PATTERN_DETAILS>('MAJOR')

  const scale = useMemo(() => getScaleFromPattern(SCALE_PATTERN_DETAILS[selectedScaleId].pattern, key), [key, selectedScaleId])

  return (
    <main className='flex-1 flex flex-col items-center w-full p-4'>
      <div className="flex-1 flex flex-col items-center justify-center gap-16 max-w-6xl">
        {/* key */}
        <div className="flex flex-col items-center gap-1">
          <small>Key</small>

          <Badge className='flex flex-col items-center gap-2'>
            <NoteSelect colorize note={key} onChange={n => setKey(n)} />
          </Badge>
        </div>

        {/* staff */}
        <Staff notes={scale} />

        {/* scale */}
        <div className="flex flex-col gap-8">
          {/* scale */}
          <ScaleSection tonic={key} selectedScaleId={selectedScaleId} onScaleChange={setSelectedScaleId} />
        </div>

        {/* guitar */}
        <Guitar constantNotes={scale} />

        {/* piano */}
        <Piano constantNotes={scale} />
      </div>
    </main>
  )
}
