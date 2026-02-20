import { createContext, useContext, useState, type ReactNode } from "react";

interface SettingsContextType {
  showAltNotes: boolean
}

const settingsContext = createContext<SettingsContextType>({
  showAltNotes: false
})

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showAltNotes, setShowAltNotes] = useState(false)

  return <settingsContext.Provider value={{ showAltNotes }}>
    {children}
  </settingsContext.Provider>
}

export const useSettings = () => useContext(settingsContext)
