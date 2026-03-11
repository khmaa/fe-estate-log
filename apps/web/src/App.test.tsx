import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders shared button", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: "Shared Button" })).toBeInTheDocument();
  });
});
