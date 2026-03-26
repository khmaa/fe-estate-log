import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";

describe("Dialog", () => {
  it("opens content through the trigger", () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new visit log</DialogTitle>
            <DialogDescription>Structured modal layout.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>Dialog body content</p>
          </DialogBody>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Create a new visit log" })
    ).toBeInTheDocument();
    expect(screen.getByText("Dialog body content")).toBeInTheDocument();
  });

  it("closes content through the close action", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Closeable dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("merges className on content", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent className="custom-dialog">
          <DialogHeader>
            <DialogTitle>Custom class dialog</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toHaveClass("custom-dialog");
  });
});
