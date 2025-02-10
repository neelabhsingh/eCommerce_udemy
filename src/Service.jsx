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
        return productResponseBody.find(
            (product) => product.id == productId
          );
    },
    fetchProducts: () => {
        return fetch("http://localhost:5001/products", {
            method: "GET",
          });
    },
}

