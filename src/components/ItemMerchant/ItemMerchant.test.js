import { render } from "@testing-library/react";
import ItemMerchant from "./index";

test("renders ItemMerchant component", () => {
  render(<ItemMerchant />);
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteMatch: () => ({
    pathname: "localhost:3000/adaptive/kesehatan",
  }),
}));
