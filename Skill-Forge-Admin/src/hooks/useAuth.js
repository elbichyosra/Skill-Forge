import { useEffect, useRef } from "react";
import Keycloak from "keycloak-js";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setToken, setUserName ,setUserId} from "../store/reducers/authSlice";
import { setLogoutFunction, logoutUser } from "../services/AuthManager";

const useAuth = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.auth.userName);
  const clientRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const client = new Keycloak({
        url: process.env.REACT_APP_KEYCLOAK_URL,
        realm: process.env.REACT_APP_KEYCLOAK_REALM,
        clientId: process.env.REACT_APP_KEYCLOAK_CLIENT,
      });

      client.init({ onLoad: "login-required" }).then((res) => {
        if (res) {
          if (isAdminWithFixedCredentials(client.tokenParsed)) {
            dispatch(setLogin(true));
            dispatch(setToken(client.token));
          

            if (client.tokenParsed && client.tokenParsed.name) {
              dispatch(setUserName(client.tokenParsed.name));
            } else {
              console.warn("Impossible de récupérer le nom depuis le jeton ID");
            }
          // Mettre à jour l'ID de l'utilisateur dans le Redux
            if (client.tokenParsed && client.tokenParsed.sub) {
              dispatch(setUserId(client.tokenParsed.sub));
                }else{
                console.warn("Impossible de récupérer l'ID depuis le jeton ");
            }
            // Définir la fonction de déconnexion
            setLogoutFunction(client.logout);
          } else {
            dispatch(setLogin(false));
          }
        }
      });

      clientRef.current = client;
      isInitialized.current = true;
    }
  }, [dispatch,isInitialized]);

  const handleLogout = () => {
    // Gérer la déconnexion via le gestionnaire d'événements
    clientRef.current.logout();
  
  };

  return [isLogin, token, handleLogout, userName];
};

export default useAuth;

const isAdminWithFixedCredentials = (tokenParsed) => {
  const isAdmin =
  tokenParsed &&
  tokenParsed.resource_access &&
  tokenParsed.resource_access.backoffice &&
  tokenParsed.resource_access.backoffice.roles &&
  tokenParsed.resource_access.backoffice.roles.includes("admin");

  return isAdmin;
};
