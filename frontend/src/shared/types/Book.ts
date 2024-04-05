export type Book = {
  id: number;
  title: string;
  img: string;
  author: {
    fullName: string;
  };
  predefinedShelf: {
    shelfName: string;
  };
  bookGenre: string[];
  numberOfPages: number;
  rating: number;
  favorite?: boolean;
};
