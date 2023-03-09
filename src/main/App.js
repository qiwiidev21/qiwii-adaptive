import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { applyMiddleware, createStore, compose } from "redux";
import { CookiesProvider } from "react-cookie";
import reducer from "../redux/reducers";
import Routes from "../routes";
import "./styles.css";

const logger = createLogger({
  predicate: (getState, action) =>
    process.env.REACT_APP_ENVIRONMENT === "development",
});

const configureStore = (initialState) => {
  const enhancer = compose(applyMiddleware(thunkMiddleware, logger));
  return createStore(reducer, initialState, enhancer);
};

const store = configureStore({});

function App() {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <Routes />
      </CookiesProvider>
    </Provider>
  );
}

export default App;
