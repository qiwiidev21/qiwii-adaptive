import { ENVIRONMENT, MENU, MENUS } from "../constants";

const config = {
  development: {
    Qiwii: [MENU, MENUS],
  },
};

export const isMockAllowed = (serviceName: string, endpoint: string) => {
  const allowed = config[ENVIRONMENT][serviceName];
  if (allowed === "*") return true;
  else if (allowed === false) return false;
  else if (allowed instanceof Array && allowed.indexOf(endpoint) >= 0)
    return true;
  else return false;
};
