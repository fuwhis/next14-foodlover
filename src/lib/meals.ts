import { IMeal, IMealFormData } from '@/types/type';
import { S3 } from '@aws-sdk/client-s3';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3({
  region: 'us-east-1'
});
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
  const filePath = `${fileName}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: 'fuwhis-nextjs-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = filePath as any;

  db.prepare<unknown[], IMeal>(`
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
  `).run(meal);
}
