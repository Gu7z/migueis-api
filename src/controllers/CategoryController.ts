import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Category from "../models/category";
import categorysView from "../views/categorysView";
import * as Yup from "yup";

export default {
  async index(_req: Request, res: Response) {
    const categorysRepository = getRepository(Category);
    const categorys = await categorysRepository.find();

    return res.json(categorysView.renderMany(categorys));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const categorysRepository = getRepository(Category);
    const category = await categorysRepository.findOneOrFail(id);

    return res.json(categorysView.render(category));
  },

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const categorysRepository = getRepository(Category);

    const data = {
      name,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const category = categorysRepository.create(data);

    await categorysRepository.save(category);

    return res.status(201).json(categorysView.render(category));
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { name } = req.body;

    const categorysRepository = getRepository(Category);
    const category = await categorysRepository.findOneOrFail(id);

    const data = {
      name,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    category.name = name;

    await categorysRepository.save(category);

    return res.status(200).json(categorysView.render(category));
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const categorysRepository = getRepository(Category);
    const category = await categorysRepository.findOneOrFail(id);

    await categorysRepository.remove(category);

    return res.status(204).json();
  },
};
