import { useMemo, useState } from 'react'
import './App.css'
import { NoteElement } from './components/core/noteElement'
import { NoteSelect } from './components/core/noteSelect'
import { Guitar } from './components/instruments/guitar/guitar'
import { Piano } from './components/instruments/piano/piano'
import { SettingsProvider } from './contexts/settings'
import { getMajorScale } from './lib/theory'
import type { Note } from './types/notes'

function App() {
  const [key, setKey] = useState<Note>('C/B#')

  const scale = useMemo(() => getMajorScale(key), [key])

  return (
    <SettingsProvider>
      <nav className='flex items-center gap-2 p-2 bg-neutral-100'>
        <h1 className='font-semibold'>Triad</h1>
      </nav>

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
    </SettingsProvider>
  )
}

export default App
