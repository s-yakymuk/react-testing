import { debug } from "vitest-preview";
import { render, screen, userEvent } from "./lib/test-utils";

import { server } from "./mocks/server";
import { HttpResponse, http } from "msw";

import App from "./App";

describe("App integration tests", () => {
  it("TC-123 - Should allow adding a new movie", async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    expect(
      screen.getByRole("heading", { name: "React Testing Examples", level: 1 })
    ).toBeInTheDocument();

    const addMovieButton = await screen.findByRole("button", {
      name: "Add Movie",
    });

    await user.click(addMovieButton);

    await user.type(screen.getByLabelText("Title"), "Test title");
    await user.type(screen.getByLabelText("Original Title"), "Test OG title");

    await user.click(
      screen.getByRole("combobox", {
        name: "Original Language",
      })
    );

    await user.click(screen.getByRole("option", { name: "Spanish" }));

    await user.click(
      screen.getByRole("button", {
        name: "Release Date",
      })
    );

    await user.click(screen.getByRole("gridcell", { name: /15/i }));

    await user.click(screen.getByRole("button", { name: "Save" }));

    // Check for validation errors

    expect(screen.getByText(/select at least one genre/i)).toBeInTheDocument();

    // Enter missing data

    await user.type(
      screen.getByLabelText("Overview"),
      "testing testing testing"
    );

    await user.click(screen.getByRole("checkbox", { name: "Thriller" }));

    // Save again

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(
      screen.getByText(/movie has been added successfully/i)
    ).toBeInTheDocument();

    // Calling unmount explicitly usually is not needed,
    // but React 18 shows warnings otherwise with the current RTL version
    unmount();
  });

  it("TC-125 - Should allow editing movies", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    const editMovieButton = await screen.findByRole("button", {
      name: /edit migration/i,
    });

    await user.click(editMovieButton);

    await user.type(screen.getByLabelText("Title"), " Updated");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(
      screen.getByText(/movie has been edited successfully/i)
    ).toBeInTheDocument();

    debug();

    unmount();
  });

  it("TC-124 - Should show error if back end response is invalid while editing a movie", async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    server.use(http.patch("/movies/:id", () => HttpResponse.error()));

    const editMovieButton = await screen.findByRole("button", {
      name: /edit migration/i,
    });

    await user.click(editMovieButton);

    await user.type(screen.getByLabelText("Title"), " Updated");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(screen.getByText(/failed to edit movie/i)).toBeInTheDocument();

    unmount();
  });
});
