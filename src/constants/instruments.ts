import { ElectricGuitarIcon } from "@/components/icons/electricGuitar"
import type { Instrument } from "@/types/instrument"
import { PianoIcon } from "lucide-react"

export const INSTRUMENTS: Record<string, Instrument> = {
  guitar: {
    id: "guitar",
    name: "Guitar",
    range: ["E/F♭", "E/F♭"],
    icon: ElectricGuitarIcon,
  },
  piano: {
    id: "piano",
    name: "Piano",
    range: ["C/B#", "C/B#"],
    icon: PianoIcon,
  },
}

export const INSTRUMENTS_LIST = Object.values(INSTRUMENTS)
