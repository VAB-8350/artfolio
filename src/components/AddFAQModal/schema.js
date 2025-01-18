"use client"

import { z } from "zod"

export const formSchema = z.object({
  askSpanish: z.string().min(1, 'Este campo es requerido.'),
  askEnglish: z.string().min(1, 'Este campo es requerido.'),
  answerSpanish: z.string().min(1, 'Este campo es requerido.'),
  answerEnglish: z.string().min(1, 'Este campo es requerido.'),
})
