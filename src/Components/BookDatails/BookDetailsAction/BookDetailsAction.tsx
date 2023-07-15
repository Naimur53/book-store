import React, { useEffect, useState } from "react";
import { IBook } from "../../../Interface";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { useDeleteBookMutation } from "../../../redux/features/book/bookApi";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
interface IBookDetailsAction {
  bookInfo: IBook;
}

const BookDetailsAction: React.FC<IBookDetailsAction> = ({ bookInfo }) => {
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteBook, { isError, isLoading, isSuccess }] =
    useDeleteBookMutation();

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong try again");
    } else if (isSuccess) {
      toast.success("Successfully deleted");
      setOpen(false);
      navigate("/");
    }
  }, [isError, isSuccess]);
  if (!user._id) {
    return <></>;
  }
  const isUserIsTheCreator = bookInfo.creator._id === user._id;
  if (!isUserIsTheCreator) {
    return <></>;
  }
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteBook(bookInfo._id);
  };
  const handleEditCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/edit-book/${bookInfo._id}`);
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleEditCLick}
        className="bg-blue-300 px-4 py-2 rounded-md"
      >
        Edit Book
      </button>

      <button
        onClick={handleOpen}
        className="bg-red-200 px-4 py-2 ml-2 rounded-md"
      >
        Delete Book
      </button>
      <Popup open={open} onClose={handleClose}>
        <div className="w-[400px] p-5 rounded-xl bg-white shadow-2xl">
          <h2 className="text-xl font-bold text-red-400">
            Are you sure you want to delete this Book?
          </h2>

          {isLoading ? (
            <Loading></Loading>
          ) : (
            <button
              onClick={handleDelete}
              className="bg-red-900 text-white rounded-md mt-5 px-3 py-2 "
            >
              Delete
            </button>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default BookDetailsAction;
