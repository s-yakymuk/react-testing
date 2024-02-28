import { HttpResponse, http } from "msw";
import { v4 as uuidv4 } from "uuid";

import { Genre, Movie } from "@/lib/api";
import { AddEditMovieSchema } from "@/lib/schemas";

export const GENRES_MOCK: Genre[] = [
  {
    id: "1",
    name: "Action",
  },
  {
    id: "2",
    name: "Thriller",
  },
  {
    id: "3",
    name: "Comedy",
  },
];

export const MOVIES_MOCK: Movie[] = [
  {
    adult: false,
    backdrop_path: "/nTPFkLUARmo1bYHfkfdNpRKgEOs.jpg",
    genre_ids: ["1", "2"],
    id: "1072790",
    original_language: "en",
    original_title: "Anyone But You",
    overview:
      "After an amazing first date, Bea and Ben’s fiery attraction turns ice cold — until they find themselves unexpectedly reunited at a destination wedding in Australia. So they do what any two mature adults would do: pretend to be a couple.",
    popularity: 2262.189,
    poster_path: "/yRt7MGBElkLQOYRvLTT1b3B1rcp.jpg",
    release_date: "2023-12-21",
    title: "Anyone But You",
    video: false,
    vote_average: 6.9,
    vote_count: 624,
  },
  {
    adult: false,
    backdrop_path: "/meyhnvssZOPPjud4F1CjOb4snET.jpg",
    genre_ids: ["2", "3"],
    id: "940551",
    original_language: "en",
    original_title: "Migration",
    overview:
      "After a migrating duck family alights on their pond with thrilling tales of far-flung places, the Mallard family embarks on a family road trip, from New England, to New York City, to tropical Jamaica.",
    popularity: 1456.828,
    poster_path: "/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
    release_date: "2023-12-06",
    title: "Migration",
    video: false,
    vote_average: 7.6,
    vote_count: 750,
  },
  {
    adult: false,
    backdrop_path: "/ay0PJQZizDXk0pzhoGX4v7K9h7A.jpg",
    genre_ids: ["1", "3"],
    id: "1214314",
    original_language: "en",
    original_title: "One More Shot",
    overview:
      "Following the attack on the black site in Poland, Navy SEAL Jake Harris is ordered to escort terrorist suspect Amin Mansur to Washington D.C. for interrogation. Before the prisoner transfer process is complete, though, the airport is attacked by a group of heavily armed, well-trained mercenaries.",
    popularity: 435.897,
    poster_path: "/4XxnWZzhMC1rOzUCJpc6CzmBIQe.jpg",
    release_date: "2024-01-12",
    title: "One More Shot",
    video: false,
    vote_average: 6.6,
    vote_count: 159,
  },
];

let movies = [...MOVIES_MOCK];
let genres = [...GENRES_MOCK];

export const resetMocks = () => {
  movies = [...MOVIES_MOCK];
  genres = [...GENRES_MOCK];
};

export const handlers = [
  http.get("/genres", () => {
    return HttpResponse.json(genres, { status: 200 });
  }),
  http.get("/movies", () => {
    return HttpResponse.json(movies, { status: 200 });
  }),
  http.post("/movies", async ({ request }) => {
    const draftMovie = (await request.json()) as AddEditMovieSchema;

    const movie: Movie = {
      ...draftMovie,
      id: uuidv4(),
      video: false,
      popularity: 0,
      vote_average: 0,
      vote_count: 0,
      backdrop_path: "",
      poster_path: "",
    };

    movies.push(movie);

    return HttpResponse.json(movie, { status: 201 });
  }),
  http.patch("/movies/:id", async ({ request, params }) => {
    const patchMovie = (await request.json()) as AddEditMovieSchema;
    const id = params.id as string;

    const movieIdx = movies.findIndex((m) => m.id === id);

    if (movieIdx === -1) {
      return HttpResponse.error();
    }

    movies[movieIdx] = {
      ...movies[movieIdx],
      ...patchMovie,
    };

    return HttpResponse.json(movies[movieIdx], { status: 200 });
  }),
];
