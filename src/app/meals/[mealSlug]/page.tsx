import { getMealDetailBySlug } from '@/lib/meals';
import { IDynamicMetadata, MealMetadata } from '@/types/type';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import classes from './page.module.css';

interface MealsDetailPageProps {
  params: {
    mealSlug: string;
  };
}

export async function generateMetadata({ params }: MealsDetailPageProps): Promise<IDynamicMetadata> {
  const meal: MealMetadata & any = getMealDetailBySlug(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary
  };
}

export default async function MealDetailPage({ params }: MealsDetailPageProps) {
  const meal = await getMealDetailBySlug(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions?.replace(/\n/g, '<br />');
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://fuwhis-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html: meal.instructions
        }}></p>
      </main>
    </>
  );
};
