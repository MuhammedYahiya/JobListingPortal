import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const AuthorisedRoute = ({ element }) => {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/verify-token",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (e) {
        console.error("Error:", e);
        setUser(null);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, [navigate, setUser]);

  return isLoading ? (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner size={32} className="text-black animate-spin" />
          <div>Signing in..</div>
        </div>
      </div>
    </>
  ) : user ? (
    <div>{element}</div>
  ) : null;
};
