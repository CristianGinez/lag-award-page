export interface Nominee {
  name: string;
  creator?: string;
  image: string;
  description: string;
}

export interface Category {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  color: string;
  tvBackground: string;
  nominees: Nominee[];
}

export interface Winner {
  category_id: string;
  nominee_name: string;
  vote_count: number;
}
