import { useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] =
    useState(() => {
      const savedUser =
        localStorage.getItem(
          "auth_user"
        );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    });

  const handleLogin = (
    authenticatedUser
  ) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default App;