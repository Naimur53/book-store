import React from "react";
import BookCard from "../../Components/BookCard/BookCard";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { IBook } from "../../Interface";
import Loading from "../../Components/Loading/Loading";
import FilterArea from "./FilterArea/FilterArea";
import { useAppSelector } from "../../redux/hook";

const AllBooks = () => {
  const { searchTerm, genre, publishedDate } = useAppSelector(
    (state) => state.filter
  );
  const { data, isLoading, isError } = useGetBooksQuery({
    limit: 0,
    searchTerm,
    genre,
    publishedDate,
  });
  console.log({ data });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="text-4xl font-bold text-center mb-5">Find All books </h2>
      <FilterArea></FilterArea>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {data?.data.map((single: IBook) => (
          <BookCard {...single} key={single._id}></BookCard>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
