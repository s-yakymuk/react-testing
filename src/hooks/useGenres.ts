import { useQuery } from "@tanstack/react-query";

import { getGenres } from "@/lib/api";

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    select: (res) => res.map(({ id, name }) => ({ value: id, label: name })),
  });

export default useGenres;
