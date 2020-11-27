import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItemsCounter from "./requestedItemsCounter";
import User from "./user";

@Entity("orders")
export default class Order {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  value: number;

  @Column()
  table: number;

  @ManyToOne(() => ItemsCounter, (itemsCounter) => itemsCounter.id)
  @JoinColumn({ name: "items" })
  itemsCounter: number;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "user_id" })
  user: User;
}
