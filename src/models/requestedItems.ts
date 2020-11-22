import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Products from "./products";
import ItemsCounter from "./requestedItemsCounter";

@Entity("requested_items")
export default class Items {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @ManyToOne(() => ItemsCounter, (itemsCounter) => itemsCounter.id)
  @JoinColumn({ name: "request_id" })
  itemsCounter: number;

  @ManyToOne(() => Products, (product) => product.items)
  @JoinColumn({ name: "product_id" })
  product: Omit<Products, "quantity" | "items">;
}
