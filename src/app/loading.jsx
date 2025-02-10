import './loading.css'
import { colors } from '@/config.json'

export default function Loading() {
  return (
    <div className='w-full h-full grid place-items-center'>
      <span
        className="loader grid place-items-center"
        style={{ '--primary-color': colors.primary, '--secondary-color': colors.secondary }}
      >
        <span className='inline-block font-niconne -rotate-90 text-front-secondary text-3xl mb-5 ml-1'>
          RP
        </span>
      </span>
    </div>
  )
}
