'use client'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

export default function Ilustration({image}) {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id: image.id });

  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className='relative w-24 h-24 rounded-lg'
    >
      <img
        className='w-24 h-24 rounded-lg object-cover'
        src={image.id}
        alt="Preview"
      />
    </div>
  )
}
