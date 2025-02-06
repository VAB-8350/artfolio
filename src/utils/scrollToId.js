import { languages } from '@/config.json'

export default function scrollToId(id, e) {

  if (e) {
    e.preventDefault();
  }

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
      console.error('Elemento no encontrado:', targetElement ? 'user-page-wrap' : id);
      const pathname = window.location.pathname
      const { primary, secondary } = languages

      if (pathname.startsWith(`/${secondary}`)) {
        window.location.href = `/${secondary}?section=${id}`
      } else if (pathname.startsWith(`/${primary}`)) {
        window.location.href = `/${primary}?section=${id}`
      } else {
        window.location.href = `/${primary}?section=${id}`
      }
    }
  }
}