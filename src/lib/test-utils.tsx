import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/components/providers/theme-provider";

const queryClient = new QueryClient();

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
