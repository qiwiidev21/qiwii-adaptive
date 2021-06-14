import { render as rtlRender } from "@testing-library/react";
import Service from "./index";
import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../../redux/reducers";

function render(
  ui,
  {
    initialState,
    store = createStore(
      reducer,
      initialState,
      applyMiddleware(thunkMiddleware)
    ),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(<Service />, { wrapper: Wrapper, ...renderOptions });
}

test("renders App", () => {
  render();
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 423,
  }),
  useRouteMatch: () => ({
    pathname: "localhost:3000/adaptive/kesehatan",
  }),
}));

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
