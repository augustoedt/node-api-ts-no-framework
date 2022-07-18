import { randomUUID } from "node:crypto";

export default class Novel {
  id: string;
  title: string;
  description: string;
  author: string;
  chapters: number;
  created_at: number;
  updated_at: number;

  constructor({ title = "", description = "", author = "", chapters = 0 }) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.chapters = chapters;
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }
}
