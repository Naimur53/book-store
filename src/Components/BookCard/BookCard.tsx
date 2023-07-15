import React from "react";
import { IBook } from "../../Interface";
import { useNavigate } from "react-router-dom";
import BookDetailsAction from "../BookDatails/BookDetailsAction/BookDetailsAction";
import BookCardAction from "./BookCardAction/BookCardAction";
import BookCardReadingStatusAction from "./BookCardReadingStatusAction/BookCardReadingStatusAction";
interface BookCardProps extends IBook {
  key?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  genre,
  publishedDate,
  _id,
  creator,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/book-details/${_id}`)}
      className="bg-blue-100 rounded-lg shadow-lg p-4  cursor-pointer transition-all"
    >
      <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>
      <p className="text-lg text-gray-600">Author: {author}</p>
      <p className="text-lg text-gray-600">Genre: {genre}</p>
      <p className="text-lg text-gray-600">
        Published on: {new Date(publishedDate).toLocaleDateString()}
      </p>
      <div className="flex justify-between py-3">
        <BookCardAction
          bookInfo={{ title, author, genre, publishedDate, _id, creator }}
        ></BookCardAction>
        <BookCardReadingStatusAction
          bookInfo={{ title, author, genre, publishedDate, _id, creator }}
        ></BookCardReadingStatusAction>
      </div>
      <BookDetailsAction
        bookInfo={{ title, author, genre, publishedDate, _id, creator }}
      ></BookDetailsAction>
    </div>
  );
};

export default BookCard;
