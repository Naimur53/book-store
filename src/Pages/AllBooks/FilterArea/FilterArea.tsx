import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import bookGenres from "../../../utils/book.";
import { useAppDispatch } from "../../../redux/hook";
import { setFilter } from "../../../redux/features/filter/filter";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
interface FilterData {
  searchTerm?: string;
  genre?: string;
  publishedYear: Date | null;
}
const FilterArea: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FilterData>();

  const onSubmit = (data: FilterData) => {
    console.log(data);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { searchTerm = "", genre = "", publishedYear = null } = watch();
    dispatch(
      setFilter({
        searchTerm,
        genre,
        publishedYear: publishedYear
          ? new Date(publishedYear).getFullYear()
          : null,
      })
    );
  }, [watch()]);
  const handleDateChange = (date: Date | null) => {
    setValue("publishedYear", date, { shouldValidate: true });
  };

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
      <DatePicker
        selected={watch("publishedYear")}
        onChange={handleDateChange}
        showYearPicker
        className="border inline-block p-2 h-[44px]"
        showIcon
        placeholderText="Choose Year"
        dateFormat="yyyy" // Register the form control
        // Add other props specific to the DatePicker here if needed
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
