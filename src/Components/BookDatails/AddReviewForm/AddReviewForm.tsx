import React, { useEffect, useState } from "react";
import { useAddReviewMutation } from "../../../redux/features/review/reviewApi";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
interface AddReviewFormProps {
  onClose: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ onClose }) => {
  const [reviewText, setReviewText] = useState("");
  const { user } = useAppSelector((state) => state.user);
  const [addReview, { isLoading, isError, isSuccess }] = useAddReviewMutation();
  const { id } = useParams();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user._id) {
      onClose();
      toast.error("Login first to give Reivew");
      return;
    }
    // Clear the textarea after submitting
    addReview({ review: reviewText, book: id, user: user._id });

    // Close the form
    onClose();
  };

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong try again");
    } else if (isSuccess) {
      setReviewText("");
      toast.success("Review added successfully");
    }
  }, []);
  return (
    <div className="w-full mt-4 px-4">
      <form onSubmit={handleSubmit} className="w-full">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="Write your review here... "
          className="border    w-full rounded-md p-2"
        />
        <div className="flex justify-end mt-2">
          {isLoading ? (
            <Loading></Loading>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
