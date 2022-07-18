import { randomUUID } from 'node:crypto';

export default class Book {
  id: string;
  title: string;
  description: string;
  author: string;
  created_at: number;
  updated_at: number;


  constructor({ title = "", description = "", author = "" }) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }
}
