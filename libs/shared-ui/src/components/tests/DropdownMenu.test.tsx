import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../DropdownMenu";

describe("DropdownMenu", () => {
  it("opens content through the trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Record actions</DropdownMenuLabel>
          <DropdownMenuItem>Open detail</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    fireEvent.pointerDown(screen.getByRole("button", { name: "Open menu" }), {
      button: 0,
      ctrlKey: false,
    });

    expect(screen.getByText("Record actions")).toBeInTheDocument();
    expect(screen.getByText("Open detail")).toBeInTheDocument();
  });

  it("renders separators and destructive item classes", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit draft</DropdownMenuItem>
          <DropdownMenuSeparator data-testid="menu-separator" />
          <DropdownMenuItem className="text-danger">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByTestId("menu-separator")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toHaveClass("text-danger");
  });

  it("merges className on content", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuContent className="custom-menu">
          <DropdownMenuItem>Open detail</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText("Open detail").closest("[data-slot]")).toBeNull();
    expect(document.querySelector(".custom-menu")).toBeInTheDocument();
  });
});
