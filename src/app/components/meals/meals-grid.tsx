import MealItem from './meal-item'
import classes from './meals-grid.module.css'

interface IMeal {
  id: number
  title: string
  slug: string
  image: string
  summary: string
  creator: string
}
interface IProps {
  meals: Array<IMeal>
}
export default function MealsGrid({ meals }: IProps) {

  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  )
}
