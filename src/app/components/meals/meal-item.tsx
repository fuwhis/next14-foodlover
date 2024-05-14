import Image from 'next/image';
import Link from 'next/link';

import classes from './meal-item.module.css';
import { IMealItemProps } from './type';

export default function MealItem({ title, slug, image, summary, creator }: IMealItemProps) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
