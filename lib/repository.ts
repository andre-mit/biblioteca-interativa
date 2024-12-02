import {
  addBook,
  getBookById,
  getBooks,
  searchBooks,
} from "./repositories/bookRepository";
import {
  addUser,
  getUserById,
  getUsers,
  getUserByEmail,
} from "./repositories/usersRepository";

const repositories = {
  userRepository: { getUsers, addUser, getUserById, getUserByEmail },
  bookRepository: { getBooks, addBook, getBookById, searchBooks },
};

export default repositories;
