"use client"
import { ROLES } from "@/utils/roles"

import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  email: z.string().min(1, 'Este campo es requerido.').email('Este campo debe ser un email válido.'),
  role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
})
