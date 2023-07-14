import React from "react";
import BookCard from "../../Components/BookCard/BookCard";
const Home = () => {
  const data = ["ssdf", "dfd", "dfdf", "dfd"];
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 ">
        {/* {data.map((single, i) => (
          // <BookCard key={i + ""}></BookCard>
        ))} */}
      </div>
    </div>
  );
};

export default Home;
