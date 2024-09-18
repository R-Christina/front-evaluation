import Login from "views/Auth/Login.jsx";

var dashRoutes = [
  {
    path: "/login",
    name: "Login",
    secondaryNavbar: true,
    component: Login,
    layout: "/login",
  },
];

export default dashRoutes;