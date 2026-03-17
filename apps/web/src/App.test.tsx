import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the form foundations preview", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Form Foundations Preview" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });
});
