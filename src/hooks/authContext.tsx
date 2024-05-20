import React, { createContext, useContext, useState } from "react";
import { login, register, userDetails } from "../api";

interface IAuthContext {
  token: string;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  userDetails: () => Promise<any>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  token: '',
  login: async () => {},
  register: async () => {},
  userDetails: async () => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      setToken(result.accessToken);  
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      const result = await register(email, password);
      setToken(result.accessToken); 
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserDetails = async () => {
    if (token) {
      try {
        const data = await userDetails(token);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };
  const handleLogout = () => {
    setToken(''); 
  };


  return (
    <AuthContext.Provider value={{ token, login: handleLogin, register: handleRegister, userDetails: fetchUserDetails, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
