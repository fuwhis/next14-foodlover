import { IProps } from '@/types/type';
import MealItem from './meal-item';
import classes from './meals-grid.module.css';

export default function MealsGrid({ meals }: IProps) {

  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
