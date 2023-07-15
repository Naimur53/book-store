import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
          <Link to="/">
            <h2 className="text-xl font-black">Booker</h2>
          </Link>
          <div className="relative group">
            <div className=" block md:hidden">
              <FontAwesomeIcon className="m" icon={faBars} />
            </div>
            <ul className="group-hover:flex  absolute top-[20px] right-0 w-[200px] md:w-auto md:static hidden md:flex bg-blue-200 md:bg-white shadow md:shadow-none rounded-md py-2 md:rounded-none flex-col md:flex-row  items-center  gap-2 md:gap-6 ">
              <li className=" cursor-pointer text-center">
                <NavLink to="all-books">All Books</NavLink>
              </li>
              <li className="cursor-pointer">
                <Link to="/wishlist">Wishlist</Link>
              </li>
              <li className="cursor-pointer">
                <Link to="/add-new-book">Add Book</Link>
              </li>
              {user.email ? (
                <li>
                  <span className="font-bold capitalize">{user.name}</span>
                </li>
              ) : (
                <></>
              )}
              <li className="cursor-pointer">
                {user.name ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <Link to="/sign-in">Sign In</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
