import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { IconMoonFilled, IconMoon } from "@tabler/icons-react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import AuthDialog from "./AuthDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import CryptoReactUser from "../../images/CryptoReactUserCropped.png";

const PulseRectangle02Icon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width={24} 
    height={24} 
    color="currentColor" 
    fill="none" 
    {...props}
  >
    <path 
      d="M4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M6 13H7.5L9 9L10.5 16L12 13H13.5L15 8L16.5 13H18" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);



function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [defaultOpenTab, setDefaultOpenTab] = React.useState(0);

  const checkAuthAndNavigateOrOpenModal = (event) => {
    // Prevent default link behavior
    event.preventDefault();
    if (auth.currentUser) {
      // This will check whether one of mu user's is logged in.
      navigate("/watchlist");
    } else {
      // If the user is not logged in, open the modal with sign-in
      handleModalOpen(0)();
    }
  };

  const handleModalOpen = (activeTab) => () => {
    setDefaultOpenTab(activeTab);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div id="app-container" className={`${theme} `}>
      <div className="bg-white dark:bg-gray-950 min-h-screen">
        <AuthDialog
          open={open}
          defaultOpenTab={defaultOpenTab}
          onClose={handleModalClose}
        />
        <nav className="dark:bg-gray-950 bg-white">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="relative flex flex-shrink-0 items-center">
                  
                  <PulseRectangle02Icon className="text-gray-900 dark:text-gray-300" />

                </div>
                <div className="hidden sm:ml-6 sm:flex items-center space-x-6">
          
                  <Link
                    to="/"
                    className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out"
                  >
                    Dashboard
                  </Link>
                  <a
                    href="/watchlist"
                    onClick={checkAuthAndNavigateOrOpenModal}
                    className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out"
                  >
                    Watchlist
                  </a>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-200 dark:bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <span className="absolute -inset-1.5" />
                  {theme === "dark" ? (
                    <IconMoon size={18} className="text-slate-500" />
                  ) : (
                    <IconMoonFilled size={18} className="text-slate-500" />
                  )}
                </button>

                <div className="relative ml-3">
                  <button
                    type="button"
                    className="user-button p-1 relative flex rounded-full bg-gray-200 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={handleMenu}
                  >
                    <img
                      className="h-8 w-8 rounded-full"
                      src={CryptoReactUser}
                      alt="Profile Avatar"
                    />
                  </button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {auth.currentUser ? (
                      <MenuItem
                        onClick={handleSignout}
                        className="flex items-center space-x-2 text-gray-900 dark:text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-md transition-all duration-200 ease-in-out"
                      >
                        <LogoutIcon />
                        <span>Sign out</span>
                      </MenuItem>
                    ) : (
                      <div>
                        <MenuItem
                          onClick={handleModalOpen(0)}
                          className="flex items-center space-x-2 text-gray-900 dark:text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <ListItemIcon>
                            <LoginIcon />
                          </ListItemIcon>
                          <span>Sign in</span>
                        </MenuItem>
                        <MenuItem
                          onClick={handleModalOpen(1)}
                          className="flex items-center space-x-2 text-gray-900 dark:text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-md transition-all duration-200 ease-in-out"
                        >
                          <ListItemIcon>
                            <FontAwesomeIcon icon={faUserPlus} />
                          </ListItemIcon>
                          <span>Sign up</span>
                        </MenuItem>
                      </div>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:hidden" id="mobile-menu">
            <div className="flex flex-row items-center space-y-1 px-2 pb-3 pt-2">
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out"
              >
                Dashboard
              </Link>
              <a
                href="#"
                onClick={checkAuthAndNavigateOrOpenModal}
                className="text-gray-900 dark:text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 mt-0 text-base font-medium transition-all duration-300 ease-in-out"
              >
                Watchlist
              </a>
            </div>
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
