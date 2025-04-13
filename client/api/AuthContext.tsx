"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    confirmPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch(
      "https://prometica-server.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    console.log("Logged in user data:", data.data.user);

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    setUser(data.data.user);
  };

  const logout = async () => {
    await fetch("https://prometica-server.vercel.app/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    confirmPassword: string
  ) => {
    const response = await fetch(
      "https://prometica-server.vercel.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "https://prometica.vercel.app",
        },
        body: JSON.stringify({ email, password, name, confirmPassword }),
        credentials: "include",
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("Registration failed:", data);
      throw new Error(data.message || "Failed to register user");
    }

    localStorage.setItem("token", data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    console.log("user is", data.data.user);
    setUser(data.data.user);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        setUser(JSON.parse(userData));
      } else if (token) {
        try {
          const response = await fetch(
            "https://prometica-server.vercel.app/api/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.data.user));
            setUser(data.data.user);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
