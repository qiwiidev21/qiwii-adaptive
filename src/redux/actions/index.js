import * as HomeAction from "../collections/Home/actions";
import * as MerchantAction from "../collections/Merchant/actions";
import * as ServiceAction from "../collections/Service/actions";

export const ActionCreators = Object.assign(
  HomeAction,
  MerchantAction,
  ServiceAction
);
