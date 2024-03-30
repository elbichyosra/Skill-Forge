import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const useAuth = () => {
  const [isInitialized, setInitialized] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!isInitialized) {
      const client =new Keycloak({
        url: process.env.REACT_APP_KEYCLOAK_URL,
        realm: process.env.REACT_APP_KEYCLOAK_REALM,
        clientId: process.env.REACT_APP_KEYCLOAK_CLIENT,
        // clientSecret:process.env.REACT_APP_KEYCLOAK_CLIENT_SECRET,
        });
      
      client.init({ onLoad: "login-required" }).then((res) => {
        setLogin(res);
        setToken(client.token);
        console.log(client.token);

        // Retrieve name securely (after successful login)
        if (client.tokenParsed && client.tokenParsed.name) {
          setUserName(client.tokenParsed.name);
          console.log(client.tokenParsed.name);
        } else {
          console.warn("Unable to retrieve name from ID token");
        }
      });

      clientRef.current = client;
      setInitialized(true);
    }
  }, [isInitialized]);
  const logout = () => {
    clientRef.current.logout();
  };
  return [isLogin, token, logout, userName];
};

export default useAuth;
