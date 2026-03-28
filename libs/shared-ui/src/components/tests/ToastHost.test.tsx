import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import { ToastHostProvider } from "../ToastHost";
import { useToast } from "../useToast";

const ToastConsumer = () => {
  const { dismissToast, showToast } = useToast();

  return (
    <div>
      <Button
        onClick={() =>
          showToast({
            title: "Saved",
            description: "The latest changes were saved.",
            variant: "success",
          })
        }
      >
        Show toast
      </Button>
      <Button variant="secondary" onClick={dismissToast}>
        Dismiss toast
      </Button>
    </div>
  );
};

describe("ToastHostProvider", () => {
  it("shows a toast through the helper hook", () => {
    render(
      <ToastHostProvider>
        <ToastConsumer />
      </ToastHostProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Show toast" }));

    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(
      screen.getByText("The latest changes were saved.")
    ).toBeInTheDocument();
  });

  it("dismisses the active toast through the helper hook", () => {
    render(
      <ToastHostProvider>
        <ToastConsumer />
      </ToastHostProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
    fireEvent.click(screen.getByRole("button", { name: "Dismiss toast" }));

    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });
});
