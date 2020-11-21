import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Products from "./products";
import Items from "./requestedItems";
import ItemsCounter from "./requestedItemsCounter";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => ItemsCounter, (itemsCounter) => itemsCounter.id)
  @JoinColumn({ name: "items" })
  itemsCounter: number;
}
