import React from "react";
import BookCard from "../../Components/BookCard/BookCard";

const data = ["ssdf", "dfd", "dfdf", "dfd"];
const AllBooks = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {data.map((single, i) => (
          <BookCard key={i}></BookCard>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
