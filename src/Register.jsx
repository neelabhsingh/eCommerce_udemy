import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
let Register = (props) => {
  const navigate = useNavigate(); // React Router v6
  let [state, setState] = useState({
    email: "neelabh@gmail.com",
    password: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    receiveNewsLetter: false, // Use boolean instead of empty string
    role: "user",
  });

  let [countries] = useState([
    { id: 1, countryName: "India" },
    { id: 2, countryName: "USA" },
    { id: 3, countryName: "UK" },
    { id: 4, countryName: "France" },
    { id: 5, countryName: "Brazil" },
    { id: 6, countryName: "Mexico" },
    { id: 7, countryName: "Canada" },
  ]);

  let [error, setError] = useState({
    email: [],
    password: [],
    fullName: [],
    dateOfBirth: [],
    gender: [],
    country: [],
    receiveNewsLetter: [],
  });

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    dateOfBirth: false,
    gender: false,
    country: false,
    receiveNewsLetter: false,
  });
  useEffect(() => {
    console.log("Component is mounted");
    document.title = "Register - eCommerce";
  }, []);

  let [message, setMessage] = useState("");
  let userContext = useContext(UserContext);
  //Validate
  let validate = () => {
    let errorData = {};
    //email
    errorData.email = [];
    //email cann't be blank
    if (!state.email) {
      errorData.email.push("Email can't be blank");
    }
    //email regex
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (!validEmailRegex.test(state.email)) {
      errorData.email.push("Invalid email format");
    }

    //password
    errorData.password = [];
    //password cann't be blank
    if (!state.password) {
      errorData.password.push("Password can't be blank");
    }
    //password regex
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;
    if (!validPasswordRegex.test(state.password)) {
      errorData.password.push(
        "Password must be 6 to 15 characters long with at least one numeric digit, one uppercase and one lowercase letter"
      );
    }

    //fullName
    errorData.fullName = [];
    //fullName cann't be blank
    if (!state.fullName) {
      errorData.fullName.push("FullName can't be blank");
    }

    //dateOfBirth
    errorData.dateOfBirth = [];
    //dateOfBirth cann't be blank
    if (!state.dateOfBirth) {
      errorData.dateOfBirth.push("Date Of Birth can't be blank");
    }

    //gender
    errorData.gender = [];
    //gender cann't be blank
    if (!state.gender) {
      errorData.gender.push("Please select gender either male or female");
    }

    //country
    errorData.country = [];
    //country cann't be blank
    if (!state.country) {
      errorData.country.push("Please select country");
    }

    //receiveNewsLetter
    errorData.receiveNewsLetter = [];
    //receiveNewsLetter cann't be blank
    if (!state.receiveNewsLetter) {
      errorData.receiveNewsLetter.push("Please select receiveNewsLetter");
    }

    setError(errorData);
  };
  useEffect(validate, [state]);
  let onRegisterClick = async () => {
    //Set all fields as dirty
    let dirtyData = { ...dirty };
    Object.keys(dirtyData).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();
    if (isValid()) {
      setMessage(<span className="text-success">Success</span>);
      // let respone = await fetch("http://localhost:5001/users", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: state.email,
      //     password: state.password,
      //     fullName: state.fullName,
      //     dateOfBirth: state.dateOfBirth,
      //     gender: state.gender,
      //     country: state.country,
      //     receiveNewsLetter: state.receiveNewsLetter,
      //   }),
      // });
      let response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (response.ok) {
        let responseBody = await response.json();
        console.log("Response Body: ", responseBody);

        userContext.setUser({
          ...useContext.user,
          isLoggedIn: true,
          currentUserName: responseBody.fullName,
          currentUserId: responseBody.id,
          currentUserRole: responseBody.role,
        });

        setMessage(
          <span className="text-success">Successfully Registered</span>
        );
        navigate("/dashboard");
      } else {
        setMessage(
          <span className="text-danger">Error in database connection</span>
        );
      }
    } else {
      setMessage(<span className="text-danger">Errors</span>);
    }
  };

  let isValid = () => {
    let valid = true;
    //reading all controls from 'errors' state
    Object.keys(error).forEach((control) => {
      if (error[control].length > 0) {
        valid = false;
      }
    });
    return valid;
  };
  return (
    <div className="row justify-content-center">
      <div className="col-lg-6">
        <div className="card border-primary shadow my-4">
          <div className="card-header bg-primary text-white text-center">
            <h4>Register</h4>
            <ul className="text-danger">
              {Object.keys(error).map((control) => {
                if (dirty[control]) {
                  return error[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                } else {
                  return "";
                }
              })}
            </ul>
          </div>
          <div className="card-body">
            {/* Email */}
            <div className="mb-3 row">
              <label className="col-lg-4 col-form-label" htmlFor="email">
                Email:
              </label>
              <div className="col-lg-8">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={state.email}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />
                <div className="text-danger">
                  {dirty["email"] && error["email"]?.length > 0
                    ? error["email"].join(", ")
                    : ""}
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="mb-3 row">
              <label className="col-lg-4 col-form-label" htmlFor="password">
                Password:
              </label>
              <div className="col-lg-8">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={state.password}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />
                <div className="text-danger">
                  {dirty["password"] && error["password"]?.length > 0
                    ? error["password"].join(", ")
                    : ""}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="mb-3 row">
              <label className="col-lg-4 col-form-label" htmlFor="fullName">
                Full Name:
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={state.fullName}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />
                <div className="text-danger">
                  {dirty["fullName"] && error["fullName"][0]
                    ? error["fullName"]
                    : ""}
                  {dirty["fullName"] && error["fullName"]?.length > 0
                    ? error["fullName"].join(", ")
                    : ""}
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="mb-3 row">
              <label className="col-lg-4 col-form-label" htmlFor="dateOfBirth">
                Date of Birth:
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={state.dateOfBirth}
                  onChange={(e) =>
                    setState({ ...state, [e.target.name]: e.target.value })
                  }
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />
                <div className="text-danger">
                  {dirty["dateOfBirth"] && error["dateOfBirth"][0]
                    ? error["dateOfBirth"]
                    : ""}
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-3 row">
              <label className="col-lg-4 col-form-label">Gender:</label>
              <div className="col-lg-8">
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    className="form-check-input"
                    checked={state.gender === "male"}
                    onChange={(e) =>
                      setState({ ...state, gender: e.target.value })
                    }
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="text-danger">
                  {dirty["gender"] && error["gender"][0] ? error["gender"] : ""}
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    className="form-check-input"
                    checked={state.gender === "female"}
                    onChange={(e) =>
                      setState({ ...state, gender: e.target.value })
                    }
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="text-danger">
                  {dirty["gender"] && error["gender"][0] ? error["gender"] : ""}
                </div>
              </div>
            </div>

            {/* Country */}
            <div className="mb-3 row">
              <label className="col-lg-4 col-form-label" htmlFor="country">
                Country:
              </label>
              <div className="col-lg-8">
                <select
                  className="form-control"
                  id="country"
                  name="country"
                  value={state.country}
                  onChange={(e) =>
                    setState({ ...state, country: e.target.value })
                  }
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.countryName}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
                <div className="text-danger">
                  {dirty["country"] && error["country"][0]
                    ? error["country"]
                    : ""}
                </div>
              </div>
            </div>

            {/* Receive Newsletter */}
            <div className="mb-3 row">
              <div className="col-lg-8 offset-lg-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="receiveNewsLetter"
                    name="receiveNewsLetter"
                    className="form-check-input"
                    checked={state.receiveNewsLetter}
                    onChange={(e) =>
                      setState({
                        ...state,
                        receiveNewsLetter: e.target.checked,
                      })
                    }
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="receiveNewsLetter"
                  >
                    Receive Newsletter
                  </label>
                </div>
                <div className="text-danger">
                  {dirty["receiveNewsLetter"] && error["receiveNewsLetter"][0]
                    ? error["receiveNewsLetter"]
                    : ""}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="card-footer text-center">
              <div className="m-1">{message}</div>
              <button
                className="btn btn-primary px-4"
                onClick={onRegisterClick}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
