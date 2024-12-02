import { Book } from "../@types";
import { readData, writeData } from "./repositoryHelper";

export function getBooks() {
  const data = readData();
  return data.books;
}

export function addBook(book: Book) {
  const data = readData();
  data.books.push(book);
  writeData(data);
}

export function getBookById(id: number) {
  const data = readData();
  return data.books.find((book) => book.id === id);
}

export function searchBooks(query: string): Book[] {
  const data = readData();
  const lowerCaseQuery = query.toLowerCase();
  return data.books.filter(
    (book) =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.genre.toLowerCase().includes(lowerCaseQuery) ||
      book.baseImage.toLowerCase().includes(lowerCaseQuery) ||
      book.reviews.some((review) =>
        review.comment.toLowerCase().includes(lowerCaseQuery)
      )
  );
}
