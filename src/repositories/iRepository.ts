import { PathLike } from "node:fs";
import { FileHandle, readFile } from "node:fs/promises";

export default abstract class IRepository<Type, IType> {
  /*
TODO;
 replace file to database handler... Database(type : DataType, url: String)
*/

  file: PathLike | FileHandle;

  constructor(file: PathLike | FileHandle) {
    this.file = file;
  }

  async currentFileContent(): Promise<IType[]> {
    const data = await readFile(this.file);
    return JSON.parse(data.toString());
  }

  async find() {
    return await this.currentFileContent();
  }

  /*
TODO: 
    Create pattens functions responses for CRUD to remove abstract function
    below, converting in normal functions.
*/

  abstract create(data: IType): Promise<string>;

  abstract read(query: string): Promise<IType[]>;

  abstract update(data: Partial<IType>): Promise<string | undefined>;

  abstract delete(id: string): Promise<void>;
}
