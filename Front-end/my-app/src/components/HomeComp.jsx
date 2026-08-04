import { NavLink, Outlet } from "react-router-dom"
export default function HomeComp() {
  return (
    <>
     {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">
            RentalHub
          </span>

           <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            </ul>

          <div className="ms-auto">
            <NavLink className="btn btn-light me-2" to="/login">
              Login
            </NavLink>

            <NavLink className="btn btn-outline-light" to="/register">
              Register
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />

      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">
            Find Your Perfect Rental Home
          </h1>

          <p className="lead text-muted">
            Browse apartments, villas, and houses across the city.
          </p>

          <div className="row justify-content-center mt-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search by location..."
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary btn-lg w-100">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container-fluid py-5 px-4">
        <h2 className="mb-4">Featured Properties</h2>

        <div className="d-flex gap-4 overflow-auto">

          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="card flex-shrink-0 shadow"
              style={{ width: "20rem" }}
            >
              <img
                src={`https://picsum.photos/400/250?random=${id}`}
                className="card-img-top"
                alt="property"
              />

              <div className="card-body">
                <h5 className="card-title">
                  2 BHK Apartment
                </h5>

                <p className="card-text">
                  Mumbai, Maharashtra
                </p>

                <h6 className="text-success">
                  ₹15,000 / month
                </h6>

                <button className="btn btn-primary w-100">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* Categories */}
      <section className="container py-5">
        <h2 className="text-center mb-4">
          Browse by Category
        </h2>

        <div className="row text-center">

          <div className="col-md-3">
            <div className="card p-4 shadow-sm">
              
              <h5>Apartments</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-4 shadow-sm">
              
              <h5>Independent Houses</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-4 shadow-sm">
              
              <h5>Villas</h5>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-4 shadow-sm">
              
              <h5>PG & Shared Rooms</h5>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">
            Why Choose RentalHub?
          </h2>

          <div className="row text-center">

            <div className="col-md-4">
              <h4>Verified Listings</h4>
              <p>All properties are verified before publishing.</p>
            </div>

            <div className="col-md-4">
              <h4>Secure Payments</h4>
              <p>Pay rent online safely and securely.</p>
            </div>

            <div className="col-md-4">
              <h4>Maintenance Support</h4>
              <p>Raise maintenance requests directly.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          © 2026 RentalHub. All Rights Reserved.
        </p>
      </footer>

      
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <div className="container-fluid">
          <span className="navbar-brand">My App</span>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container mt-4">
        <h1>Welcome to Home Page</h1>
        <Outlet />
      </div>

      <div className="d-flex gap-3 overflow-auto">
        <div className="card" style={{ width: "18rem" }}>
          <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Card 1</h5>
            <p className="card-text">Description</p>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Card 2</h5>
            <p className="card-text">Description</p>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Card 3</h5>
            <p className="card-text">Description</p>
          </div>
        </div>
      </div> */}

      {/* <div className="card" style={{width:"18rem"}}>
        
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">CARD 1</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
      </div>

      <div className="card" style={{width:"18rem"}}>
        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Card 2</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
      </div>

      <div className="card" style={{width:"18rem"}}>
        <img src="https://via.placeholder.com/300x200" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">CARD 3</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
      </div> */}

    </>
  )
}