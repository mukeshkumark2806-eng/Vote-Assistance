"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  email: string;
  role: "user" | "admin";
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: "user" | "admin") => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for session on load
    const storedUser = localStorage.getItem("vote_wise_mock_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: "user" | "admin" = "user") => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split("@")[0],
    };
    setUser(newUser);
    localStorage.setItem("vote_wise_mock_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vote_wise_mock_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
