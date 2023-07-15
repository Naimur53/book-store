import React from "react";
import { IBook } from "../../Interface";
import { Link, useNavigate } from "react-router-dom";
import BookDetailsAction from "../BookDatails/BookDetailsAction/BookDetailsAction";
import BookCardAction from "./BookCardAction/BookCardAction";
import BookCardReadingStatusAction from "./BookCardReadingStatusAction/BookCardReadingStatusAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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
    <div className="bg-blue-100 rounded-lg shadow-lg p-4  cursor-pointer transition-all">
      <h2 className="text-2xl font-bold mb-2 text-center">{title}</h2>
      <p className="text-lg text-gray-600">Author: {author}</p>
      <p className="text-lg text-gray-600">Genre: {genre}</p>
      <p className="text-lg text-gray-600">
        Published on: {new Date(publishedDate).toLocaleDateString()}
      </p>
      <div className="flex justify-between items-center py-3">
        <BookCardAction
          bookInfo={{ title, author, genre, publishedDate, _id, creator }}
        ></BookCardAction>
        <BookCardReadingStatusAction
          readonly={true}
          bookInfo={{ title, author, genre, publishedDate, _id, creator }}
        ></BookCardReadingStatusAction>
      </div>

      <div className="flex justify-between items-center">
        <BookDetailsAction
          bookInfo={{ title, author, genre, publishedDate, _id, creator }}
        ></BookDetailsAction>
        <Link
          className="p-2 bg-blue-200 font-semibold inline-block mt-2 rounded"
          to={`/book-details/${_id}`}
        >
          <FontAwesomeIcon icon={faCircleInfo} />
          <span className="ml-2">Details</span>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
