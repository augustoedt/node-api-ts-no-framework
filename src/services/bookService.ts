import { Book, IBook } from "../entities/book";
import BookRepository from "../repositories/bookRepository";
import Service from "./iServices";

export default class BookService extends Service<Book, IBook> {
  constructor(bookRepository: BookRepository) {
    super(bookRepository);
  }
}
