import { PathLike } from "node:fs";
import { FileHandle, readFile, writeFile } from "node:fs/promises";
import { Book, BookData } from "../entities/book";

export default class BookRepository {
  file: PathLike | FileHandle;

  constructor(file: PathLike | FileHandle) {
    this.file = file;
  }

  private async currentFileContent(): Promise<BookData[]> {
    const data = await readFile(this.file);
    return JSON.parse(data.toString());
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

  async read(query: string): Promise<BookData[]> {
    const currentFile = await this.currentFileContent();
    return currentFile.filter((book) =>
      book.title.toLocaleLowerCase().includes(query)
    );
  }

  async update(data: Partial<BookData>) {
    const currentFile = await this.currentFileContent();
    let book = currentFile.find((book) => data.id == book.id);
    if (book == undefined) {
      return undefined;
    }
    const index = currentFile.indexOf(book);
    data.updated_at = Date.now();
    book = { ...book, ...data };
    currentFile[index] = book;
    await writeFile(this.file, JSON.stringify(currentFile));
    return book.id;
  }

  async delete(id: string) {
    const currentFile = await this.currentFileContent();
    const books = currentFile.filter((b) => b.id != id);
    await writeFile(this.file, JSON.stringify(currentFile));
  }
}
