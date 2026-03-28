import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToast } from "../useToast";

describe("useToast", () => {
  it("throws when used outside ToastHostProvider", () => {
    expect(() => renderHook(() => useToast())).toThrow(
      "useToast must be used within ToastHostProvider"
    );
  });
});
