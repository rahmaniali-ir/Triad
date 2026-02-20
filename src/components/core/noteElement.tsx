import { useSettings } from "@/contexts/settings";
import { getNoteColor } from "@/lib/theory";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/notes";
import type { HTMLProps } from "react";

export function NoteElement(
  { note, colorize = false, className, style, noteNameClassName, ...props }:
    HTMLProps<HTMLDivElement> & { note: Note, colorize?: boolean, noteNameClassName?: string }
) {
  const { showAltNotes } = useSettings()
  const [mainName, altName] = note.split('/')

  const color = `color-mix(in srgb, ${getNoteColor(note)} var(--note-bg-opacity, 25%), var(--background))`

  return (
    <div
      className={cn(
        "relative size-8 min-w-8 flex rounded-full bg-neutral-200 p-1 shadow-xs",
        "transition-all duration-300 hover:[--note-bg-opacity:75%]",
        "before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-current/5",
        className
      )}
      style={{
        background: colorize ? color : undefined,
        ...style
      }}
      {...props}
    >
      <div
        className={cn(
          "flex flex-1 items-center justify-center text-xs",
          noteNameClassName
        )}
      >
        <span>{mainName}</span>

        {showAltNotes && altName && (
          <>
            <small>/</small>
            <span>{altName}</span>
          </>
        )}
      </div>
    </div>
  )
}
