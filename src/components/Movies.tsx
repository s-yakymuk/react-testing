import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { TrashIcon, Edit2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useGenres from "@/hooks/useGenres";
import { getMovies } from "@/lib/api";
import { useMoviesStore } from "@/lib/stores";

const Movies = () => {
  const { data: genres, isLoading: isGenresLoading } = useGenres();
  const { addMovie, editMovie, deleteMovie } = useMoviesStore();
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  if (isLoading || isGenresLoading) {
    return (
      <div className="p-16">
        <span className="loading loading-bars loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="font-semibold text-xl">Movies</h2>
        <Button onClick={addMovie}>Add Movie</Button>
      </div>
      <Table className="h-[calc(100vh-240px)]">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Orig. Lng</TableHead>
            <TableHead>Orig. Title</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead>Relese Date</TableHead>
            <TableHead>Adult</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies?.map((movie) => {
            return (
              <TableRow key={movie.id}>
                <TableHead>{movie.title}</TableHead>
                <TableCell>{movie.original_language}</TableCell>
                <TableCell>{movie.original_title}</TableCell>
                <TableCell>
                  {movie.genre_ids
                    .map((id) => genres?.find((g) => g.value === id)?.label)
                    .join(", ")}
                </TableCell>
                <TableCell>
                  {movie.release_date
                    ? format(movie.release_date, "dd MMM yyyy")
                    : null}
                </TableCell>
                <TableCell>{movie.adult ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => editMovie(movie)}
                      aria-label={`Edit ${movie.title}`}
                    >
                      <Edit2Icon className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteMovie(movie)}
                      aria-label={`Delete ${movie.title}`}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Movies;
