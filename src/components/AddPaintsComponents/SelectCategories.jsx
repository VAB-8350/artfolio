'use client'

import { useEffect, useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react";
import { getAllCategories } from "@/actions/Category";

export default function SelectCategories ({ form, initialCategories }) {

  // parsed categories
  const parsedCategories = initialCategories?.map((category) => (category._id))

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(parsedCategories ?? []);

  useEffect(() => {
    getCategories()
    form.setValue("categories", parsedCategories);
  }, [])

  const getCategories = async () => {
    const response = await getAllCategories()
    setCategories(response)
  }

  const handleCategoryChange = (value) => {
    if (selectedCategories.includes(value)) {
      // Remove the category if it's already selected
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    } else {
      // Add the category to the selection
      setSelectedCategories([...selectedCategories, value]);
    }

    // Update the form field value
    form.setValue("categories", [...selectedCategories, value]);
  };

  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    form.setValue("categories", selectedCategories);
  };

  return (
    <FormField
      control={form.control}
      name="categories"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categorías</FormLabel>
          <Select onValueChange={handleCategoryChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona al menos una categoría" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  disabled={selectedCategories.includes(category._id)}
                  key={category._id}
                  value={category._id}
                  className={selectedCategories.includes(category) ? "font-bold" : ""}
                >
                  {category.spanishName} - {category.englishName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-4 flex flex-wrap gap-2">
            {selectedCategories.length > 0 ? (
              categories.filter((category) => selectedCategories.includes(category._id)).map((category) => (
                <Badge key={category._id}>
                  {category.spanishName} - {category.englishName}
                  <button type="button" onClick={() => removeCategory(category._id)} className="text-red-600 ml-2 -mr-1">
                    <Trash2 size={15} />
                  </button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-gray-500">No has seleccionado categorías.</p>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
