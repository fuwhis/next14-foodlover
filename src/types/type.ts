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

interface IImageData {
  name: string;
  size: number;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
}

interface IMealFormData {
  slug: string;
  title: string;
  summary: string;
  instructions: string;
  image: IImageData;
  creator: string;
  creator_email: string;
}

interface IProps {
  meals: Array<IMeal>;
}

export type { IImageData, IMeal, IMealFormData, IProps };

