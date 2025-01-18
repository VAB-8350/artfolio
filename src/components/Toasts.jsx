import { CircleCheckBig, CloudAlert, Loader2 } from "lucide-react";

export function SuccessToast({title, message}) {
  return (
    <div className='flex items-center gap-4'>
      <CircleCheckBig className="text-green-500" size={30} />
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        {
          message &&
          <p>{message}</p>
        }
      </div>
    </div>
  )
}

export function ErrorToast({title, message}) {
  return (
    <div className='flex items-center gap-4'>
      <CloudAlert className="text-red-500" size={30} />
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        {
          message &&
          <p>{message}</p>
        }
      </div>
    </div>
  )
}

export function LoadingToast({title, message}) {
  return (
    <div className='flex items-center gap-4'>
      <Loader2 className="text-gray-500 animate-spin" size={30} />
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        {
          message &&
          <p>{message}</p>
        }
      </div>
    </div>
  )
}