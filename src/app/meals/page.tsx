import { getMeals } from '@/lib/meals';
import { IMeal } from '@/types/type';
import Link from 'next/link';
import MealsGrid from '../components/meals/meals-grid';
import classes from './page.module.css';

export default async function MealPage() {
  const meals: Array<IMeal> & any = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe & cook it by yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href='/meals/share'>
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
