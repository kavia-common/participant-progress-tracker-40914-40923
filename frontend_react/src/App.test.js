import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Bootcamp Progress Portal header title", () => {
  render(<App />);
  const title = screen.getByText(/Bootcamp Progress Portal/i);
  expect(title).toBeInTheDocument();
});
