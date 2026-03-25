import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Banner } from "../Banner";
import { Button } from "../Button";

describe("Banner", () => {
  it("renders title and description", () => {
    render(
      <Banner
        title="Preview environment"
        description="This workspace is connected to preview data only."
      />
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Preview environment")).toBeInTheDocument();
    expect(
      screen.getByText("This workspace is connected to preview data only.")
    ).toBeInTheDocument();
  });

  it("renders an action when provided", () => {
    render(
      <Banner
        title="Scheduled maintenance"
        description="The sync service will be unavailable for one hour."
        action={<Button size="sm">Dismiss</Button>}
      />
    );

    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("applies the warning variant styles", () => {
    render(
      <Banner
        title="Warning"
        description="This is a warning message."
        variant="warning"
      />
    );

    expect(screen.getByRole("status")).toHaveClass("border-warning");
    expect(screen.getByRole("status")).toHaveClass("bg-warning-soft");
  });
});
