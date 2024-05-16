'use server';

import { IMealFormData } from "@/types/type";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

const
  isInvalidText = (text: string) => {
    return !text || text.trim() === '';
  };

export async function shareMeal(prevState: FormData, formData: FormData) {
  const meal: IMealFormData = {
    title: formData.get('title') as string,
    summary: formData.get('summary') as string,
    instructions: formData.get('instructions') as string,
    image: formData.get('image') as File,
    creator: formData.get('name') as string,
    creator_email: formData.get('email') as string
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.'
    };
  }

  await saveMeal(meal);
  revalidatePath('/meals', 'layout'); // cache revalidation layout
  redirect('/meals');
};
