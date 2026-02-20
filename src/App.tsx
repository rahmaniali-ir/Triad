import { BrowserRouter } from 'react-router'
import './App.css'
import { SettingsProvider } from './contexts/settings'
import { AppRouter } from './routes'

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <nav className='flex items-center gap-2 p-2 bg-neutral-100'>
          <h1 className='font-semibold'>Triad</h1>
        </nav>

        <AppRouter />
      </SettingsProvider>
    </BrowserRouter>
  )
}

export default App
