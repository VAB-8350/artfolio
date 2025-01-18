"use client"

import { z } from "zod"

export const formSchema = z.object({
  englishName: z.string().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  spanishName: z.string().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  visible: z.boolean(),
})
