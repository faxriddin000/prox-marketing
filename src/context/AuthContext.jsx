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
    const cleanUser = String(username || '').trim().toLowerCase();
    const cleanPass = String(password || '').trim();

    if (!cleanUser || !cleanPass) {
      return { success: false, error: "❌ Login va parolni to'liq kiriting!" };
    }
    
    // Check Admin (Strict credentials verification)
    if (cleanUser === 'admin' && cleanPass === 'prox2026') {
      const user = { username: 'admin', role: 'admin', name: "Bosh Administrator" };
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.error(e);
      }
      setCurrentUser(user);
      return { success: true, user };
    }
    
    // Check Editor (Strict credentials verification)
    if (cleanUser === 'editor' && cleanPass === 'editor2026') {
      const user = { username: 'editor', role: 'editor', name: "Kontent-menejer" };
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.error(e);
      }
      setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: "❌ Noto'g'ri login yoki parol!" };
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
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
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
