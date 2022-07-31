import { Book, BookData } from "../entities/book";
import BookRepository from "../repositories/bookRepository";
import Service from "./iServices";

export default class BookService extends Service<Book, BookData> {
  constructor(bookRepository: BookRepository) {
    super(bookRepository);
  }
}
