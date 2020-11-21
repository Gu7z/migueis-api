import Items from "../models/requestedItems";
import Order from "../models/order";

type formatedItemType = Omit<Items, "itemsCounter">;

interface OrderToRender {
  id: number;
  value: number;
  items: formatedItemType[];
}

const formatItem = (item: Items) => {
  const formatedItem: formatedItemType = {
    id: item.id,
    quantity: item.quantity,
    description: item.description,
    product: {
      category: item.product.category,
      description: item.product.description,
      id: item.product.id,
      images: item.product.images,
      name: item.product.name,
      price: item.product.price,
    },
  };

  return formatedItem;
};

export default {
  render(order: Order | OrderToRender, items?: Items[]) {
    if (items) {
      return {
        id: order.id,
        value: order.value,
        items: items.map(formatItem),
      };
    } else {
      return order;
    }
  },

  renderMany(orders: Order[], items: Items[][]) {
    const ordersToRender = orders.map((order, index) => {
      const orderToRender = {
        id: order.id,
        value: order.value,
        items: items[index].map(formatItem),
      };

      return orderToRender;
    });

    return ordersToRender.map((order) => this.render(order));
  },
};
