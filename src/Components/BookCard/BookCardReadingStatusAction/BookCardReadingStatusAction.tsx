import React, { useEffect, useState } from "react";
import { readingAllStatus } from "../../../utils/reading";
import { IBook, IReading } from "../../../Interface";
import { useAppSelector } from "../../../redux/hook";
import {
  useAddReadingMutation,
  useGetAllReadingByUserIdQuery,
  useUpdateReadingMutation,
} from "../../../redux/features/reading/readingApi";
interface IBookCardReadingStatusAction {
  bookInfo: IBook;
  readonly?: boolean;
}
const BookCardReadingStatusAction: React.FC<IBookCardReadingStatusAction> = ({
  bookInfo,
  readonly = false,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useGetAllReadingByUserIdQuery(user._id);
  const [addReading, { isLoading: addReadingLoading }] =
    useAddReadingMutation();
  const [updateReading, { isLoading: isUpdateLoading }] =
    useUpdateReadingMutation();
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // Initialize state with an empty string

  const mainData: IReading[] = data?.data;
  const isHasStatus = mainData?.find(
    (single) => single.book._id === bookInfo._id
  );

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.stopPropagation();
    const value = event.target.value;
    if (!isHasStatus) {
      addReading({ book: bookInfo._id, user: user._id, status: value });
    } else {
      updateReading({ _id: isHasStatus._id, status: value });
    }
    setSelectedStatus(value); // Update state with the selected option value
  };
  useEffect(() => {
    if (!isHasStatus) {
      setSelectedStatus("");
    } else {
      setSelectedStatus(isHasStatus.status);
    }
  }, [data, user, isHasStatus]);

  if (!user.email) {
    return <></>;
  }
  if (isLoading || isError || !data.data) {
    return <></>;
  }

  return (
    <div>
      <div>
        {readonly ? (
          isHasStatus?._id ? (
            <button className=" capitalize font-bold px-2 text-sm p-1 bg-slate-100 rounded-lg">
              {isHasStatus.status}
            </button>
          ) : (
            <></>
          )
        ) : (
          <select
            id="readingStatus"
            value={selectedStatus}
            disabled={addReadingLoading || isUpdateLoading}
            onClick={(e) => e.stopPropagation()}
            onChange={handleStatusChange}
            className="border rounded-md px-2 py-1 capitalize disabled:opacity-60 transition-all opacity-100"
          >
            <option hidden value="">
              Select status
            </option>

            {readingAllStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default BookCardReadingStatusAction;
