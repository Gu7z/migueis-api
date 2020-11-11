import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Products from "../models/products";
import productView from "../views/productsView";
import * as Yup from "yup";
import Images from "../models/image";
import Category from "../models/category";

export default {
  async index(_req: Request, res: Response) {
    const productsRepository = getRepository(Products);
    const products = await productsRepository.find({
      relations: ["images", "category"],
    });

    return res.json(productView.renderMany(products));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const productsRepository = getRepository(Products);
    const product = await productsRepository.findOneOrFail(id, {
      relations: ["images", "category"],
    });

    return res.json(productView.render(product));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      description,
      price,
      quantity,
      category: category_id,
    } = req.body;

    const productsRepository = getRepository(Products);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => ({
      path: image.filename,
    }));

    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOneOrFail(category_id);

    const data = {
      name,
      description,
      price,
      quantity,
      category,
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
      category: Yup.object()
        .shape({
          name: Yup.string().required(),
          id: Yup.number().required(),
        })
        .required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const product = productsRepository.create(data);

    const teste = await productsRepository.save(product);

    return res.status(201).json(productView.render(product));
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      quantity,
      category: category_id,
    } = req.body;

    const productsRepository = getRepository(Products);
    const product = await productsRepository.findOneOrFail(id, {
      relations: ["images", "category"],
    });

    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOneOrFail(category_id);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => ({
      path: image.filename,
    }));

    const data = {
      name,
      description,
      price,
      quantity,
      category,
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
      category: Yup.object()
        .shape({
          name: Yup.string().required(),
          id: Yup.number().required(),
        })
        .required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const imagesRepository = getRepository(Images);
    const imagesFromDB = imagesRepository.create(images);

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.images = imagesFromDB;
    product.category = category;

    await productsRepository.save(product);

    return res.status(200).json(productView.render(product));
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const productsRepository = getRepository(Products);
    const product = await productsRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    await productsRepository.remove(product);

    return res.status(204);
  },
};
