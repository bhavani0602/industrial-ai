"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  profileName: string;
  setProfileName: (name: string) => void;
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [profileName, setProfileName] = useState("Bhavani S");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ profileName, setProfileName, avatarUrl, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
