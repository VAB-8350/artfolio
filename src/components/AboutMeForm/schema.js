"use client"

import { z } from "zod"

export const formSchema = z.object({
  aboutEnglish: z.string().min(10, 'Este campo es requerido.'),
  aboutSpanish: z.string().min(10, 'Este campo es requerido.'),
})
