function ProtectedRoute({
  children,
}) {
  const token =
    localStorage.getItem(
      "jwt_token"
    );

  if (!token) {
    return null;
  }

  return children;
}

export default ProtectedRoute;