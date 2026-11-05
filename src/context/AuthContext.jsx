import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AUTH_STORAGE_KEY = 'prox_marketing_auth_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const login = (username, password) => {
    const cleanUser = username.trim().toLowerCase();
    
    // Check Admin
    if ((cleanUser === 'admin' && password === 'prox2026') || (cleanUser === 'admin' && !password)) {
      const user = { username: 'admin', role: 'admin', name: "Bosh Administrator" };
      setCurrentUser(user);
      return { success: true, user };
    }
    
    // Check Editor
    if ((cleanUser === 'editor' && password === 'editor2026') || (cleanUser === 'editor' && !password)) {
      const user = { username: 'editor', role: 'editor', name: "Kontent-menejer" };
      setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: "Login yoki parol noto'g'ri. Iltimos, qaytadan urinib ko'ring." };
  };

  const loginAsDemo = (role) => {
    if (role === 'admin') {
      const user = { username: 'admin', role: 'admin', name: "Bosh Administrator (Admin)" };
      setCurrentUser(user);
      return user;
    } else {
      const user = { username: 'editor', role: 'editor', name: "Kontent-menejer (Editor)" };
      setCurrentUser(user);
      return user;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Permission helpers
  const isAdmin = currentUser?.role === 'admin';
  const isEditor = currentUser?.role === 'editor';
  const isAuthenticated = !!currentUser;

  const canEditPricing = isAdmin;
  const canManageSettings = isAdmin;
  const canDeleteLeads = isAdmin;
  const canEditContent = isAdmin || isEditor;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        isEditor,
        login,
        loginAsDemo,
        logout,
        canEditPricing,
        canManageSettings,
        canDeleteLeads,
        canEditContent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
