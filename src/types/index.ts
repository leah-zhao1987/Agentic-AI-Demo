export interface Card {
  description?: string;
  id: number;
  title: string;
  abstract: string;
  imageUrl: string;
  type?: string;
  provider?: any;
  images?: any;
  thumbnail: string;
  publishedDateTime?: string;
  category: string;
  topics?: string[];
  acceptStatus?: number;
  source?: string;
  majorCategory?: string;
  topic?: string;
  defaultImag?: string;
  isPlaceholder?: boolean;
  body?: Element | string;
  image?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}