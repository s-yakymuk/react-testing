import Movies from "@/components/Movies";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import DeleteMovieModal from "@/components/DeleteMovieModal";
import AddEditMovieModal from "@/components/AddEditMovieModal";

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl gap-2 text-center h-full p-8 pb-4">
        <h1 className="text-2xl mb-4 font-extrabold">React Testing Examples</h1>
        <Movies />
      </main>
      <Toaster />
      <AddEditMovieModal />
      <DeleteMovieModal />
    </>
  );
}

export default App;
