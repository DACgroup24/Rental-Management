import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const states = {
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Thane",
      "Aurangabad",
      "Kolhapur",
    ],
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
    ],
    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Hubli",
      "Mangalore",
    ],
    Delhi: [
      "New Delhi",
      "North Delhi",
      "South Delhi",
      "East Delhi",
    ],
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    adharno: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setUser({
        ...user,
        state: value,
        city: "",
      });
      return;
    }

    setUser({
      ...user,
      [name]: value,
    });
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (user.password !== user.confirmPassword) {
  //     alert("Passwords do not match.");
  //     return;
  //   }

  //   console.log(user);

  //   alert(
  //     user.role === "landlord"
  //       ? "Registration request submitted successfully. Wait for Admin approval."
  //       : "Registration Successful."
  //   );

  //   navigate("/login");
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (user.password !== user.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8081/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        state: user.state,
        adharno: user.adharno,
        password: user.password,
        role: user.role,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      alert(data.message || "Registration Successful");

      navigate("/login");
    } else {
      const error = await response.text();
      alert(error);
    }
  } catch (err) {
    console.error(err);
    alert("Unable to connect to server.");
  }
};


  return (
    <div
      className="container-fluid bg-light py-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-header bg-primary text-white text-center py-4">
              <h2>Rental Hub</h2>
              <p className="mb-0">
                Create Your Account
              </p>
            </div>

            <div className="card-body p-5">

              <form onSubmit={handleSubmit}>

                {/* Name & Email */}

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                {/* Phone & Aadhaar */}

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      maxLength="10"
                      value={user.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Aadhaar Number
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="adharno"
                      maxLength="12"
                      value={user.adharno}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                {/* Address */}

                <div className="mb-3">

                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* State & City */}

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      State
                    </label>

                    <select
                   
                      className="form-select"
                      value={user.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select State
                      </option>

                      {Object.keys(states).map((state) => (
                        <option key={state}>
                          {state}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      City
                    </label>

                    <select
                      className="form-select"
                      name="city"
                      value={user.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select City
                      </option>

                      {user.state &&
                        states[user.state].map((city) => (
                          <option key={city}>
                            {city}
                          </option>
                        ))}

                    </select>

                  </div>

                </div>

                {/* Password */}

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                {/* Role */}

                <div className="mb-4">

                  <label className="form-label">
                    Register As
                  </label>

                  <select
                    className="form-select"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                  >
                    <option value="tenant">
                      Tenant
                    </option>

                    <option value="landlord">
                      Landlord
                    </option>

                  </select>

                </div>

                {user.role === "landlord" && (
                  <div className="alert alert-warning">
                    Your registration request will be sent to the Administrator.
                    You will be able to log in only after your account has been approved.
                  </div>
                )}

                <button
                  className="btn btn-primary w-100 py-2"
                  type="submit"
                >
                  Register
                </button>

              </form>

              <hr />

              <div className="text-center">

                Already have an account?

                <Link
                  to="/login"
                  className="ms-2 text-decoration-none"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
