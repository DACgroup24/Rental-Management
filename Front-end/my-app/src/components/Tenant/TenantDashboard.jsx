import { NavLink, Outlet } from "react-router-dom"
import FirstPage from "./FirstPage"
export default function TenantDashboard(){
    return(
        <>
         {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <div className="container-fluid">

          <NavLink className="navbar-brand fw-bold" to="">
            Rental Hub
          </NavLink>

          {/* Search Bar */}
          <form className="d-flex mx-auto w-50">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search properties..."
            />
            <li className="nav-item mb-2">
              {/* <NavLink className="nav-link" to="search">
                Search Property
              </NavLink> onClick={Search()*/}
            </li>
            <button className="btn btn-light" >
              Search
            </button>
          </form>

          {/* Logout */}
          <NavLink
            to="/"
            className="btn btn-danger"
          >
            Logout
          </NavLink>

        </div>
      </nav>

      <div className="d-flex">

        {/* Sidebar */}
        <div
          className="bg-light border-end"
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <ul className="nav flex-column p-3">

            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="">
                Home
              </NavLink>
            </li>

       

            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="booking">
                Book Property
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="manageprofile">
                Manage Profile
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink className="nav-link" to="viewhistory">
                Rental History
              </NavLink>
            </li>

          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
     
          <Outlet />
        </div>

      </div>
      
        </>
    )

}