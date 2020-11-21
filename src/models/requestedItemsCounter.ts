import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Order from "./order";
import Items from "./requestedItems";

@Entity("requested_items_counter")
export default class ItemsCounter {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToMany(() => Order, (order) => order.itemsCounter)
  @JoinColumn({ name: "id" })
  order: Order;

  @OneToMany(() => Items, (items) => items.itemsCounter)
  @JoinColumn({ name: "id" })
  items: Items[];
}
