import { isMockAllowed } from "./Config";
import { LOGIN, MENU, MENUS } from "../constants";
import responseLogin from "./responses/responseLogin";
import responseMenus from "./responses/responseMenus";
import responseEntertainment from "./responses/responseEntertainment";

export const mockQiwii = (instance: any) => {
  if (isMockAllowed("Qiwii", LOGIN)) {
    instance.onPost(LOGIN).reply((config) => {
      return new Promise((resolve) => {
        const data = JSON.parse(config.data);
        if (
          data.email === "kounsidi@gmail.com" &&
          data.password === "fsom9ogx" &&
          data.uuid === "ABCD1234"
        ) {
          resolve([200, responseLogin]);
        } else {
          resolve([
            400,
            {
              errors: "Your Email and Password Combination does not Match",
            },
          ]);
        }
      });
    });
  }

  if (isMockAllowed("Qiwii", MENU)) {
    instance.onGet(MENU).reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, responseMenus]);
        });
      });
    });
  }

  if (isMockAllowed("Qiwii", MENUS)) {
    instance.onGet(MENUS).reply(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, responseEntertainment]);
        });
      });
    });
  }

  instance.onAny().passThrough();
};
