import { PathLike } from "node:fs";
import { FileHandle, readFile, writeFile } from "node:fs/promises";
import { Book, BookData } from "../entities/book";

export default class BookRepository {
  file: PathLike | FileHandle;

  constructor(file: PathLike | FileHandle) {
    this.file = file;
  }

  async #currentFileContent() {
    const data = await readFile(this.file);
    return JSON.parse(data.toString());
  }

  async find() {
    return await this.#currentFileContent();
  }

  async create(data: Book) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data.toObject());
    await writeFile(this.file, JSON.stringify(currentFile));
    return data.id;
  }
}

// const data = { title: "title", description: "description", author: "author" };
// const bookRepository = new BookRepository("database/data.json");
// const book = new Book(data)
// bookRepository.find().then(data=>console.log(data))
// bookRepository.create(book).then(id=>console.log(id))
// bookRepository.find().then(data=>console.log(data))