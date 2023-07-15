import React from "react";
import BookCard from "../../Components/BookCard/BookCard";
import { IBook } from "../../Interface";
import Loading from "../../Components/Loading/Loading";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
const Home = () => {
  const { data, isLoading, isError } = useGetBooksQuery({
    limit: 10,
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
      <h2 className="text-4xl font-bold text-center mb-10">
        Welcome to Booker
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {data?.data.map((single: IBook) => (
          <BookCard {...single} key={single._id}></BookCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
