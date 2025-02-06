'use server'

import { connectDB } from '@/utils/mongodb'
import Category from '@/Models/Category'
import { validateSession } from './validateSession'
import { revalidatePath } from 'next/cache'
import Paint from '@/Models/Paint'

export const getAllCategories = async () => {
  await connectDB()
  const categories = await Category.find()

  return JSON.parse(JSON.stringify(categories))
}

export const getCategory = async (id) => {
  await connectDB()
  const category = await Category.findById(id)

  return JSON.parse(JSON.stringify(category))
}

export const getVisibleCategories = async () => {
  await connectDB()
  const categories = await Category.find({ visible: true })

  return JSON.parse(JSON.stringify(categories))
}

export const updateCategory = async (id, updateCategory) => {
  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  let success = false
  
  try {
    const test = new Category(updateCategory)
    await test.validate()
    await Category.findByIdAndUpdate(id, updateCategory)
    success = true
  } catch (error) {
    return false
  }
  
  success && revalidatePath('/admin/categories')
  return success

}

export const addCategory = async (newCategory) => {

  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  let success = false

  try {
    const category = new Category(newCategory)
    await category.validate()
    await category.save()
    success = true
  } catch (error) {
    console.log(error)
    return false
  }

  success && revalidatePath('/admin/categories')
  return success
}

export const deleteCategory = async (categoryId) => {
  const res = await validateSession()
  if (!res.success) return res
  
  try {
    await connectDB()
    // Verificar si la categoría está asociada a alguna pintura con más de una categoría
    const paintsWithCategory = await Paint.find({ categories: categoryId });
  
    // Filtrar las pinturas que solo tienen esa categoría
    const paintsWithSingleCategory = paintsWithCategory.filter(paint => paint.categories.length === 1);

    // Si alguna pintura tiene solo esa categoría, no eliminar
    if (paintsWithSingleCategory.length > 0) {
      return {
        success: false,
        message: 'La categoría no puede eliminarse porque tiene pinturas asociadas',
        paintsWithCategory: JSON.parse(JSON.stringify(paintsWithSingleCategory))
      };
    }
  
    await Paint.updateMany(
      { categories: categoryId },
      { $pull: { categories: categoryId } }
    );
  
  
    const category = await Category.findByIdAndDelete(categoryId);
  
    return {success: !!category, message: !!category ? 'Categoría eliminada correctamente' : 'Error al eliminar la categoría'}
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Error al eliminar la categoría' }
  }
}