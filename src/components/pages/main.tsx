import { useMemo, useState } from "react";
import { NoteSelect } from "../core/noteSelect";
import type { Note } from "@/types/notes";
import { getMajorScale } from "@/lib/theory";
import { NoteElement } from "../core/noteElement";
import { Guitar } from "../instruments/guitar/guitar";
import { Piano } from "../instruments/piano/piano";

export function Main() {
  const [key, setKey] = useState<Note>('C/B#')

  const scale = useMemo(() => getMajorScale(key), [key])

  return (
    <main className='flex-1 flex flex-col items-center w-full p-4'>
      <div className="flex-1 flex flex-col items-center justify-center gap-16 max-w-6xl">
        {/* key */}
        <div className='flex items-center gap-2'>
          <span>Selected Key</span>

          <NoteSelect colorize note={key} onChange={n => setKey(n)} />
        </div>

        {/* scale */}
        <div className="flex items-center gap-2">
          <NoteElement
            colorize
            note={key}
          />

          <span>Major</span>
          <span>:</span>

          {scale.map((note, index) => (
            <NoteElement
              key={index + '-' + note}
              colorize
              note={note}
            />
          ))}
        </div>

        {/* guitar */}
        <Guitar constantNotes={scale} />

        {/* piano */}
        <Piano constantNotes={scale} />
      </div>
    </main>
  )
}
