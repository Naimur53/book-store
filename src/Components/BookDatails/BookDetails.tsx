import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../redux/features/book/bookApi";
import Loading from "../Loading/Loading";
import Review from "./Review/Review";
import BookDetailsAction from "./BookDetailsAction/BookDetailsAction";
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
      <div className="flex mt-5 justify-between">
        <div>
          <h2>Author: {author}</h2>
          <h2>Published Date {new Date(publishedDate).toLocaleDateString()}</h2>
        </div>
        <h2>{genre}</h2>
      </div>
      <BookDetailsAction bookInfo={data.data}></BookDetailsAction>
      <div>
        <Review></Review>
      </div>
    </div>
  );
};

export default BookDetails;
