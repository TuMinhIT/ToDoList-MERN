import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Nếu chưa đăng nhập thì redirect về login
    return <Navigate to="/" replace />;
  }

  return children;
}
