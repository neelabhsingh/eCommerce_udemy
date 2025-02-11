import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { BrandsService, CategoriesService, ProductService } from "./Service";
import Product from "./Product";

function Store(props) {
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [productsToShow, setProductsToShow] = useState([]);
  let [search, setSearch] = useState("");

  //get user context
  let userContext = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        // Fetch brands and categories concurrently
        let [brandsResponse, categoriesResponse] = await Promise.all([
          BrandsService.fetchBrands(),
          CategoriesService.fetchCategories(),
        ]);

        let brandsResponseBody = await brandsResponse.json();
        brandsResponseBody.forEach((brand) => {
          brand.isChecked = true;
        });
        setBrands(brandsResponseBody);

        let categoriesResponseBody = await categoriesResponse.json();
        categoriesResponseBody.forEach((category) => {
          category.isChecked = true;
        });
        setCategories(categoriesResponseBody);

        document.title = "Store - eCommerce";
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  // Fetch products only after brands and categories are set
  useEffect(() => {
    if (brands.length > 0 && categories.length > 0) {
      console.log("brands: ", brands);
      console.log("categories: ", categories);
      (async () => {
        try {
          //let productsResponse = await ProductService.fetchProducts();
          let productsResponse = await fetch(
            `http://localhost:5001/products?productName_like=${search}`,
            { method: "GET" }
          );
          if (productsResponse.ok) {
            let productsResponseBody = await productsResponse.json();
            productsResponseBody.forEach((product) => {
              product.brand = BrandsService.getBrandByBrandId(
                brands,
                product.brandId
              );
              product.category = CategoriesService.getCategoryByCategoryId(
                categories,
                product.categoryId
              );
              product.isOrdered = false;
            });
            console.log("Products: ", productsResponseBody);
            setProducts(productsResponseBody);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      })();
    }
  }, [brands, categories, search]); // Dependencies ensure products are fetched only when brands and categories are available

  useEffect(() => {
    updateProductToShow();
  }, [brands, categories, products]);

  let updatebrandsChecked = (id) => {
    let updatedBrands = brands.map((brand) => {
      if (brand.id === id) {
        brand.isChecked = !brand.isChecked;
      }
      return brand;
    });
    setBrands(updatedBrands);
  };

  let updatecategoryIsChecked = (id) => {
    let updatedCategories = categories.map((category) => {
      if (category.id === id) {
        category.isChecked = !category.isChecked;
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  let updateProductToShow = () => {
    setProductsToShow(
      products
        .filter((prod) => {
          return (
            categories.filter(
              (cat) => cat.id == prod.categoryId && cat.isChecked
            ).length > 0
          );
        })
        .filter((prod) => {
          return (
            brands.filter(
              (brand) => brand.id == prod.brandId && brand.isChecked
            ).length > 0
          );
        })
        .filter((prod) => {
          return prod.productName.toLowerCase().includes(search.toLowerCase());
        })
    );
  };

  let onAddToCartClick = (product) => {
    (async () => {
      let newOrder = {
        userId: userContext.user.currentUserId,
        productId: product.id,
        quantity: 1,
        isPaymentCompleted: false,
      };

      let orderResponse = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      if (orderResponse.ok) {
        let updatedProducts = products.map((p) => {
          if (p.id == product.id) {
            p.isOrdered = true;
          }
          return p;
        });
        setProducts(updatedProducts);
      }
    })();
  };

  return (
    <div>
      <div className="row py-3 header">
        <div className="col-lg-3">
          <h4>
            <i className="fa fa-shopping-bag"></i>Store{" "}
            <span className="badge badge-secondary">
              {productsToShow.length}
            </span>
          </h4>
        </div>
        <div className="col-lg-9">
          <input
            type="search"
            value={search}
            className="form-control"
            placeholder="Search"
            autoFocus="autofocus"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 py-2">
          <div className="my-2">
            <h5>Brands</h5>
            <ul className="list-group list-group-flush">
              {brands.map((brand) => (
                <li className="list-group-item" key={brand.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={brand.isChecked}
                      onChange={() => {
                        updatebrandsChecked(brand.id);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`brand${brand.id}`}
                    >
                      {brand.brandName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-2">
            <h5>Categories</h5>
            <ul className="list-group list-group-flush">
              {categories.map((category) => (
                <li className="list-group-item" key={category.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={category.isChecked}
                      onChange={() => {
                        updatecategoryIsChecked(category.id);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`category${category.id}`}
                    >
                      {category.categoryName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-9 py-2">
          <div className="row">
            {productsToShow.map((product) => (
              <Product
                key={product.id}
                product={product}
                onAddToCartClick={onAddToCartClick}
              ></Product>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
