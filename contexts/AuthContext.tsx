"use client";
import { User } from "@/lib/@types";
import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const body = JSON.stringify({ email, password });

    const response = await fetch("api/users/login", {
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    if (data.user && password != null) {
      console.log(user);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetch("api/users/login", { method: "DELETE" });
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
