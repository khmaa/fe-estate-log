import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Shared Button</Button>);
    expect(screen.getByRole("button", { name: "Shared Button" })).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Button className="bg-red-500">Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toHaveClass("bg-red-500");
  });
});
