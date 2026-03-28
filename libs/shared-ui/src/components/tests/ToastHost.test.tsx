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

  it("uses default variant and dismiss label when options are omitted", () => {
    const MinimalToastConsumer = () => {
      const { showToast } = useToast();

      return (
        <Button
          onClick={() =>
            showToast({
              title: "Minimal toast",
            })
          }
        >
          Show minimal toast
        </Button>
      );
    };

    render(
      <ToastHostProvider>
        <MinimalToastConsumer />
      </ToastHostProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Show minimal toast" }));

    expect(screen.getByText("Minimal toast")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
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

  it("updates toast visibility through the internal dismiss action", () => {
    render(
      <ToastHostProvider>
        <ToastConsumer />
      </ToastHostProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Show toast" }));
    fireEvent.click(screen.getAllByRole("button", { name: "Dismiss" })[0]);

    expect(screen.queryByText("Saved")).not.toBeInTheDocument();
  });
});
