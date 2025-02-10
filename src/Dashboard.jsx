import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { get } from "jquery";
import Order from "./Order";
//getPreviousOrders function
let getPreviousOrders = (orders) => {
  let result = orders.filter((order) => order.isPaymentCompleted === true);
  console.log("Previous Orderdddds:", result.length);
  return result;
};

//getCart
let getCartOrders = (orders) => {
  return orders.filter((order) => order.isPaymentCompleted === false);
};

let Dashboard = (props) => {
  //execute only once on initial render= componentDidMount
  let [orders, setOrders] = useState([]);

  //get context
  let userContext = useContext(UserContext);
  console.log("UserContext User Id: ", userContext.user.currentUserId);
  //execute only once on initial render= componentDidMount
  useEffect(() => {
    if (!userContext.user.currentUserId) {
      console.warn("User ID is missing, skipping API call");
      return;
    }

    document.title = "Dashboard - eCommerce";

    (async () => {
      try {
        let ordersResponse = await fetch(
          `http://localhost:5001/orders?userId=${userContext.user.currentUserId}`, // ✅ Fix the URL
          { method: "GET" }
        );
        if (ordersResponse.ok) {
          let orderResponseBody = await ordersResponse.json();
          console.log("Fetched Orders: ", orderResponseBody);

          //get all data from products
          let productResponse = await fetch("http://localhost:5001/products", {
            method: "GET",
          });
          if (productResponse.ok) {
            let productResponseBody = await productResponse.json();
            //read all orders data
            orderResponseBody.forEach((order) => {
              order.product = productResponseBody.find(
                (product) => product.id == order.productId
              );
            });
            console.log("Orders with Product: ", orderResponseBody);
            setOrders(orderResponseBody);
          }
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    })();
  }, [userContext.user.currentUserId]);

  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard">Dashboard</i>
        </h4>
      </div>
      <div className="col-12">
        <div className="row">
          {/** Previous Orders starts*/}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history">
                Previous Orders
                <span className="badge badge-info bg-primary text-white p-2 rounded">
                  {getPreviousOrders(orders).length}
                </span>
              </i>
            </h4>
            {getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger">No Order</div>
            ) : (
              ""
            )}
            {getPreviousOrders(orders).map((order) => (
              <Order
                key={order.id}
                orderId={order.id}
                productId={order.productId}
                userId={order.userId}
                isPaymentCompleted={order.isPaymentCompleted}
                quantity={order.quantity}
                productName={order.product.productName}
                price={order.product.price}
              />
            ))}
          </div>
          {/** Previous Orders end*/}
          {/** Cart starts*/}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-shopping-cart">
                Cart{" "}
                <span className="badge badge-info bg-primary text-white p-2 rounded">
                  {orders && getCartOrders(orders).length}
                </span>
              </i>
            </h4>
            {getCartOrders(orders).length === 0 ? (
              <div className="text-danger">No Order</div>
            ) : (
              ""
            )}
            {getCartOrders(orders).map((order) => (
              <Order
                key={order.id}
                orderId={order.id}
                productId={order.productId}
                userId={order.userId}
                isPaymentCompleted={order.isPaymentCompleted}
                quantity={order.quantity}
                productName={order.product.productName}
                price={order.product.price}
              />
            ))}
          </div>
          {/** Cart starts*/}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
