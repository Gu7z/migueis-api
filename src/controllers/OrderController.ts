import { Request, Response } from "express";
import Order from "../models/order";
import Items from "../models/requestedItems";
import Products from "../models/products";
import ItemsCounter from "../models/requestedItemsCounter";
import { getRepository } from "typeorm";
import ordersView from "../views/ordersView";

interface ItemsRequest {
  productId: number;
  quantity: number;
  description: string;
}

export default {
  async index(_req: Request, res: Response) {
    const OrderRepository = getRepository(Order);
    const ItemsRepository = getRepository(Items);

    const orders = await OrderRepository.find({
      relations: ["itemsCounter"],
    });

    let items: Items[][] = [];
    for (const order of orders) {
      const itemsData = await ItemsRepository.find({
        where: { itemsCounter: order.itemsCounter },
        relations: ["product"],
      });

      items.push(itemsData);
    }

    return res.json(ordersView.renderMany(orders, items));
  },

  async show(req: Request, res: Response) {
    const OrderRepository = getRepository(Order);
    const ItemsRepository = getRepository(Items);

    const { id } = req.params;

    const order = await OrderRepository.findOneOrFail(id, {
      relations: ["itemsCounter"],
    });

    const items = await ItemsRepository.find({
      where: { itemsCounter: order.itemsCounter },
      relations: ["product"],
    });

    return res.json(ordersView.render(order, items));
  },

  async create(req: Request, res: Response) {
    const products = req.body.items as ItemsRequest[];
    const { description } = req.body;

    const OrderRepository = getRepository(Order);
    const ItemsRepository = getRepository(Items);
    const ItemsCounterRepository = getRepository(ItemsCounter);
    const ProductRepository = getRepository(Products);

    const itemCounter = ItemsCounterRepository.create();
    await ItemsCounterRepository.save(itemCounter);

    let value = 0;
    for (const product of products) {
      const productData = await ProductRepository.findOneOrFail(
        product.productId
      );

      console.log(description);

      const item = ItemsRepository.create({
        itemsCounter: itemCounter.id,
        product: productData,
        description: product.description,
        quantity: product.quantity,
      });

      await ItemsRepository.save(item);

      value += productData.price * product.quantity;
    }

    const order = OrderRepository.create({
      itemsCounter: itemCounter.id,
      value,
    });

    await OrderRepository.save(order);

    return res.status(201).json();
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const products = req.body.items as ItemsRequest[];
    const { description } = req.body;

    const OrderRepository = getRepository(Order);
    const ItemsRepository = getRepository(Items);
    const ItemsCounterRepository = getRepository(ItemsCounter);
    const ProductRepository = getRepository(Products);

    const itemCounter = ItemsCounterRepository.create();
    await ItemsCounterRepository.save(itemCounter);

    let value = 0;

    const order = await OrderRepository.findOneOrFail(id, {
      relations: ["itemsCounter"],
    });

    for (const product of products) {
      const productData = await ProductRepository.findOneOrFail(
        product.productId
      );

      const item = await ItemsRepository.findOneOrFail(order.itemsCounter);

      item.itemsCounter = itemCounter.id;
      item.product = productData;
      item.quantity = product.quantity;
      item.description = product.description;

      await ItemsRepository.save(item);

      value += productData.price * product.quantity;
    }

    order.itemsCounter = itemCounter.id;
    order.value = value;

    await OrderRepository.save(order);

    return res.status(204).json();
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const orderRepository = getRepository(Order);
    const order = await orderRepository.findOneOrFail(id);

    await orderRepository.remove(order);

    return res.status(204).json();
  },
};
