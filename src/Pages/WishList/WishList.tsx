import React from "react";
import { useAppSelector } from "../../redux/hook";
import { useGetAllWishlistByUserIdQuery } from "../../redux/features/wishlist/wishlistApi";
import Loading from "../../Components/Loading/Loading";
import { IWishlist } from "../../Interface";
import BookCard from "../../Components/BookCard/BookCard";

const WishList = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useGetAllWishlistByUserIdQuery(user._id);
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loading></Loading>
      </div>
    );
  } else if (isError) {
    return (
      <div className="text-center text-3xl font-bold text-red-500">
        Data not found
      </div>
    );
  } else if (!data.data) {
    return (
      <div className="text-center text-3xl font-bold text-red-500">
        Data not found
      </div>
    );
  }
  const mainData: IWishlist[] = data.data;
  return (
    <div className="container">
      <div className="grid md:grid-cols-4 gap-5 grid-cols-1">
        {mainData.map((single) => (
          <div key={single._id}>
            <BookCard {...single.book}></BookCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
