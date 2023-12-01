import { Request, Response } from "express";
import { __name__Service } from ".";
import { __name__RepositoryInstance } from "../../repositories";

export class __name__Controller {
  #service: __name__Service;

  constructor() {
    this.#service = new __name__Service({
      repository: __name__RepositoryInstance
    });
  }

  getAll = (_: Request, res: Response) => {
    const serviceResponse = this.#service.getAll();
    res.json(serviceResponse)
  }
  getOne = (req: Request, res: Response) => {
    const { uuid } = req.params;
    const serviceResponse = this.#service.getOne({
      uuid,
    });
    res.json(serviceResponse)
  }
  create = (req: Request, res: Response) => {
    const data = req.body;
    const serviceResponse = this.#service.create(data);
    res.json(serviceResponse)
  }
  update = (req: Request, res: Response) => {
    const { uuid } = req.params;
    const data = req.body;
    const serviceResponse = this.#service.update({
      ...data,
      uuid
    });
    res.json(serviceResponse)
  }
  delete = (req: Request, res: Response) => {
    const { uuid } = req.params;
    const serviceResponse = this.#service.delete({
      uuid
    });
    res.json(serviceResponse)
  }
}
