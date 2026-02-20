import { CHROMATIC_SCALE } from "@/constants/theory";
import { cn } from "@/lib/utils";
import type { Note } from "@/types/notes";
import type { Scale } from "@/types/theory";
import { useEffect, useRef, useState } from "react";
import { NoteElement } from "./noteElement";

interface NoteSelectProps {
  note?: Note,
  scale?: Scale,
  open?: boolean,
  radius?: number
  colorize?: boolean
  onChange?: (note: Note) => void
  onToggle?: (open: boolean) => void
}

export function NoteSelect({
  note = 'C/B#',
  scale = CHROMATIC_SCALE,
  open: openProp = false,
  radius = 0.8,
  colorize = false,
  onChange,
  onToggle
}: NoteSelectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState(note)
  const [isOpen, setIsOpen] = useState(openProp)

  const theta = Math.PI * 2 / scale.length
  const size = Math.max(0.1, radius) * 100
  const circleSize = size * 2

  const valueIndex = scale.findIndex(note => note === value)
  const valueTop = Math.sin(valueIndex * theta) * size
  const valueLeft = Math.cos(valueIndex * theta) * size

  const changeOpen = (value: boolean) => {
    if (open === undefined)
      onToggle?.(value)
    else
      setIsOpen(value)
  }

  const open = () => changeOpen(true)
  const close = () => changeOpen(false)
  const toggle = () => changeOpen(!isOpen)

  const selectNote = (n: Note) => {
    setValue(n)
    onChange?.(n)

    setTimeout(() => {
      close()
    }, 200);
  }

  // detect outside click
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const outsideClickListener = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (!container.contains(target)) close()
    }

    window.addEventListener('click', outsideClickListener)

    return () => {
      window.removeEventListener('click', outsideClickListener)
    }
  }, [containerRef.current])

  useEffect(() => {
    setIsOpen(openProp)
  }, [openProp])

  return (
    <div ref={containerRef} className="flex relative isolate z-10">
      <div className="relative">
        <NoteElement
          colorize={colorize}
          note={value}
          onClick={toggle}
          className={cn(
            "relative transition-all duration-300 hover:scale-110",
            isOpen && "opacity-50 grayscale-25"
          )}
        />

        <NoteElement
          colorize
          note={value}
          style={{
            top: `${isOpen ? valueTop : 0}px`,
            left: `${isOpen ? valueLeft : 0}px`,
            transition: 'all .3s ease-in-out, opacity .3s .2s ease'
          }}
          onClick={toggle}
          className={cn(
            "absolute hover:scale-110",
            isOpen && "opacity-100 scale-120 [--note-bg-opacity:100%]"
          )}
        />
      </div>

      <div
        style={{
          height: circleSize + 'px',
          width: circleSize + 'px',
          boxShadow: `0 0 64px color-mix(in srgb, var(--color-neutral-500) 35%, transparent), inset 0 0 ${circleSize}px 24px var(--background)`
        }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-1/2 border-2 border-neutral-200/75 rounded-full -z-10",
          "opacity-0 scale-50 rotate-10 transition-all duration-500",
          !isOpen && "pointer-events-none",
          isOpen && "opacity-100 scale-100 rotate-0"
        )}
      >
        {scale.map((n, index) => {
          const top = Math.sin(index * theta) * size
          const left = Math.cos(index * theta) * size

          return (
            <NoteElement
              key={index + '-' + n}
              colorize
              note={n}
              style={{
                top: `calc(50% + ${top}px)`,
                left: `calc(50% + ${left}px)`,
              }}
              onClick={() => selectNote(n)}
              className={cn(
                "absolute -translate-1/2 backdrop-blur-sm transition-all duration-500 hover:scale-110",
                n === value && "opacity-0 scale-75"
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
