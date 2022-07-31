import IRepository from "../repositories/iRepository";

export default abstract class Service<Type, IType>{
    repository;
  
    constructor(repository: IRepository<Type, IType>) {
      this.repository = repository;
    }
  
    find() {
      return this.repository.find();
    }
  
    create(data: Type) {
      return this.repository.create(data);
    }
  
    read(query: string) {
      return this.repository.read(query);
    }
  
    update(data: IType) {
      return this.repository.update(data);
    }
  
    delete(id: string){
      return this.repository.delete(id)
    }
  }