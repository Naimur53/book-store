import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BookGenre } from "../../Interface";
import { useAddBookMutation } from "../../redux/features/book/bookApi";
import { toast } from "react-toastify";
import { useAppSelector } from "../../redux/hook";
import Loading from "../../Components/Loading/Loading";
import bookGenres from "../../utils/book.";
interface BookForm {
  title: string;
  author: string;
  genre: string;
  publishedDate: Date;
}

const AddBook = () => {
  const [addBook, { isError, isLoading, data }] = useAddBookMutation();
  const { user } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookForm>();

  const onSubmit = (data: BookForm) => {
    if (user) {
      addBook({ creator: user._id, ...data });
    }
    // Handle form submission logic here
  };

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong try again" + data?.message);
    } else {
      if (data) {
        toast.success(data?.message);
        reset();
      }
    }
  }, [isError, data]);

  return (
    <div className="container">
      <div className="flex justify-center">
        <form className="w-[600px]" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mt-5 text-center text-2xl font-semibold mb-10">
            Fill Up Form To Publish A Book
          </h2>
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-5 p-3 shadow-md">
            <div>
              <label className="block" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter Title"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-xs tracking-wide text-red-600">
                  Title field is required
                </span>
              )}
            </div>
            <div>
              <label className="block" htmlFor="author">
                Author Name
              </label>
              <input
                type="text"
                id="author"
                placeholder="Enter Author Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <span className="text-xs tracking-wide text-red-600">
                  Author Name field is required
                </span>
              )}
            </div>
            <div>
              <label className="block" htmlFor="genre">
                Select Genre
              </label>
              <select
                id="genre"
                className="w-full py-2 px-4 border mt-2"
                {...register("genre", { required: true })}
              >
                <option hidden value="">
                  choose a genre
                </option>
                {bookGenres.map((single) => (
                  <option key={single} value={single}>
                    {single}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <span className="text-xs tracking-wide text-red-600">
                  Genre field is required
                </span>
              )}
            </div>
            <div>
              <label className="block" htmlFor="publish">
                Published Date
              </label>
              <input
                type="date"
                id="publish"
                placeholder="Enter Author Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                {...register("publishedDate", { required: true })}
              />
              {errors.publishedDate && (
                <span className="text-xs tracking-wide text-red-600">
                  Published date field is required
                </span>
              )}
            </div>
          </div>
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <button
              type="submit"
              className="px-4 py-3 rounded bg-blue-500 mt-2 text-white hover:opacity-75 transition-all opacity-100"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddBook;
