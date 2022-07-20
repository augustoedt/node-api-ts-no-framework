import { randomUUID } from "node:crypto";

interface BookData {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: number;
  updated_at: number;
}

interface Book extends BookData {}

class Book {
  constructor({ title = "", description = "", author = "" }) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }

  toObject(): BookData {
    return { ...this };
  }
}

export { Book, BookData };
