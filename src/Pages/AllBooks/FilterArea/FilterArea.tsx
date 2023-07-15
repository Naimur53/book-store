import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import bookGenres from "../../../utils/book.";
import { useAppDispatch } from "../../../redux/hook";
import { setFilter } from "../../../redux/features/filter/filter";
import { Link } from "react-router-dom";
interface FilterData {
  searchTerm?: string;
  genre?: string;
  publishedDate?: string;
}

const FilterArea: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FilterData>();

  const onSubmit = (data: FilterData) => {
    console.log(data);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { searchTerm = "", genre = "", publishedDate = "" } = watch();
    dispatch(setFilter({ searchTerm, genre, publishedDate }));
  }, [watch()]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-center gap-4 mb-5 mt-3"
    >
      {/* Text Input */}
      <input
        type="text"
        {...register("searchTerm")}
        className="border p-2 flex-1 md:w-auto w-full"
        placeholder="Search by author name or title or genre "
      />

      {/* Select Dropdown */}
      <select {...register("genre")} className="border p-2 md:w-auto w-full">
        <option hidden value="">
          choose a genre
        </option>
        {bookGenres.map((single) => (
          <option key={single} value={single}>
            {single}
          </option>
        ))}
      </select>

      {/* Date Picker Input */}
      <input
        type="date"
        {...register("publishedDate")}
        className="border p-2 md:w-auto w-full"
      />
      <Link to="/add-new-book">
        <button className="px-3 py-2 bg-blue-300 rounded font-bold text-black">
          Add New Book
        </button>
      </Link>
    </form>
  );
};
export default FilterArea;
