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
  public constructor(params : Partial<IBook>) {
    this.id = params.id || randomUUID();
    this.title = params.title || "";
    this.description = params.description || "";
    this.author = params.description || "";
    this.created_at = params.created_at || Date.now();
    this.updated_at = params.updated_at || Date.now();
  }

  toObject(): IBook {
    return { ...this };
  }
}

export { 
  Book,
  IBook
}