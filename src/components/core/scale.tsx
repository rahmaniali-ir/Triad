import { getChromaticScaleFrom, getIntervalHalfSteps } from "@/lib/theory";
import type { Note } from "@/types/notes";
import type { Scale, ScalePattern } from "@/types/theory";
import { NoteElement } from "./noteElement";
import { cn } from "@/lib/utils";
import { CHROMATIC_SCALE } from "@/constants/theory";
import type { HTMLProps } from "react";

export function ScaleNote({ note, isConstant = false }: { note: Note, isConstant?: boolean }) {
  return (
    <NoteElement
      note={note}
      colorize={isConstant}
      className={cn(
        !isConstant && "opacity-50 scale-75"
      )}
    />
  )
}

export function ChromaticScale({ startingNote, constantNotes }: { startingNote: Note, constantNotes: Note[] }) {
  const scale = getChromaticScaleFrom(startingNote, CHROMATIC_SCALE.length + 1)

  return (
    <div className="flex justify-between gap-px w-full">
      {scale.map((note, index) => (
        <ScaleNote
          key={index}
          note={note}
          isConstant={constantNotes.includes(note)} />
      ))}
    </div>
  )
}

export function ScaleRuler({ pattern }: { pattern: ScalePattern }) {
  return (
    <div className="relative flex h-3 w-full">
      <div className="absolute bottom-0 left-0 h-px w-full bg-neutral-300" />

      <div className="relative flex flex-1 h-full px-4">
        {pattern.map((interval, index) => (
          <div
            key={index + '-' + interval}
            className={cn(
              "relative flex items-center justify-center",
            )}
            style={{
              flex: getIntervalHalfSteps(interval)
            }}
          >
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 h-full border-x",
                (index === 0 || index === pattern.length - 1) && "h-[125%] bottom-px",
                index === 0 && "border-s-2 border-s-neutral-400",
                index === pattern.length - 1 && "border-e-2 border-e-neutral-400",
              )}
            />

            <span className="text-[10px]">{interval}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Scale(
  { scale, pattern, className, ...props }:
    Omit<HTMLProps<HTMLDivElement>, 'pattern'> & { scale: Scale, pattern: ScalePattern }
) {
  const tonic = scale[0]

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <ChromaticScale startingNote={tonic} constantNotes={scale} />

      <ScaleRuler pattern={pattern} />
    </div>
  )
}
