import { STAFF } from "@/constants/staff"
import { CHROMATIC_SCALE } from "@/constants/theory"
import { cn } from "@/lib/utils"
import type { Note, Notes } from "@/types/notes"
import type { HTMLProps } from "react"
import { GClefIcon } from "../icons/gClef"
import { NoteElement } from "./noteElement"

export function StaffNote({ note, className, ...props }: HTMLProps<HTMLDivElement> & { note: Note }) {
  return (
    <div
      className={cn("relative size-4", className)}
      style={{
        height: STAFF.NOTE_HEAD_SIZE + 'px',
        width: STAFF.NOTE_HEAD_SIZE + 'px',
      }}
      {...props}
    >
      {/* stem */}
      <div
        className="absolute w-[3px] bg-neutral-800 -right-px bottom-3/4 rounded-xl"
        style={{
          height: STAFF.NOTE_STEM_HEIGHT + 'px',
        }}
      />

      {/* head */}
      <div className="relative size-full rounded-full bg-neutral-800 -skew-12 rotate-8">
      </div>

      <NoteElement
        colorize
        note={note}
        className="absolute top-1/2 left-1/2 -translate-1/2 scale-50 -skew-8 before:border-2 before:border-neutral-800"
      />
    </div>
  )
}

export function Staff({ notes = [] }: { notes?: Notes }) {
  const lines = Array.from({ length: 5 }, (_, index) => index)

  return (
    <div className="relative flex gap-2 min-w-[200px] isolate">
      <div className="absolute inset-0 flex flex-col w-full -z-10">
        {lines.map(line => (
          <div key={line} className="relative h-4">
            <div className="absolute top-1/2 -translate-y-1/2 h-px w-full bg-neutral-300" />
          </div>
        ))}
      </div>

      <GClefIcon className="relative top-1 h-18 w-10" />

      <div className="flex px-1">
        {notes.map((note, index) => {
          const keyNoteTopOffset = CHROMATIC_SCALE.findIndex(n => n === 'G')
          const noteChromaticIndex = CHROMATIC_SCALE.findIndex(n => n === note)

          const lineIndex = noteChromaticIndex / 2
          const top = ((keyNoteTopOffset + 1) * STAFF.NOTE_HEAD_SIZE / 2) - (lineIndex * STAFF.NOTE_HEAD_SIZE / 2) - 2

          return (
            <div key={index} style={{ width: STAFF.NOTE_HEAD_SIZE + 'px' }} className="relative mx-2">
              <StaffNote
                note={note}
                className={cn("absolute left-1/2 -translate-x-1/2")}
                style={{
                  top: top + 'px',
                  transition: 'top .3s ease',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
