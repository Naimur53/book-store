import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../redux/features/book/bookApi";
import Loading from "../Loading/Loading";
import Review from "./Review/Review";
import BookDetailsAction from "./BookDetailsAction/BookDetailsAction";
import BookCardAction from "../BookCard/BookCardAction/BookCardAction";
import BookCardReadingStatusAction from "../BookCard/BookCardReadingStatusAction/BookCardReadingStatusAction";
const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id);
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
  const { title, author, genre, publishedDate } = data.data;
  return (
    <div className="container text-lg">
      <h2 className="text-6xl text-center">{title}</h2>
      <div className="flex flex-col-reverse gap-2 py-4 md:flex-row mt-5 justify-between">
        <div>
          <h2 className="text-xl font-semibold">Author: {author}</h2>
          <h4 className="text-sm">
            Published Date {new Date(publishedDate).toLocaleDateString()}
          </h4>
        </div>
        <div>
          <h2 className="font-bold text-xl px-2 py-1 rounded text-gray-900 bg-blue-300 inline-block">
            {genre}
          </h2>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between">
        <BookDetailsAction bookInfo={data.data}></BookDetailsAction>
        <div className="flex md:flex-row   gap-2 items-center">
          <BookCardAction bookInfo={data.data}></BookCardAction>
          <BookCardReadingStatusAction
            bookInfo={data.data}
          ></BookCardReadingStatusAction>
        </div>
      </div>
      <div>
        <Review></Review>
      </div>
    </div>
  );
};

export default BookDetails;
