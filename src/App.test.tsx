import { expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import App from "./App";

test("it should render", () => {
  render(<App />);
  expect(screen.getByText(/fresh fruit store/i)).toBeInTheDocument();
});
