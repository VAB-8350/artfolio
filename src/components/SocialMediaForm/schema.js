"use client"

import { z } from "zod"

export const formSchema = z.object({
  x: z.object({
    name: z.string(),
    url: z.string()
      .refine(url => url === '' || /^(https?:\/\/)?(www\.)?x\.com\/[A-Za-z0-9_.-]+\/?$/.test(url), {
        message: 'Debe ser una URL válida de perfil de X o estar vacío.',
      }),
  }),

  facebook: z.object({
    name: z.string(),
    url: z.string()
      .refine(url => url === '' || /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/.test(url), {
        message: 'Debe ser una URL válida de perfil de Facebook o estar vacío.',
      }),
  }),

  instagram: z.object({
    name: z.string(),
    url: z.string()
      .refine(url => url === '' || /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/.test(url), {
        message: 'Debe ser una URL válida de perfil de Instagram o estar vacío.',
      }),
  }),

  whatsapp: z.object({
    name: z.string(),
    url: z.string()
      .refine(url => url === '' || /^(https?:\/\/)?(wa\.me|api\.whatsapp\.com)\/[0-9]+(\?text=.*)?$/.test(url), {
        message: 'Debe ser un enlace válido de WhatsApp o estar vacío.',
      }),
  }),

  telegram: z.object({
    name: z.string(),
    url: z.string()
      .refine(url => url === '' || /^(https?:\/\/)?(t\.me)\/[A-Za-z0-9_.-]+\/?$/.test(url), {
        message: 'Debe ser una URL válida de perfil de Telegram o estar vacío.',
      }),
  }),

  linkedin: z.object({
    name: z.string(),
    url: z.string()
      .refine(url => url === '' || /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_.-]+\/?$/.test(url), {
        message: 'Debe ser una URL válida de perfil de LinkedIn o estar vacío.',
      }),
  }),

  tiktok: z.object({
    name: z.string(),
    url: z.string()
      .refine(url => url === '' || /^(https?:\/\/)?(www\.)?tiktok\.com\/@?[A-Za-z0-9_.-]+\/?$/.test(url), {
        message: 'Debe ser una URL válida de perfil de TikTok o estar vacío.',
      }),
  }),

  youtube: z.object({
    name: z.string(),
    url: z.string()
      .refine(
      (url) =>
        url === "" ||
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(channel|c|user|@)[A-Za-z0-9_-]+\/?)$/.test(url),
      {
        message: "Debe ser una URL válida de canal de YouTube o estar vacío.",
      }
    ),
  }),

  threads: z.object({
    name: z.string(),
    url: z.string()
    .refine(
      (url) =>
        url === "" ||
        /^(https?:\/\/)?(www\.)?threads\.net\/@?[A-Za-z0-9_.-]+\/?$/.test(url),
      {
        message: "Debe ser una URL válida de perfil de Threads o estar vacío.",
      }
    ),
  }),

  pinterest: z.object({
    name: z.string(),
    url: z.string()
      .refine(
      (url) =>
        url === "" ||
        /^(https?:\/\/)?([a-z]{2}\.)?pinterest\.com\/[A-Za-z0-9_-]+\/?$/.test(url),
      {
        message: "Debe ser una URL válida de perfil de Pinterest o estar vacío.",
      }
    ),
  }),
});
