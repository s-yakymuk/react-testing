import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import FormTextarea from "@/components/form/FormTextarea";
import FormCheckboxGroup from "@/components/form/FormCheckboxGroup";

import useGenres from "@/hooks/useGenres";
import { upsertMovie } from "@/lib/api";
import { useMoviesStore } from "@/lib/stores";
import { addEditMovieSchema, AddEditMovieSchema } from "@/lib/schemas";
import FormDatePicker from "./form/FormDatePicker";

const ORIGINAL_LANGUAGE_OPTIONS = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "de",
    label: "German",
  },
  {
    value: "es",
    label: "Spanish",
  },
  {
    value: "ko",
    label: "Korean",
  },
];

export default function AddEditMovieModal() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: genres, isLoading } = useGenres();
  const { closeModal, isAddEditModalOpen, activeMovie } = useMoviesStore();
  const form = useForm<AddEditMovieSchema>({
    resolver: zodResolver(addEditMovieSchema),
  });

  const addOrEditMovie = useMutation({
    mutationFn: upsertMovie,
    onSuccess: () => {
      toast({
        title: `Movie has been ${isAddModal ? "added" : "edited"} successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      closeModal();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Failed to ${isAddModal ? "add" : "edit"} movie`,
        description: "Make sure your connection is working",
      });
    },
  });
  const formReset = form.reset;
  const mutationReset = addOrEditMovie.reset;

  const isAddModal = !activeMovie;

  useEffect(() => {
    if (isAddEditModalOpen) {
      mutationReset();
      formReset(
        activeMovie
          ? addEditMovieSchema.parse(activeMovie)
          : {
              id: "",
              adult: false,
              genre_ids: [],
              original_language: "",
              original_title: "",
              overview: "",
              release_date: "",
              title: "",
            }
      );
    }
  }, [isAddEditModalOpen, activeMovie, formReset, mutationReset]);

  return (
    <Dialog open={isAddEditModalOpen} onOpenChange={closeModal}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className="max-w-2xl overflow-y-auto max-h-screen"
      >
        <DialogHeader>
          <DialogTitle>{isAddModal ? "Add" : "Edit"} Movie</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <Form {...form}>
            <form
              id="add-edit-movie-form"
              onSubmit={form.handleSubmit((values) =>
                addOrEditMovie.mutate(values)
              )}
            >
              <input hidden readOnly {...form.register("id")} />
              <FormInput form={form} name="title" label="Title" />
              <FormInput
                form={form}
                name="original_title"
                label="Original Title"
              />
              <FormSelect
                form={form}
                name="original_language"
                label="Original Language"
                placeholder="Select original language"
                options={ORIGINAL_LANGUAGE_OPTIONS}
              />
              <FormDatePicker
                form={form}
                name="release_date"
                label="Release Date"
              />
              <FormCheckboxGroup
                form={form}
                name="genre_ids"
                label="Genres"
                options={genres}
                disabled={isLoading}
              />
              <FormTextarea form={form} name="overview" label="Overview" />
            </form>
          </Form>
        </div>
        <DialogFooter>
          {addOrEditMovie.isPending && (
            <span className="loading loading-bars loading-md" />
          )}
          <Button
            type="submit"
            size="sm"
            form="add-edit-movie-form"
            disabled={addOrEditMovie.isPending}
          >
            Save
          </Button>
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
