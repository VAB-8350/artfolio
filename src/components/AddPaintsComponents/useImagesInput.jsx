'use client'

import { useState } from 'react'
import { DndContext, closestCenter, DragOverlay  } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CloudUpload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Ilustration from './Ilustration'
import DeleteZone from './DeleteZone';
import { deleteImage } from '@/utils/cloudinary';

export default function useImagesInput(props) {

  const {initialImages, isSubmitting} = props

  const [images, setImages] = useState([...initialImages]);
  const [dragging, setDragging] = useState(false);
  const [activeId, setActiveId] = useState(null);

  // Manejar archivos cargados
  const handleFiles = (files) => {
    const fileArray = Array.from(files).map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));

    setImages((prevImages) => [...prevImages, ...fileArray]);
  };

  // Eventos Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // Evento para el input
  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e

    if (!over) return;

    // Si se suelta sobre el área de eliminación
    if (over.id === "delete-zone") {
      setImages((prev) => prev.filter((image) => image.id !== active.id));
    } else if (active.id !== over.id) {
      const oldIndex = images.findIndex((item) => item.id === active.id);
      const newIndex = images.findIndex((item) => item.id === over.id);
      setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    }

  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  return {
    images,
    render:
    <>
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        id='drop-images-label'
        htmlFor='drop-images-input'
        className='flex items-center justify-center w-full h-32 bg-transparent border border-slate-700 border-dashed rounded-lg hover:cursor-pointer hover:bg-zinc-900 transition duration-300'
      >
        <div className='absolute flex items-center gap-2'>
          <CloudUpload width={30} height={30} />
          <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click or drag to upload</span></p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG</p>
        </div>
      </label>

      <Input
        accept='image/*'
        type="file"
        name="image"
        multiple id='drop-images-input'
        className='hidden'
        onChange={handleInputChange}
        disabled={isSubmitting}
      />

      <div className='flex w-full gap-4 mt-4'>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <div className="flex items-center gap-4 flex-wrap">

            <SortableContext
              items={images}
              strategy={horizontalListSortingStrategy}
            >
              {/* component */}
              {images.map((image) => (
                <div key={image.id}>
                  <Ilustration  image={image}/>
                </div>
              ))}
            </SortableContext>

            {
              images.length > 0 &&
              <DeleteZone />
            }
          </div>

          {/* DragOverlay para mantener el elemento activo pegado al cursor */}
          <DragOverlay>
            {activeId ? (
              <div className='opacity-50'>
                <Ilustration image={images.find((image) => image.id === activeId)} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  }
  
}
