import { randomUUID } from "node:crypto";

interface IBook {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: number;
  updated_at: number;
}

interface Book extends IBook {}

class Book {
  public constructor({ title = "", description = "", author = ""} : IBook) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }

  toObject(): IBook {
    return { ...this };
  }
}

export { 
  Book,
  IBook
};
