import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // If token exists → allow access
  if (token) {
    return children;
  }

  // If not → redirect to login
  return <Navigate to="/" />;
}

export default PrivateRoute;
