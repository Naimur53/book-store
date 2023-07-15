import React, { useState } from "react";
import Popup from "reactjs-popup";
import { useAppSelector } from "../../../redux/hook";
import AddReviewForm from "../AddReviewForm/AddReviewForm";
import { IReview } from "../../../Interface";
interface AddReviewSectionProps {
  reviews: IReview[];
}
const AddReviewSection: React.FC<AddReviewSectionProps> = ({ reviews }) => {
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  if (!user.email) {
    return <></>;
  }
  const isReviewAlreadyExits = reviews.find(
    (single) => single.user._id === user._id
  );
  const handleClose = () => {
    setOpen(false);
  };
  if (!isReviewAlreadyExits) {
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-400 text-xl font-semibold rounded-md text-white/90 "
        >
          Add review
        </button>
        <Popup open={open} onClose={handleClose}>
          <div className=" bg-white border border-blue-200 w-[300px] md:w-[400px]  rounded-md flex   h-[200px] shadow-2xl ">
            <div></div>
            <AddReviewForm onClose={handleClose}></AddReviewForm>
          </div>
        </Popup>
      </div>
    );
  }
  return <></>;
};

export default AddReviewSection;
