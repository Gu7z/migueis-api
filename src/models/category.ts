import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import Product from "./products";

@Entity("categorys")
export default class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Product, (product) => product.category, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({
    name: "id",
  })
  product: Product;
}
