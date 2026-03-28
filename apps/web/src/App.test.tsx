import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the shared ui showcase page", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Shared UI Showcase" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Layered interaction patterns" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open dialog preview" })
    ).toBeInTheDocument();
  });
});
