export type BookGenre =
  | "Action and Adventure"
  | "Art"
  | "Biography"
  | "Children"
  | "Comics and Graphic Novels"
  | "Cookbooks"
  | "Drama"
  | "Fantasy"
  | "History"
  | "Horror"
  | "Humor and Comedy"
  | "Mystery"
  | "Non-Fiction"
  | "Poetry"
  | "Religion and Spirituality"
  | "Romance"
  | "Science Fiction"
  | "Self-Help"
  | "Sports"
  | "Thriller"
  | "Travel";
export type IUser = {
  name: string | null;
  email: string | null;
  _id: string | null;
};
export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: BookGenre;
  publishedDate: Date;
  creator: IUser;
};

export type IReview = {
  review: string;
  user: IUser;
  book: IBook | string;
  _id: string;
};

export type IWishlist = {
  _id: string;
  user: IUser;
  book: IBook;
};
export type IReading = {
  _id: string;
  user: IUser;
  book: IBook;
  status: string;
};
