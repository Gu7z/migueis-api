import Products from "../models/products";
import imagesView from "./imagesView";

export default {
  render(product: Products) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      images: imagesView.renderMany(product.images),
    };
  },

  renderMany(product: Products[]) {
    return product.map((product) => this.render(product));
  },
};
