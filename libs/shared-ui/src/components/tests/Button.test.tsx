import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Shared Button</Button>);
    expect(
      screen.getByRole("button", { name: "Shared Button" })
    ).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Button className="bg-red-500">Click</Button>);
    expect(screen.getByRole("button", { name: "Click" })).toHaveClass(
      "bg-red-500"
    );
  });

  it("applies the secondary variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button", { name: "Secondary" })).toHaveClass(
      "bg-secondary"
    );
    expect(screen.getByRole("button", { name: "Secondary" })).toHaveClass(
      "ring-border"
    );
  });

  it("applies the large size classes", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button", { name: "Large" })).toHaveClass("h-12");
    expect(screen.getByRole("button", { name: "Large" })).toHaveClass("px-5");
  });

  it("renders a spinner and disables the button when loading", () => {
    render(<Button loading>Saving</Button>);

    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });
});
