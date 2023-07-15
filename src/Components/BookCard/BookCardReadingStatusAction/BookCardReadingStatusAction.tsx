import React, { useEffect, useState } from "react";
import { readingAllStatus } from "../../../utils/reading";
import { IBook, IReading } from "../../../Interface";
import { useAppSelector } from "../../../redux/hook";
import {
  useAddReadingMutation,
  useGetAllReadingByUserIdQuery,
} from "../../../redux/features/reading/readingApi";
interface IBookCardReadingStatusAction {
  bookInfo: IBook;
  readonly?: boolean;
}
const BookCardReadingStatusAction: React.FC<IBookCardReadingStatusAction> = ({
  bookInfo,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, isError, data } = useGetAllReadingByUserIdQuery(user._id);
  const [addReading, { isLoading: addReadingLoading }] =
    useAddReadingMutation();
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
        <select
          id="readingStatus"
          value={selectedStatus}
          onClick={(e) => e.stopPropagation()}
          onChange={handleStatusChange}
          className="border rounded-md px-2 py-1"
        >
          <option value="">Select status</option>
          {readingAllStatus.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookCardReadingStatusAction;
