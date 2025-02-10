import React from "react";

function Order(props) {
  console.log("Order rendered: ", props);
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        {/* Use Flexbox to align items in the same row */}
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="m-0">
            <i className="fa fa-arrow-right"></i> {props.productName}
          </h6>
          {props.isPaymentCompleted === false && (
            <div>
              <button
                className="btn btn-sm btn-info mr-3"
                onClick={() => {
                  props.onBuyNowClick(
                    props.orderId,
                    props.userId,
                    props.productId,
                    props.quantity
                  );
                }}
              >
                <i className="fa fa-truck"></i> Buy Now
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  props.onDeleteClick(
                    props.orderId,
                    props.userId,
                    props.productId,
                    props.quantity
                  );
                }}
              >
                <i className="fa fa-trash-o"></i> Delete
              </button>
            </div>
          )}
        </div>

        <table className="table table-sm table-borderless mt-1">
          <tbody>
            <tr>
              <td style={{ width: "100px" }}>Quantity:</td>
              <td>{props.quantity}</td>
            </tr>
            <tr>
              <td style={{ width: "100px" }}>Price: </td>
              <td>${props.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(Order);
