import { NoteElement } from "@/components/core/noteElement"
import { PIANO } from "@/constants/piano"
import { ACCIDENTALS } from "@/constants/theory"
import { getChromaticScaleFrom } from "@/lib/theory"
import { cn } from "@/lib/utils"
import type { InstrumentProps } from "@/types/instrument"
import type { Note } from "@/types/notes"

export function PianoKey({ note, isConstant = false }: { note: Note, isConstant?: boolean }) {
  const isAccidental = ACCIDENTALS.includes(note)

  return (
    <div
      className={cn(
        "group/key relative flex h-full",
        isAccidental && "absolute top-0 left-0 -translate-x-1/2 w-4 h-2/3 bg-neutral-900 z-10 rounded-xs",
        !isAccidental && "bg-neutral-50 w-8 border border-neutral-300 rounded-sm",
      )}
    >
      <NoteElement
        colorize={isConstant}
        note={note}
        className={cn(
          "absolute bottom-0 left-1/2 -translate-x-1/2",
          "scale-50 opacity-0 transition-all duration-300",
          "group-hover/key:opacity-100 group-hover/key:scale-75",
          isConstant && "opacity-100 scale-75"
        )}
      />
    </div>
  )
}

export function Piano({ color, constantNotes = [] }: InstrumentProps) {
  const notes = getChromaticScaleFrom('C/B#', PIANO.keyCount)

  return (
    <div
      className="flex flex-col gap-2 py-2 px-4 rounded-xl"
      style={{
        backgroundColor: `color-mix(in srgb, transparent, color-mix(in srgb, ${color}, var(--foreground)))`
      }}
    >
      <div className="relative h-16 w-full bg-neutral-200/15 rounded-lg backdrop-blur-sm">
        <img src="/textures/piano-body.png" className="absolute top-0 left-0 size-full object-cover rounded-[inherit] mix-blend-screen opacity-15" />
      </div>

      <div className="flex h-24">
        {notes.map((note, index) => (
          <div key={index + '-' + note} className="relative flex h-full">
            <PianoKey note={note} isConstant={constantNotes.includes(note)} />
          </div>
        ))}
      </div>
    </div>
  )
}
