"use client"



import { createContext, ReactNode, useEffect, useState } from "react";
import supabase from "@/app/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loadingUser: boolean;
  logout: () => Promise<void>;
  onAuthStateChange?: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  onAuthStateChange,
}: {
  children: ReactNode;
  onAuthStateChange?: (user: User | null) => void;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const getCurrentSession = async () => {
    setLoadingUser(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) console.error("Error getting session:", error);
    setUser(data?.session?.user || null);
    setLoadingUser(false);
  };

  useEffect(() => {
    getCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);
        if (onAuthStateChange) onAuthStateChange(currentUser);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [onAuthStateChange]);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;

      setUser(null);
    } catch (err) {
      console.error("Error during SignOut", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loadingUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
