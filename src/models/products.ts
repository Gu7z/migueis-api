import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Image from "./image";

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

  @OneToMany(() => Image, (image) => image.product, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({
    name: "product_id",
  })
  images: Image[];
}
