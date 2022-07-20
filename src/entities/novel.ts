import { randomUUID } from "node:crypto";

interface NovelData {
  id: string;
  title: string;
  description: string;
  author: string;
  chapters: number;
  created_at: number;
  updated_at: number;
}

interface Novel extends NovelData {}

class Novel {
  constructor({
    title = "",
    description = "",
    author = "",
    chapters = 0,
  }: NovelData) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.chapters = chapters;
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }

  toObject() : NovelData {
    return {...this}
  }
}

export {
  Novel,
  NovelData
}