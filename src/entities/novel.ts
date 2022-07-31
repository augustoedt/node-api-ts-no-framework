import { randomUUID } from "node:crypto";

interface INovel {
  id: string;
  title: string;
  description: string;
  author: string;
  chapters: number;
  created_at: number;
  updated_at: number;
}

interface Novel extends INovel {}

class Novel {
  constructor({
    title = "",
    description = "",
    author = "",
    chapters = 0,
  }: INovel) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.author = author;
    this.chapters = chapters;
    this.created_at = Date.now();
    this.updated_at = Date.now();
  }

  toObject() : INovel {
    return {...this}
  }
}

export {
  Novel,
  INovel 
}