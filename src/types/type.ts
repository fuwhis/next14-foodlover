interface IMeal {
  id: number;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  instructions: string;
  creator_email: string;
}

interface IProps {
  meals: Array<IMeal>;
}

export type { IMeal, IProps };
