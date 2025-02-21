import { languages } from '@/config.json'

export const metadataObj = async (lang) => {
  
  const dictionary = await import(`@/app/dictionaries/${lang}/metadata.json`)

  return {
    description: dictionary.description,
    category: dictionary.category,
    applicationName: dictionary.applicationName,
    keywords: dictionary.keywords,
    metadataBase: new URL(dictionary.metadataBase),
    alternates: {
      canonical: '/',
      languages: {
        [languages.primary]: `/${languages.primary}`,
        [languages.secondary]: `/${languages.secondary}`,
      },
    },
  }
}