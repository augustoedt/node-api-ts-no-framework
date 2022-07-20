import { Book } from "../entities/book";
import BookRepository from "../repositories/bookRepository";

export default class BookService {
    repository;

    constructor(bookRepository: BookRepository){
        this.repository = bookRepository;
    }

    find() {
        return this.repository.find()
    }

    create(data: Book){
        return this.repository.create(data)
    }
}