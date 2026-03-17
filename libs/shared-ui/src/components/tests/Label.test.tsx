import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "../Label";

describe("Label", () => {
  it("renders children", () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText("Email address")).toBeInTheDocument();
  });

  it("applies htmlFor", () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("applies className", () => {
    render(<Label className="text-primary">Name</Label>);
    expect(screen.getByText("Name")).toHaveClass("text-primary");
  });
});
