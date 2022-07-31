import { PathLike } from "node:fs";
import { FileHandle, readFile, writeFile } from "node:fs/promises";
import { Book, IBook } from "../entities/book";
import IRepository from "./iRepository";

export default class BookRepository extends IRepository<Book, IBook>{

  constructor(file: PathLike | FileHandle) {
    super(file)
  }

  async find() {
    return await this.currentFileContent();
  }

  async create(data: Book) {
    const currentFile = await this.currentFileContent();
    currentFile.push(data.toObject());
    await writeFile(this.file, JSON.stringify(currentFile));
    return data.id;
  }

  async read(query: string): Promise<IBook[]> {
    const currentFile = await this.currentFileContent();
    return currentFile.filter((book) =>
      book.title.toLocaleLowerCase().includes(query)
    );
  }

  async update(data: Partial<IBook>): Promise<string|undefined>{
    const currentFile = await this.currentFileContent();
    const book = currentFile.find((book) => data.id == book.id);
    if (book == undefined) {
      return undefined;
    }
    const index = currentFile.indexOf(book);
    data.updated_at = Date.now();
    const updatedBook = { ...book, ...data };
    currentFile[index] = book;
    await writeFile(this.file, JSON.stringify(currentFile));
    return updatedBook.id;
  }

  async delete(id: string) {
    const currentFile = await this.currentFileContent();
    const books = currentFile.filter((b) => b.id != id);
    await writeFile(this.file, JSON.stringify(currentFile));
  }
}
