// authManager.js

let logoutFunction = null;

export const setLogoutFunction = (func) => {
  logoutFunction = func;
};

export const logoutUser = () => {
  if (logoutFunction) {
    logoutFunction();
  }
};
