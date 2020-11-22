import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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
