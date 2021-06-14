import { combineReducers } from "redux";
import * as HomeReducer from "../collections/Home/reducer";
import * as MerchantReducer from "../collections/Merchant/reducer";
import * as ServiceReducer from "../collections/Service/reducer";

const appReducers = combineReducers(
  Object.assign(HomeReducer, MerchantReducer, ServiceReducer)
);

export default appReducers;
