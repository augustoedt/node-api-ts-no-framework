import { Book, BookData } from "../entities/book";
import BookRepository from "../repositories/bookRepository";

export default class BookService {
  repository;

  constructor(bookRepository: BookRepository) {
    this.repository = bookRepository;
  }

  find() {
    return this.repository.find();
  }

  create(data: Book) {
    return this.repository.create(data);
  }

  read(query: string) {
    return this.repository.read(query);
  }

  update(data: BookData) {
    return this.repository.update(data);
  }

  delete(id: string){
    return this.repository.delete(id)
  }
}
