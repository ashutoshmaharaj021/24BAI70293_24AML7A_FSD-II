import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const demoUsers = {
  admin: {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    password: "admin123",
  },

  editor: {
    id: 2,
    name: "Editor User",
    email: "editor@example.com",
    role: "Editor",
    password: "editor123",
  },

  viewer: {
    id: 3,
    name: "Viewer User",
    email: "viewer@example.com",
    role: "Viewer",
    password: "viewer123",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("rbac_user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const login = (email, password) => {
    const foundUser = Object.values(demoUsers).find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    localStorage.setItem(
      "rbac_user",
      JSON.stringify(safeUser)
    );

    setUser(safeUser);

    return {
      success: true,
    };
  };

  const logout = () => {
    localStorage.removeItem("rbac_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}