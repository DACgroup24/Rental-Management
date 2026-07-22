import { NavLink, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      {/* Top Navbar */}
      <nav
        className="navbar navbar-dark bg-primary px-4 shadow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          height: "70px",
        }}
      >
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">
            Rental Hub Admin
          </span>

          <div className="text-white">
            Welcome Admin
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          position: "fixed",
          top: "70px",
          left: 0,
          width: "250px",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <h5 className="mb-4">Dashboard</h5>

        <ul className="nav flex-column">

          <li className="nav-item mb-2">
            <NavLink
              to=""
              className="nav-link text-white"
            >
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="users"
              className="nav-link text-white"
            >
              Manage Users
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="landlords"
              className="nav-link text-white"
            >
              Landlord Requests
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="properties"
              className="nav-link text-white"
            >
              Properties
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="payments"
              className="nav-link text-white"
            >
              Payments
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="maintenance"
              className="nav-link text-white"
            >
              Maintenance Requests
            </NavLink>
          </li>

          <li className="nav-item mb-2">
            <NavLink
              to="reports"
              className="nav-link text-white"
            >
              Reports
            </NavLink>
          </li>

          <li className="nav-item mt-4">
            <NavLink
              to="logout"
              className="btn btn-danger w-100"
            >
              Logout
            </NavLink>
          </li>

        </ul>
      </div>

      {/* Main Content */}
      <div
        style={{
          marginLeft: "250px",
          marginTop: "70px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        {/* Dashboard Cards */}

        <div className="row g-4 mb-4">

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h2 className="text-primary">245</h2>
                <h6>Total Tenants</h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h2 className="text-success">48</h2>
                <h6>Landlords</h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h2 className="text-warning">132</h2>
                <h6>Properties</h6>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h2 className="text-danger">12</h2>
                <h6>Pending Requests</h6>
              </div>
            </div>
          </div>

        </div>

        {/* Recent Activity */}

        <div className="card shadow border-0 mb-4">
          <div className="card-header bg-white">
            <h5>Recent Activity</h5>
          </div>

          <div className="card-body">

            <ul className="list-group">

              <li className="list-group-item">
                New landlord registration request received.
              </li>

              <li className="list-group-item">
                Property added by landlord.
              </li>

              <li className="list-group-item">
                Tenant rent payment completed.
              </li>

              <li className="list-group-item">
                New maintenance request submitted.
              </li>

            </ul>

          </div>
        </div>

        {/* Nested Route Content */}

        <div className="card shadow border-0">
          <div className="card-body">
            <Outlet />
          </div>
        </div>

      </div>
    </>
  );
}
// import { NavLink, Outlet } from "react-router-dom"
// export default function () {
//     return (
//         <>
//             <h2>Admin Panel</h2>
//             <div className="d-flex">

//                 <ul className="nav nav-pills flex-column p-3 border-end">
//                     <li className="nav-item">
//                         <NavLink to="users">Users</NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to="reports">Reports</NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to="logout">Logout</NavLink>
//                     </li>
//                 </ul>

//                 <div className="p-3 flex-grow-1">
//                     <Outlet />
//                 </div>
//             </div>


//         </>
//     )
// }