import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Products from "../models/products";
import productView from "../views/productsView";
import * as Yup from "yup";

export default {
  async index(req: Request, res: Response) {
    const productsRepository = getRepository(Products);
    const products = await productsRepository.find({
      relations: ["images"],
    });

    return res.json(productView.renderMany(products));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const productsRepository = getRepository(Products);
    const product = await productsRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(productView.render(product));
  },

  async create(req: Request, res: Response) {
    const { name, description, price, quantity } = req.body;

    const productsRepository = getRepository(Products);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => ({
      path: image.filename,
    }));

    const data = {
      name,
      description,
      price,
      quantity,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const product = productsRepository.create(data);

    await productsRepository.save(product);

    return res.status(201).json(productView.render(product));
  },
};
