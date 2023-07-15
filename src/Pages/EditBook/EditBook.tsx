import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../../redux/features/book/bookApi";
import Loading from "../../Components/Loading/Loading";
import UpdateBookArea from "./UpdateBookArea/UpdateBookArea";
const EditBook = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetBookByIdQuery(id);

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

  return (
    <div>
      <UpdateBookArea bookInfo={data.data}></UpdateBookArea>
    </div>
  );
};

export default EditBook;
