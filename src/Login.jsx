import React, { use, useEffect, useState } from "react";

const Login = () => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  useEffect(() => {
    console.log("Email: ", email);
    console.log("Password: ", password);
  }, [email]);
  useEffect(() => {
    if (email.indexOf("@") !== -1) {
      console.log("Email is valid");
    } else {
      console.log("Email is invalid");
    }
  });

  //execute only once on initial render= componentDidMount
  useEffect(() => {
    console.log("Component is mounted");
    document.title = "Login - eCommerce";
  }, []);

  //execute only once on initial render= componentWillUnmount
  useEffect(() => {
    return () => {
      console.log("Component is unmounted");
    };
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-lg-5 col-md-7 mx-auto">
          <div className="card border-success shadow-lg p-4">
            {/* Card Header */}
            <div className="card-header bg-white border-bottom border-success text-center">
              <h4 className="text-success fw-bold" style={{ fontSize: "35px" }}>
                Login
              </h4>
            </div>

            {/* Card Body */}
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  placeholder="Enter your password"
                />
              </div>

              {/* Login Button */}
              <button className="btn btn-success w-100 mt-3">Login</button>
            </div>

            {/* Card Footer */}
            <div className="card-footer text-center bg-white">
              <small>
                Don't have an account?{" "}
                <a href="#" className="text-success fw-bold">
                  Sign Up
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
