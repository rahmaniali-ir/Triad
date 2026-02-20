import type { Notes } from "@/types/notes";
import { GuitarString } from "./guitarString";
import type { InstrumentProps } from "@/types/instrument";
import { GUITAR } from "@/constants/guitar";
import { ElectricGuitar } from "@/assets/electricGuitar";
import { cn } from "@/lib/utils";

export function Guitar({ color, constantNotes = [] }: InstrumentProps) {
  const openNotes: Notes = [
    'E/F♭',
    'A',
    'D',
    'G',
    'B/C♭',
    'E/F♭'
  ]

  return (
    <div className="relative flex isolate perspective-distant transform-style-preserve-3d">
      <ElectricGuitar
        className={cn(
          "absolute top-1/2 left-[64%] -translate-1/2 h-[50vh] pointer-events-none -z-10",
          "mask-[radial-gradient(ellipse_at_top_left,black_50%,_transparent)]"
        )}
        style={{ color: `color-mix(in srgb, ${color}, var(--foreground))` }}
      />

      {/* neck */}
      <div className="flex flex-col">
        {/* inlays */}
        <div className="absolute top-0 left-0 w-full h-full">
          {GUITAR.inlayFrets.filter(fret => fret < GUITAR.fretCount).map((fret) => (
            <div
              key={fret}
              className="absolute top-0 bottom-0 flex flex-col items-center justify-around"
              style={{
                left: fret * GUITAR.fretMinSize + 'px',
                width: GUITAR.fretMinSize + 'px',
              }}
            >
              <div className="size-4 rounded-full bg-neutral-200" />

              {fret % 12 === 0 && <div className="size-4 rounded-full bg-neutral-200" />}
            </div>
          ))}
        </div>

        {/* strings & frets */}
        <div className="flex flex-col-reverse">
          {openNotes.map((note, index) => (
            <GuitarString
              key={index + '-' + note}
              openNote={note}
              constantNotes={constantNotes}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
