import { INSTRUMENTS, INSTRUMENTS_LIST } from "@/constants/instruments";
import { SCALE_PATTERN_DETAILS, SCALE_PATTERN_DETAILS_LIST } from "@/constants/scalePatterns";
import { getNoteColor, getScaleFromPattern } from "@/lib/theory";
import type { Instrument } from "@/types/instrument";
import type { Note } from "@/types/notes";
import { useMemo, useState } from "react";
import { NoteElement } from "../core/noteElement";
import { NoteSelect } from "../core/noteSelect";
import { Scale } from "../core/scale";
import { Staff } from "../core/staff";
import { Guitar } from "../instruments/guitar/guitar";
import { Piano } from "../instruments/piano/piano";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export function ScaleSelect({ value, tonic, onValueChange }: { value: string, tonic?: Note, onValueChange: (value: string) => void }) {
  const selectedScale = useMemo(() => SCALE_PATTERN_DETAILS[value as keyof typeof SCALE_PATTERN_DETAILS], [value])

  const scales = SCALE_PATTERN_DETAILS_LIST

  const singleTonicScales = scales.filter(s => s.pattern.length === 1)
  const chromaticScales = scales.filter(s => s.pattern.length === 12)
  const pentatonicScales = scales.filter(s => s.pattern.length === 5)
  const diatonicScales = scales.filter(s => s.pattern.length === 7)

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="p-1.5 bg-background">
        <SelectValue placeholder="Select a scale">
          {tonic && <NoteElement colorize note={tonic} className="size-6 min-w-6" />}

          {selectedScale.name} Scale
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

export function InstrumentSelect({ value: instrument, onValueChange }: { value: Instrument, onValueChange: (value: Instrument) => void }) {
  return (
    <Select value={instrument.id} onValueChange={(id) => onValueChange(INSTRUMENTS[id])}>
      <SelectTrigger className="p-1.5 bg-background">
        <SelectValue placeholder="Select an instrument">
          <instrument.icon className="size-6 min-w-6" />

          {instrument.name}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {INSTRUMENTS_LIST.map(instrument => (
          <SelectItem key={instrument.id} value={instrument.id}>
            <instrument.icon className="size-6 min-w-6" />

            {instrument.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function Main() {
  const [key, setKey] = useState<Note>('C/B#')
  const [selectedScaleId, setSelectedScaleId] = useState<keyof typeof SCALE_PATTERN_DETAILS>('MAJOR')

  const scale = useMemo(() => getScaleFromPattern(SCALE_PATTERN_DETAILS[selectedScaleId].pattern, key), [key, selectedScaleId])

  const [instrument, setInstrument] = useState(INSTRUMENTS_LIST[0])

  const instrumentColor = useMemo(() => getNoteColor(key), [key])

  return (
    <main className='flex-1 flex flex-col items-center w-full p-4'>
      <div className="flex-1 flex flex-col items-center justify-center gap-16 max-w-6xl">
        <div className="flex items-center gap-2">
          {/* key */}
          <div className="relative flex flex-col items-center gap-1">
            <small className="absolute bottom-full left-1/2 -translate-1/2">Key</small>

            <Badge className='flex flex-col items-center gap-2'>
              <NoteSelect colorize note={key} onChange={n => setKey(n)} />
            </Badge>
          </div>

          {/* instrument */}
          <InstrumentSelect value={instrument} onValueChange={setInstrument} />
        </div>

        {/* staff */}
        <Staff notes={scale} />

        {/* scale */}
        <div className="flex flex-col gap-8">
          {/* scale */}
          <ScaleSection tonic={key} selectedScaleId={selectedScaleId} onScaleChange={setSelectedScaleId} />
        </div>

        {/* guitar */}
        {instrument.id === 'guitar' && <div className="my-24"><Guitar constantNotes={scale} color={instrumentColor} /></div>}

        {/* piano */}
        {instrument.id === 'piano' && <div className="my-24"><Piano constantNotes={scale} color={instrumentColor} /></div>}
      </div>
    </main>
  )
}
