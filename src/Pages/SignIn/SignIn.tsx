import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Loading from "../../Components/Loading/Loading";
import { toast } from "react-toastify";
import { loginUser, setError } from "../../redux/features/auth/authSlice";
interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Perform form submission logic here
    // e.g., send form data to server, perform validation, etc.
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    } else if (!isLoading && user.email) {
      navigate(location.state || "/");
    }
    return () => {
      dispatch(setError({ isError: false, error: "" }));
    };
  }, [error, isLoading, user, location, navigate]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <div className="flex justify-center">{/* SVG code */}</div>
        <h3 className="text-2xl font-bold text-center">
          Login to your account
        </h3>
        <form className="w-ful md:w-[500px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {errors.email && (
                <span className="text-xs tracking-wide text-red-600">
                  Email field is required
                </span>
              )}
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
              <Link
                to="/sign-up"
                className="text-sm text-blue-600 hover:underline"
              >
                Don't have an Account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
