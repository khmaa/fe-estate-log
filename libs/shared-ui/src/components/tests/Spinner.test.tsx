import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "../Spinner";

describe("Spinner", () => {
  it("renders with the default loading label", () => {
    render(<Spinner />);

    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("applies a custom label", () => {
    render(<Spinner label="Saving changes" />);

    expect(
      screen.getByRole("status", { name: "Saving changes" })
    ).toBeInTheDocument();
  });

  it("applies the selected size classes", () => {
    render(<Spinner size="lg" />);

    expect(screen.getByRole("status").firstChild).toHaveClass("h-6", "w-6");
  });
});
