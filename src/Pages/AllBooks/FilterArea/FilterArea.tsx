import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import bookGenres from "../../../utils/book.";
import { useAppDispatch } from "../../../redux/hook";
import { setFilter } from "../../../redux/features/filter/filter";

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
      className="flex space-x-4 mb-5 mt-3"
    >
      {/* Text Input */}
      <input
        type="text"
        {...register("searchTerm")}
        className="border p-2 flex-1"
        placeholder="Enter text"
      />

      {/* Select Dropdown */}
      <select {...register("genre")} className="border p-2">
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
        className="border p-2"
      />
    </form>
  );
};
export default FilterArea;
