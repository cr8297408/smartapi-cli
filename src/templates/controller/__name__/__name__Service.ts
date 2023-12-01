import { Create__name__Payload, Delete__name__Payload, GetOne__name__Payload, Update__name__Payload } from "../../interfaces";
import { __name__Repository } from "../../repositories"

export interface __name__ServiceDependences {
  repository: __name__Repository;
}
export class __name__Service {
  #repository: __name__Repository;
  constructor({ repository }: __name__ServiceDependences) {
    this.#repository = repository;
  }
  getAll = () => {
    return this.#repository.getAll();
  }
  getOne = ({ uuid }: GetOne__name__Payload) => {
    // Bussiness Logic
    return this.#repository.getOne({
      uuid
    });
  }
  create = (data: Create__name__Payload) => {
    // Bussiness Logic
    return this.#repository.create(data);
  }
  update = (data: Update__name__Payload) => {
    // Bussiness Logic
    return this.#repository.update(data);
  }
  delete = (data: Delete__name__Payload) => {
    // Bussiness Logic
    return this.#repository.delete(data);
  }
}
