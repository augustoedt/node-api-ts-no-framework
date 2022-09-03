import { writeFile } from "node:fs/promises";
import { Book, IBook } from "../entities/book";
import IRepository from "./iRepository";

export default class BookRepository extends IRepository<Book, IBook> {
  async create(data: IBook): Promise<string> {
    const currentFile = await this.currentFileContent();
    currentFile.push(data);
    await writeFile(this.file, JSON.stringify(currentFile));
    return data.id;
  }
  
  async read(query: string): Promise<IBook[]> {
    const currentFile = await this.currentFileContent();
    return currentFile.filter((book) =>
      book.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }

  async update(data: Partial<IBook>): Promise<string | undefined> {
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
