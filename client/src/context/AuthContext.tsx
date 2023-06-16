import { useLocalStorage } from "hooks";
import { FC, createContext, useState, ReactNode, useEffect } from "react";

const initialState = {
  token: "",
  setToken: (_: string) => {},
  isAuthenticated: false,
};

interface IAuthContext {
  token: string;
  setToken: (token: string) => void;
  isAuthenticated: boolean;
}

interface AuthContextWrapperProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>(initialState);

const AuthContextWrapper: FC<AuthContextWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useLocalStorage("token", "");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthContextWrapper;
