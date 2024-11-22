import Home from "./pages/HomePage";
import Watchlist from "./pages/WatchlistPage";
import About from "./pages/AboutPage";

const routes = [
  {
    path: "",
    component: Home,
    name: "Home Page",
    protected: false,
  },

  {
    path: "/about/:coin",
    component: About,
    name: "About Page",
    protected: false,
  },

  {
    path: "/watchlist",
    component: Watchlist,
    name: "Watchlist Page",
    protected: true,
  }
];

export default routes;
