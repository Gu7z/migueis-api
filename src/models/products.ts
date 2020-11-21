import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Category from "./category";
import Image from "./image";
import Items from "./requestedItems";

@Entity("products")
export default class Products {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @OneToOne(() => Category, (category) => category.product)
  @JoinColumn({
    name: "category_id",
  })
  category: Category;

  @OneToMany(() => Image, (image) => image.product, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({
    name: "product_id",
  })
  images: Image[];

  @OneToMany(() => Items, (items) => items.product)
  @JoinColumn({
    name: "id",
  })
  items: Items;
}
