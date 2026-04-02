import { index, route, layout } from "@react-router/dev/routes";

export default [
  // Public routes
  route("login", "routes/login.jsx"),
  route("register", "routes/register.jsx"),
  route("forgot-password", "routes/forgot-password.jsx"),

  // Protected routes layout
  layout("routes/protected.jsx", [
    index("routes/home.jsx"),
    // Add more protected routes here, e.g.:
    // route("dashboard", "routes/dashboard.jsx"),
    // route("profile", "routes/profile.jsx"),
  ]),
];
