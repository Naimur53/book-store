import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createUser, setError } from "../../redux/features/auth/authSlice";
import Loading from "../../Components/Loading/Loading";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
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
    dispatch(createUser(data));
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
  }, [error, isLoading, user, location, navigate, dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-center">
            Create Your Account
          </h3>
          <form
            className="w-ful md:w-[500px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.name && (
                  <span className="text-xs tracking-wide text-red-600">
                    Name field is required
                  </span>
                )}
              </div>
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
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
                {errors.password && (
                  <span className="text-xs tracking-wide text-red-600">
                    Password field is required
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Sign Up
                </button>
                <Link
                  to="/sign-in"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
