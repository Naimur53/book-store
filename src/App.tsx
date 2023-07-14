import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import NavBar from "./Components/NavBar/NavBar";
import AllBooks from "./Pages/AllBooks/AllBooks";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import AddBook from "./Pages/AddBook/AddBook";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./redux/hook";
import { useEffect } from "react";
import {
  loginUserWithToken,
  setLoading,
} from "./redux/features/auth/authSlice";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(loginUserWithToken());
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/all-books" element={<AllBooks></AllBooks>}></Route>
          <Route
            path="/add-book"
            element={
              <PrivateRoute>
                <AddBook></AddBook>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
          <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
