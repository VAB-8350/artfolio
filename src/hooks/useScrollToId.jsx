'use client'

import { languages } from '@/config.json'
import { useRouter } from 'next/navigation';

export default function useScrollToId() {

  const router = useRouter()

  const  scrollToId = (id) => {
  
    // Asegúrate de que el DOM esté listo
    if (typeof document !== 'undefined') {
      const targetElement = document.getElementById(id);
      const userPageWrap = document.getElementById('user-page-wrap');
  
      if (targetElement && userPageWrap) {
        // Calcula la posición del elemento dentro del contenedor
        const targetPosition = targetElement.offsetTop - userPageWrap.offsetTop - 200;
  
        // Realiza el scroll suave
        userPageWrap.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      } else {
        const pathname = window.location.pathname
        const { primary, secondary } = languages
  
        if (pathname.startsWith(`/${secondary}`)) {
          router.push(`/${secondary}?section=${id}`)
        } else if (pathname.startsWith(`/${primary}`)) {
          router.push(`/${primary}?section=${id}`)
        } else {
          router.push(`/${primary}?section=${id}`)
        }
      }
    }
  }

  return { scrollToId }
}
