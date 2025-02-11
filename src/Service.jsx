import { get } from "jquery";

export const OrderService = {
  getPreviousOrders: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === true);
  },
  getCart: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === false);
  },
};

export const ProductService = {
  getProductByProductId: (productResponseBody, productId) => {
    return productResponseBody.find((product) => product.id == productId);
  },
  fetchProducts: () => {
    return fetch("http://localhost:5001/products", {
      method: "GET",
    });
  },
};

export const BrandsService = {
  fetchBrands: () => {
    return fetch("http://localhost:5001/brands", {
      method: "GET",
    });
  },
  getBrandByBrandId: (brands, brandId) => {
    console.log("getBrandByBrandId brands: ", brands);
    return brands.find((brand) => brand.id == brandId);
  },
};

export const CategoriesService = {
  fetchCategories: () => {
    return fetch("http://localhost:5001/categories", {
      method: "GET",
    });
  },
  getCategoryByCategoryId: (categories, categoryId) => {
    return categories.find((category) => category.id == categoryId);
  },
};
