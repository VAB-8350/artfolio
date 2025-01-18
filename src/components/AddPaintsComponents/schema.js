"use client"

import { z } from "zod"

export const formSchema = z.object({
  visible: z.boolean(),
  categories: z.array(z.string()).nonempty('Debe contener al menos una categoría'),
  year: z.string().min(4, 'Este campo es requerido.').max(4, 'Maximo de 4 caracteres.'),
  titleSpanish: z.string().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  titleEnglish: z.string().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  descriptionSpanish: z.string().min(1, 'Este campo es requerido.'),
  descriptionEnglish: z.string().min(1, 'Este campo es requerido.'),
})
