import { NoteElement } from "@/components/core/noteElement"
import { GUITAR } from "@/constants/guitar"
import { getChromaticScaleFrom } from "@/lib/theory"
import { cn } from "@/lib/utils"
import type { Note, Notes } from "@/types/notes"
import type { HTMLProps } from "react"

export function GuitarFret({ note, isConstant = false, className, ...props }: HTMLProps<HTMLDivElement> & { note: Note, isConstant?: boolean }) {
  return (
    <div className={cn("group/fret relative", className)} {...props}>

      <NoteElement
        colorize
        note={note}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-1/2 z-20",
          "scale-50 opacity-0 transition-all duration-300",
          "group-hover/fret:opacity-100 group-hover/fret:scale-75",
          isConstant && "opacity-100 scale-75"
        )}
      />
    </div>
  )
}

export function GuitarString({ openNote, constantNotes = [] }: { openNote: Note, constantNotes?: Notes }) {
  const notes = getChromaticScaleFrom(openNote, GUITAR.fretCount)

  return (
    <div className="relative flex isolate">
      {/* string */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-0 h-px w-full pointer-events-none z-10",
          "bg-neutral-500"
        )}
      />

      {notes.map((note, index) => (
        <GuitarFret
          key={index + '-' + note}
          note={note}
          isConstant={constantNotes.includes(note)}
          style={{
            height: GUITAR.fretHeight + 'px',
            width: GUITAR.fretMinSize + 'px'
          }}
          className={cn(
            index > 1 && "border-s",
            index === 1 && "border-s-4",
          )}
        />
      ))}
    </div>
  )
}
