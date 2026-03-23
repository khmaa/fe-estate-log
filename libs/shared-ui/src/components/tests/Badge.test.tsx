import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies the error variant classes", () => {
    render(<Badge variant="error">Blocked</Badge>);
    expect(screen.getByText("Blocked")).toHaveClass("bg-danger-soft");
    expect(screen.getByText("Blocked")).toHaveClass("text-danger");
  });

  it("applies className", () => {
    render(<Badge className="uppercase">Featured</Badge>);
    expect(screen.getByText("Featured")).toHaveClass("uppercase");
  });
});
