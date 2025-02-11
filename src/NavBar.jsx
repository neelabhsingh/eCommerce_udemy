import React, { useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const NavBar = () => {
  //get context
  let userContext = useContext(UserContext);
  let navigate = useNavigate();
  let onLogoutClick = (event) => {
    event.preventDefault();
    userContext.setUser({
      isLoggedIn: false,
      currentUserId: null,
      currentUserName: null,
    });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          eCommerce
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!userContext.user.isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-light"
                      : "nav-link text-light"
                  }
                  to="/"
                >
                  Login
                </NavLink>
              </li>
            ) : (
              ""
            )}

            {!userContext.user.isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-light"
                      : "nav-link text-light"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            ) : (
              ""
            )}

            {userContext.user.isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-light"
                      : "nav-link text-light"
                  }
                  to="/dashboard"
                >
                  <i className="fa fa-dashboard"></i>Dashboard
                </NavLink>
              </li>
            ) : (
              ""
            )}

            {userContext.user.isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active text-light"
                      : "nav-link text-light"
                  }
                  to="/store"
                >
                  <i className="fa fa-shopping-bag"></i>Store
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
          {/* Right box starts */}
          {userContext.user.isLoggedIn ? (
            <div style={{ marginRight: "100px" }}>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-light"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user-circle"></i>{" "}
                    {userContext.user.currentUserName}
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={onLogoutClick}
                    >
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
