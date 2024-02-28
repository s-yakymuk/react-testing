import { render } from "@/lib/test-utils";
import { Button } from "./button";

describe("Button tests", () => {
  it("matches snapshot with default props", () => {
    const { asFragment } = render(<Button />);
    const result = asFragment();

    expect(result).toMatchSnapshot();
  });
});
