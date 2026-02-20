import type { NOTES } from "@/constants/notes"

export type Note = (typeof NOTES)[number]

export type Notes = Note[]
