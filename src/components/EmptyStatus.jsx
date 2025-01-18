export function EmptyStatus({title, subtitle, height}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 w-full ${height ? `h-[${height}]` : 'h-full'}`}>
      <h1 className='text-center font-bold text-2xl'>{title}</h1>
      <p className='text-center text-slate-500'>{subtitle}</p>
    </div>
  )
}

export function Bold({children}) {
  return <span className='font-bold text-white/70'>{children}</span>
}
