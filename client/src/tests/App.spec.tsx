import { render, fireEvent } from "@testing-library/react";

import App from "../App";

test("count starts at 0", () => {
  const { getByText } = render(<App />);
  expect(getByText(/count is 0/i)).toBeInTheDocument();
});

test("count increases on button click", () => {
  const { getByText } = render(<App />);
  const button = getByText(/count is 0/i);
  fireEvent.click(button);
  expect(getByText(/count is 1/i)).toBeInTheDocument();
});