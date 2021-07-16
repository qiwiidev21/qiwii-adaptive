import { render as rtlRender } from "@testing-library/react";
import Salon from "./index";
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
  return rtlRender(<Salon />, { wrapper: Wrapper, ...renderOptions });
}

test("renders App", () => {
  render();
});

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
