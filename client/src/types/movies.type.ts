 export interface AddMoviePayload {
  title: string;
  genre: string;
  language: string;
  duration: string;
  description: string;
  poster?: string;
}

export interface AddMovieResponse {
  success: boolean;
  data: AddMoviePayload[];
}
