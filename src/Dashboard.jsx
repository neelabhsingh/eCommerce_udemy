import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  use,
} from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
import { OrderService, ProductService } from "./Service";

let Dashboard = (props) => {
  let [orders, setOrders] = useState([]);
  let [showOrderDeletedAlert, setShowOrderDeletedAlert] = useState(false);
  let [showOrderPlacedAlert, setShowOrderPlacedAlert] = useState(false);
  let userContext = useContext(UserContext);
  console.log("UserContext User Id: ", userContext.user.currentUserId);
  const loadDataFromDatabase = useCallback(async () => {
    try {
      let ordersResponse = await fetch(
        `http://localhost:5001/orders?userId=${userContext.user.currentUserId}`,
        { method: "GET" }
      );

      if (!ordersResponse.ok) throw new Error("Failed to fetch orders");

      let orderResponseBody = await ordersResponse.json();
      console.log("Fetched Orders: ", orderResponseBody);

      let productResponse = await ProductService.fetchProducts();
      let productResponseBody = await productResponse.json();

      orderResponseBody.forEach((order) => {
        order.product = ProductService.getProductByProductId(
          productResponseBody,
          order.productId
        );
      });

      console.log("Orders with Product: ", orderResponseBody);
      setOrders(orderResponseBody);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [userContext.user.currentUserId]);
  useEffect(() => {
    if (!userContext.user.currentUserId) {
      console.warn("User ID is missing, skipping API call");
      return;
    }

    document.title = "Dashboard - eCommerce";

    // ✅ Call the function inside useEffect
    loadDataFromDatabase();
  }, [userContext.user.currentUserId, loadDataFromDatabase]);

  let onBuyNowClick = useCallback(
    async (orderId, userId, productId, quantity) => {
      if (window.confirm("Are you sure you want to buy this product?")) {
        let updateOrder = {
          id: orderId,
          userId: userId,
          productId: productId,
          quantity: quantity,
          isPaymentCompleted: true,
        };

        try {
          let orderResponse = await fetch(
            `http://localhost:5001/orders/${orderId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updateOrder),
            }
          );

          if (orderResponse.ok) {
            console.log("Order updated successfully");
            setShowOrderPlacedAlert(true);
            loadDataFromDatabase(); // Refresh the orders

            // Hide alert after 3 seconds
            setTimeout(() => setShowOrderPlacedAlert(false), 3000);
          } else {
            console.error("Failed to update order");
          }
        } catch (error) {
          console.error("Error updating order: ", error);
        }
      }
    },
    [loadDataFromDatabase]
  );

  let onDeleteClick = useCallback(
    async (orderId) => {
      if (window.confirm("Are you sure you want to delete this order?")) {
        try {
          let orderResponse = await fetch(
            `http://localhost:5001/orders/${orderId}`,
            { method: "DELETE" }
          );

          if (orderResponse.ok) {
            console.log("Order deleted successfully");
            setShowOrderDeletedAlert(true);
            loadDataFromDatabase(); // Refresh the orders

            // Hide alert after 3 seconds
            setTimeout(() => setShowOrderDeletedAlert(false), 3000);
          } else {
            console.error("Failed to delete order");
          }
        } catch (error) {
          console.error("Error deleting order: ", error);
        }
      }
    },
    [loadDataFromDatabase]
  );
  
  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"> Dashboard</i>{" "}
          <button
            className="btn btn-sm btn-info"
            onClick={loadDataFromDatabase}
          >
            <i className="fa fa-refresh"> Refresh</i>
          </button>
        </h4>
      </div>

      <div className="col-12">
        <div className="row">
          {/** Previous Orders Section */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history">
                Previous Orders{" "}
                <span className="badge badge-info bg-primary text-white p-2 rounded">
                  {OrderService.getPreviousOrders(orders).length}
                </span>
              </i>
            </h4>
            {showOrderPlacedAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-danger alert-dismissible fade show mt-1"
                  role="alert"
                >
                  Your Order is removed from Cart!
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            {OrderService.getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger">No Orders</div>
            ) : (
              OrderService.getPreviousOrders(orders).map((order) => (
                <Order
                  key={order.id}
                  orderId={order.id}
                  productId={order.productId}
                  userId={order.userId}
                  isPaymentCompleted={order.isPaymentCompleted}
                  quantity={order.quantity}
                  productName={order.product?.productName || "Unknown Product"}
                  price={order.product?.price || 0}
                  onBuyNowClick={onBuyNowClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </div>

          {/** Cart Section */}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-shopping-cart">
                Cart{" "}
                <span className="badge badge-info bg-primary text-white p-2 rounded">
                  {OrderService.getCart(orders).length}
                </span>
              </i>
            </h4>
            {showOrderPlacedAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-success alert-dismissible fade show mt-1"
                  role="alert"
                >
                  Your Order has been placed successfully!
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {OrderService.getCart(orders).length === 0 ? (
              <div className="text-danger">No Orders</div>
            ) : (
              OrderService.getCart(orders).map((order) => (
                <Order
                  key={order.id}
                  orderId={order.id}
                  productId={order.productId}
                  userId={order.userId}
                  isPaymentCompleted={order.isPaymentCompleted}
                  quantity={order.quantity}
                  productName={order.product?.productName || "Unknown Product"}
                  price={order.product?.price || 0}
                  onBuyNowClick={onBuyNowClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
