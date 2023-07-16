import React from "react";
import { useGetAllReadingByUserIdQuery } from "../../redux/features/reading/readingApi";
import { useAppSelector } from "../../redux/hook";
import Loading from "../../Components/Loading/Loading";
import BookCard from "../../Components/BookCard/BookCard";
import { IReading } from "../../Interface";

const Reading = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useGetAllReadingByUserIdQuery(user._id);
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  } else if (isError) {
    return (
      <div className="text-center text-3xl font-bold text-red-500">
        Data not found
      </div>
    );
  } else if (!data.data) {
    return (
      <div className="text-center text-3xl font-bold text-red-500">
        Data not found
      </div>
    );
  }
  console.log(data.data);
  const mainData: IReading[] = data.data;
  return (
    <div className="container">
      <h2 className="text-4xl mb-10 font-bold text-center">My Reading List</h2>
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5 grid-cols-1">
        {mainData.map((single) => (
          <div key={single._id}>
            <BookCard {...single.book}></BookCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reading;
