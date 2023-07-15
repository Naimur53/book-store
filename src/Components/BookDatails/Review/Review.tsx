import React from "react";
import { useGetBookReviewByBookIdQuery } from "../../../redux/features/review/reviewApi";
import { useParams } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { IReview } from "../../../Interface";
import AddReviewSection from "../AddReviewSection/AddReviewSection";

const Review = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetBookReviewByBookIdQuery(id);
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  } else if (isError) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-10">All Reviews:</h2>
        <AddReviewSection reviews={[]}></AddReviewSection>
        <h2 className="text-center text-xl  ">No Reviews found!</h2>
      </div>
    );
  }
  const main: IReview[] = data.data || [];
  return (
    <div className="mt-10">
      <div>
        <h2 className="text-xl font-bold mb-5">All Reviews:</h2>
        <AddReviewSection reviews={main}></AddReviewSection>
      </div>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
        {main.map((single) => (
          <div className="shadow-lg bg-blue-100 p-3 rounded-md">
            <h2 className="text-xl font-bold capitalize">{single.user.name}</h2>
            <p>{single.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
