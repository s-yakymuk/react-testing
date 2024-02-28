import axios from "axios";

import { AddEditMovieSchema } from "./schemas";

const api = axios.create({ baseURL: "http://localhost:3000" });

export interface Movie extends AddEditMovieSchema {
  id: string;
  video: boolean;
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
}

export interface Genre {
  id: string;
  name: string;
}

export const getMovies = () =>
  api.get<Movie[]>("/movies").then((res) => res.data);

export const getGenres = () =>
  api.get<Genre[]>("/genres").then((res) => res.data);

export const upsertMovie = ({ id, ...movie }: AddEditMovieSchema) =>
  id
    ? api.patch<Movie>(`/movies/${id}`, movie)
    : api.post<Movie>("/movies", {
        ...movie,
        video: false,
        popularity: 0,
        vote_average: 0,
        vote_count: 0,
        backdrop_path: "",
        poster_path: "",
      });

export const deleteMovie = (id: string) => api.delete(`/movies/${id}`);
