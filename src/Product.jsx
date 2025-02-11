import React, { useState } from "react";

function Product(props) {
  let [product, setProduct] = useState(props.product);
  console.log("Inside the Product component" + JSON.stringify(product));
  return (
    <div className="col-lg-6">
      <div className="card m-1">
        <div className="card-body">
          <h5>
            <i className="fa fa-arrow-right"></i>
            {product.productName}
          </h5>
          <div>${product.price.toFixed(2)}</div>
          <div className="mt-2">
            #{product.brand.brandName} #{product.category.categoryName}
          </div>
          <div>
            {[...Array(product.rating).keys()].map((n) => {
              return <i key={n} className="fa fa-star text-warning"></i>;
            })}

            {[...Array(5 - product.rating).keys()].map((n) => {
              return <i key={n} className="fa fa-star-o text-warning"></i>;
            })}
          </div>
          <div className="float-right">
            {product.isOrdered ? (
              <span className="text-primary">Added to Cart!</span>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={()=>{
                props.onAddToCartClick(product);
              }}><i className="fa fa-cart-plus"></i>Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
