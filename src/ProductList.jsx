import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { BrandsService, CategoriesService, SortService } from "./Service";

function ProductsList(props) {
  // state
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [originalProducts, setOriginalProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [sortBy, setSortBy] = useState("productName");
  let [sortOrder, setSortOrder] = useState("ASC"); // ASC or DESC
  let [currentPage, setCurrentPage] = useState(0);
  let [productsPerPage] = useState(5); // Display only 5 products per page

  useEffect(() => {
    (async () => {
      try {
        // Fetch brands and categories concurrently
        let [brandsResponse, categoriesResponse] = await Promise.all([
          BrandsService.fetchBrands(),
          CategoriesService.fetchCategories(),
        ]);

        let brandsResponseBody = await brandsResponse.json();
        setBrands(brandsResponseBody);

        let categoriesResponseBody = await categoriesResponse.json();
        setCategories(categoriesResponseBody);
        document.title = "Product - eCommerce";
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  // useEffect
  useEffect(() => {
    if (brands.length > 0 && categories.length > 0) {
      (async () => {
        // get data from brands database
        let brandsResponse = await BrandsService.fetchBrands();
        let brandsResponseBody = await brandsResponse.json();

        // get data from categories database
        let categoriesResponse = await CategoriesService.fetchCategories();
        let categoriesResponseBody = await categoriesResponse.json();

        // get data from products database
        // let productsResponse = await fetch(
        //   `http://localhost:5001/products?productName_like=${search}&_sort=productName&_order=ASC`,
        //   { method: "GET" }
        // );

        let productsResponse = await fetch(
          `http://localhost:5001/products?productName_like=${search}&_sort=productName&_order=ASC`,
          { method: "GET" }
        );
        let productsResponseBody = await productsResponse.json();

        productsResponseBody.forEach((product) => {
          product.brand = BrandsService.getBrandByBrandId(
            brandsResponseBody,
            product.brandId
          );

          product.category = CategoriesService.getCategoryByCategoryId(
            categoriesResponseBody,
            product.categoryId
          );
        });

        setProducts(productsResponseBody);
        setOriginalProducts(productsResponseBody);
      })();
    }
  }, [brands, categories]);

  // when the user clicks on a column name to sort
  let onSortColumnNameClick = (event, columnName) => {
    event.preventDefault(); // avoid refresh
    setSortBy(columnName);
    let negatedSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(negatedSortOrder);
    setProducts(
      SortService.getSortedArray(originalProducts, columnName, negatedSortOrder)
    );
  };

  // render column name
  let getColumnHeader = (columnName, displayName) => {
    return (
      <React.Fragment>
        <a
          href="/#"
          onClick={(event) => {
            onSortColumnNameClick(event, columnName);
          }}
        >
          {displayName}
        </a>{" "}
        {sortBy === columnName && sortOrder === "ASC" ? (
          <i className="fa fa-sort-up"></i>
        ) : (
          ""
        )}
        {sortBy === columnName && sortOrder === "DESC" ? (
          <i className="fa fa-sort-down"></i>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  // handle page click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <div className="row">
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h4>
              <i className="fa fa-suitcase"></i> Products{" "}
              <span className="badge badge-secondary">{products.length}</span>
            </h4>
          </div>

          <div className="col-lg-9">
            <input
              type="search"
              value={search}
              placeholder="Search"
              className="form-control"
              autoFocus="autofocus"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>{getColumnHeader("productName", "Product Name")}</th>
                  <th>{getColumnHeader("price", "Price")}</th>
                  <th>{getColumnHeader("brand", "Brand")}</th>
                  <th>{getColumnHeader("category", "Category")}</th>
                  <th>{getColumnHeader("rating", "Rating")}</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.brand ? product.brand.brandName : "N/A"}</td>
                    <td>
                      {product.category ? product.category.categoryName : "N/A"}
                    </td>
                    <td>
                      {[...Array(product.rating).keys()].map((n) => {
                        return (
                          <i className="fa fa-star text-warning" key={n}></i>
                        );
                      })}
                      {[...Array(5 - product.rating).keys()].map((n) => {
                        return (
                          <i className="fa fa-star-o text-warning" key={n}></i>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
