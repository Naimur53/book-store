import React from "react";
import { IBook } from "../../Interface";
interface BookCardProps extends IBook {
  key: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  genre,
  publishedDate,
}) => {
  return (
    <div className="bg-blue-100 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-lg text-gray-600">Author: {author}</p>
      <p className="text-lg text-gray-600">Genre: {genre}</p>
      <p className="text-lg text-gray-600">
        Published Date: {new Date(publishedDate).toDateString()}
      </p>
      {/* Additional rendering logic for other book details */}
    </div>
  );
};

export default BookCard;
