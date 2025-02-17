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

export const SortService = {
  getSortedArray: (elements, sortBy, sortOrder) => {
    if (!elements) return elements;

    let array = [...elements];

    array.sort((a, b) => {
      if (a[sortBy] && b[sortBy])
        return (
          a[sortBy].toString().toLowerCase() -
          b[sortBy].toString().toLowerCase()
        );
      else return 0;
    });

    if (sortOrder === "DESC") array.reverse();

    return array;
  },
};
