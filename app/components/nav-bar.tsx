import { Link } from "@remix-run/react";
import * as React from "react";

interface NavBarProps {
  isLoggedIn: boolean;
}
const NavBar: React.FC<NavBarProps> = ({ isLoggedIn }) => {
  return (
    <div className="w-full bg-green-400 flex h-8 justify-between">
      <span className="px-4 cursor-pointer">/ / /</span>
      <div className="flex w-48 items-center justify-around">
        {isLoggedIn ? (
          <>
            <Link to="/logout">Logout</Link>
            <Link to="/bills/list">Bills</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
