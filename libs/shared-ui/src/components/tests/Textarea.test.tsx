import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Textarea } from "../Textarea";

describe("Textarea", () => {
  it("renders with a placeholder", () => {
    render(<Textarea placeholder="Add details" />);
    expect(screen.getByPlaceholderText("Add details")).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Textarea className="resize-y" placeholder="Resizable" />);
    expect(screen.getByPlaceholderText("Resizable")).toHaveClass("resize-y");
  });

  it("respects the disabled state", () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    expect(screen.getByPlaceholderText("Disabled textarea")).toBeDisabled();
  });

  it("renders a default value", () => {
    render(<Textarea defaultValue="Prefilled content" />);
    expect(screen.getByDisplayValue("Prefilled content")).toBeInTheDocument();
  });
});
