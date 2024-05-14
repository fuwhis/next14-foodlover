import { getMeals } from '@/lib/meals';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import MealsGrid from '../components/meals/meals-grid';
import MealsLoadingPage from '../loading-out';
import classes from './page.module.css';

export const metadata: Metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};

export default async function MealPage() {
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
        <Suspense fallback={<MealsLoadingPage />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
