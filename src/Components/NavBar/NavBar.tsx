import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
const NavBar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userLoggedOut());
  };
  return (
    <div>
      <nav className="py-4 2xl:px-6">
        <div className="container flex items-center justify-between">
          <h2>Books</h2>
          <ul className="hidden md:flex items-center space-x-6">
            <li className=" cursor-pointer">
              <NavLink to="all-books">All Books</NavLink>
            </li>
            <li className="cursor-pointer">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/add-book">Add Book</Link>
            </li>
            <li className="cursor-pointer">
              {user.name ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/sign-in">Sign In</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
