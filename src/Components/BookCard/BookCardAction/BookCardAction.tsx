import React from "react";
import { IBook, IWishlist } from "../../../Interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
  useGetAllWishlistByUserIdQuery,
} from "../../../redux/features/wishlist/wishlistApi";
import { useAppSelector } from "../../../redux/hook";

interface IBookCardAction {
  bookInfo: IBook;
}
const BookCardAction: React.FC<IBookCardAction> = ({ bookInfo }) => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useGetAllWishlistByUserIdQuery(user._id);
  const [deleteWish, { isLoading: wishlistDelatingLoading }] =
    useDeleteWishlistMutation();
  const [addWishlist, { isLoading: addingWhishLoading }] =
    useAddWishlistMutation();
  if (!user.email) {
    return <></>;
  }
  if (isError) {
    return <></>;
  }
  let s = false;
  const mainData: IWishlist[] = data?.data;

  const isAlreadyAddedToWishList = mainData.find(
    (single) => single.book._id === bookInfo._id
  );

  console.log(isAlreadyAddedToWishList);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isAlreadyAddedToWishList) {
      addWishlist({ book: bookInfo._id, user: user._id });
    } else {
      deleteWish(isAlreadyAddedToWishList._id);
    }
  };
  return (
    <div>
      <button
        disabled={addingWhishLoading || wishlistDelatingLoading || isLoading}
        onClick={handleClick}
        className={` ${
          isAlreadyAddedToWishList ? "text-green-700" : "text-gray-600"
        } py-2 disabled:text-gray-900 px-2 rounded-full  h-[40p] w-[40px] bg-slate-300 disabled:opacity-30 transition-all`}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </button>
    </div>
  );
};

export default BookCardAction;
