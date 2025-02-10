import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate(); // React Router v6
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

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
  }, [email]);

  useEffect(() => {
    console.log("Component is mounted");
    document.title = "Login - eCommerce";
  }, []);

  useEffect(() => {
    return () => {
      console.log("Component is unmounted");
    };
  }, []);

  let [error, setError] = useState({
    email: [],
    password: [],
  });

  let validate = () => {
    let errorData = { email: [], password: [] };

    if (!email) {
      errorData.email.push("Email can't be blank");
    }
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!validEmailRegex.test(email)) {
      errorData.email.push("Invalid email format");
    }

    if (!password) {
      errorData.password.push("Password can't be blank");
    }
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (!validPasswordRegex.test(password)) {
      errorData.password.push(
        "Password must be 6 to 15 characters long with at least one numeric digit, one uppercase and one lowercase letter"
      );
    }

    setError(errorData);
  };

  useEffect(validate, [email, password]);

  let [loginMessage, setLoginMessage] = useState("");

  let onLoginClick = async () => {
    let dirtyData = { ...dirty };
    Object.keys(dirtyData).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();

    if (isValid()) {
      try {
        // let response = await fetch(
        //   `http://localhost:5001/users?email=${email}&&password=${password}`
        // );

        let response = await fetch(
          `http://localhost:5001/users?email=${email}&password=${password}`
        );

        if (response.ok) {
          let responseBody = await response.json();
          if (responseBody.length > 0) {
            navigate("/dashboard");
          } else {
            setLoginMessage(
              <span className="text-danger">
                Invalid Login, please try again
              </span>
            );
          }
        }
      } catch (error) {
        console.log("Error: ", error);
        setLoginMessage(
          <span className="text-danger">
            Unable to connect to database server
          </span>
        );
      }
    }
  };

  let isValid = () => {
    return Object.keys(error).every((control) => error[control].length === 0);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-lg-5 col-md-7 mx-auto">
          <div className="card border-success shadow-lg p-4">
            <div className="card-header bg-white border-bottom border-success text-center">
              <h4 className="text-success fw-bold" style={{ fontSize: "35px" }}>
                Login
              </h4>
            </div>

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
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                  placeholder="Enter your email"
                />
                <div className="text-danger">
                  {dirty["email"] && error["email"]?.length > 0
                    ? error["email"].join(", ")
                    : ""}
                </div>
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
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                  placeholder="Enter your password"
                />
                <div className="text-danger">
                  {dirty["password"] && error["password"]?.length > 0
                    ? error["password"].join(", ")
                    : ""}
                </div>
              </div>
            </div>

            <div className="card-footer text-center bg-white">
              <div className="m-1">{loginMessage}</div>
              <button className="btn btn-success m-2" onClick={onLoginClick}>
                Login
              </button>

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
