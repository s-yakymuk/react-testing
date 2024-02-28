import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { deleteMovie } from "@/lib/api";
import { useMoviesStore } from "@/lib/stores";

export default function DeleteMovieModal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { closeModal, isDeleteModalOpen, activeMovie } = useMoviesStore();

  const deleteMovieMutation = useMutation({
    mutationFn: deleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      closeModal();
    },
    onError: () => {
      toast({ variant: "destructive", title: "Failed to delete this movie" });
    },
  });

  const mutationReset = deleteMovieMutation.reset;

  useEffect(() => {
    if (isDeleteModalOpen) {
      mutationReset();
    }
  }, [mutationReset, isDeleteModalOpen]);

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Movie</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{activeMovie?.title}"?
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 text-sm">This action is irreversible!</div>
        <DialogFooter>
          {deleteMovieMutation.isPending && (
            <span className="loading loading-bars loading-md" />
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (activeMovie?.id) {
                deleteMovieMutation.mutate(activeMovie.id);
              }
            }}
          >
            <Button
              type="submit"
              size="sm"
              variant="destructive"
              disabled={deleteMovieMutation.isPending}
            >
              Yes, delete
            </Button>
          </form>
          <DialogClose asChild>
            <Button size="sm" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
