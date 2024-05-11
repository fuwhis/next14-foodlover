import { IMeal, IMealFormData } from '@/types/type';
import sql from 'better-sqlite3';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare<unknown[], IMeal>('SELECT * FROM meals').all();
}

export async function getMealDetailBySlug(slug: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare<unknown[], IMeal>('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export async function saveMeal(meal: IMealFormData) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const filePath = `/images/${fileName}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  meal.image = filePath as any;

  db.prepare<unknown[], IMeal>(`INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(meal);
}
