import { fireEvent, render, screen } from "@testing-library/react";
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

  it("opens the dialog and shows a toast from the showcase actions", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Show success toast" }));

    expect(screen.getByText("Preview saved")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your showcase preferences were saved for the current session."
      )
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Open dialog preview" })
    );

    expect(
      screen.getByRole("heading", { name: "Create a new visit log" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });

  it("toggles the release notification switch", () => {
    render(<App />);

    const toggle = screen.getByRole("checkbox", {
      name: "Enable release notifications",
    });

    expect(toggle).toBeChecked();

    fireEvent.click(toggle);

    expect(toggle).not.toBeChecked();
  });
});
