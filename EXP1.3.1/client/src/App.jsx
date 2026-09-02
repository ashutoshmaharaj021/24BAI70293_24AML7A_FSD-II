import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import AccessDenied from "./pages/AccessDenied";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Editor",
                "Viewer",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Editor",
                "Viewer",
              ]}
            >
              <Posts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Editor",
              ]}
            >
              <Editor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={["Admin"]}
            >
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/access-denied"
          element={<AccessDenied />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;