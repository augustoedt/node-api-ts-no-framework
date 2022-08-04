import { randomUUID } from "node:crypto";
import { IBook } from "./book";

interface INovel extends IBook {
  chapters: number;
}

interface Novel extends INovel {}

class Novel {
  constructor(params: INovel) {
    this.id = randomUUID();
    this.title = params.title || "";
    this.description = params.description || "";
    this.author = params.author || "";
    this.chapters = params.chapters || 0;
    this.created_at = params.created_at || Date.now();
    this.updated_at = params.updated_at || Date.now();
  }

  toObject() : INovel {
    return {...this}
  }
}

export {
  Novel,
  INovel 
}