'use server'

import { connectDB } from '@/utils/mongodb'
import Paint from '@/Models/Paint'
import { validateSession } from './validateSession'
import TopWorks from '@/Models/TopWorks'
import TopPaints from '@/Models/TopPaints'
import { uploadTopPaint } from './TopPaints'
import { uploadTopWork } from './TopWorks'
import { revalidatePath } from 'next/cache'

export const getAllPaints = async (populate) => {
  await connectDB()
  let paints
  
  if (populate) {
    paints = await Paint.find().populate('categories')
  } else {
    paints = await Paint.find()
  }

  return JSON.parse(JSON.stringify(paints))
}

export const getPaint = async (id, populate) => {
  await connectDB()
  let paint

  if (populate) {
    paint = await Paint.findById(id).populate('categories')
  } else {
    paint = await Paint.findById(id)
  }

  return JSON.parse(JSON.stringify(paint))
}

export const addPaint = async (newPaint) => {

  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  let addedPaint
  try {
    const paint = new Paint(newPaint)
    await paint.validate()
    await paint.save()
    addedPaint = true
  } catch (error) {
    return false
  }

  return addedPaint
}

export const updatePaint = async (id, newPaint) => {

  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  let addedPaint
  try {
    const paint = new Paint(newPaint)
    await paint.validate()
    await Paint.findByIdAndUpdate(id, newPaint)
    addedPaint = true
  } catch (error) {
    return false
  }

  revalidatePath('/')
  revalidatePath('/en')
  revalidatePath('/es')
  return addedPaint
}

export const deletePaint = async (id) => {

  const res = await validateSession()
  if (!res.success) return res

  let deletedPaint
  try {
    await connectDB()

    let topWorks = await TopWorks.findOne()
    let topPaints = await TopPaints.findOne()

    topWorks = JSON.parse(JSON.stringify(topWorks.topWorks))
    topPaints = JSON.parse(JSON.stringify(topPaints.topPaints))

    if (topWorks.includes(id)) {
      const newTopWorks = topWorks.filter(paint => paint !== id)
      console.log(newTopWorks)
      uploadTopWork({topWorks: newTopWorks})
    }

    if (topPaints.includes(id)) {
      const newTopPaints = topPaints.filter(paint => paint !== id)
      console.log(newTopPaints)
      uploadTopPaint({topPaints: newTopPaints})
    }
    
    await Paint.findByIdAndDelete(id)
    deletedPaint = true
  } catch (error) {
    return false
  }

  return deletedPaint
}

export const getMonthlyInserts = async() => { 
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  try {
    const results = await Paint.aggregate([
      // Filtrar documentos creados en los últimos 12 meses
      {
        $match: {
          createdAt: { $gte: oneYearAgo }
        }
      },
      // Extraer el año y el mes de la fecha de creación
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        }
      },
      // Agrupar por año y mes
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          count: { $sum: 1 }
        }
      },
      // Ordenar por año y mes
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    // Convertir los resultados al formato deseado
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const formattedResults = results.reduce((acc, { _id, count }) => {
      const formattedDate = `${months[_id.month - 1]} - ${_id.year}`;
      acc.date.push(formattedDate);
      acc.quantity.push(count);
      return acc;
    }, { date: [], quantity: [] });

    return formattedResults
  } catch (error) {
    console.error('Error al obtener inserciones mensuales:', error);
    return false
  }
}