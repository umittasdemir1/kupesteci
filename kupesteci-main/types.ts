
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}
