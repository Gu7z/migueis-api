import Category from "../models/category";

export default {
  render(category: Category) {
    return {
      id: category.id,
      name: category.name,
    };
  },

  renderMany(categorys: Category[]) {
    return categorys.map((category) => this.render(category));
  },
};
