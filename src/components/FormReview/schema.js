"use client"

import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(1, 'Este campo es requerido.').max(25, 'Maximo de 25 caracteres.'),
  message: z.string().min(10, 'Minimo 10 caracteres').max(300, 'Maximo de 300 caracteres.'),
  avatarOption: z.number().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  stars: z.number().min(1, 'Este campo es requerido.').max(5, 'Maximo de 5 caracteres.'),
})