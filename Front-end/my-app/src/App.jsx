import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import LoginComp from './components/HomePage/LoginComp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeComp from './components/HomePage/HomeComp'
import ProtectedRoute from './components/ProtectedRoutes'
import TenantDashboard from './components/Tenant/TenantDashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import LogoutComp from './components/LogoutComp'

import BrowseProperties from './components/Tenant/BrowseProperties'
import ManageProfile from './components/Tenant/ManageProfile'
import BookProperty from './components/Tenant/BookProperty'
import ViewTokenPayments from './components/Tenant/ViewTokenPayment'
import LandlordDashboard from './components/Landlord/LandlordDashboard'
import FirstPage from './components/Tenant/FirstPage'

import Homepage from './components/HomePage/Homepage'
import RegisterComp from './components/HomePage/RegisterComp'
import LandlordRequests from './components/Admin/LandlordRequest'


function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComp />} />
          {/* <Route path="/homepage" element={<Homepage />} /> */}
          <Route path="login" element={<LoginComp />} />
          <Route path="register" element={<RegisterComp />} />
          
          {/* </Route> */}
          {/* role id of user is 1 */}


          {/* Admin dashboard */}
          <Route path="/admin" element={<ProtectedRoute role={1}><AdminDashboard /></ProtectedRoute>}>

            <Route path="users" element={<h1> Users</h1>} />
            <Route path="reports" element={<h1> Reports</h1>} />
            <Route path="landlords" element={<LandlordRequests />}
            />
            <Route path="logout" element={<LogoutComp />} />

          </Route>

          {/* Tenant Dashboard NOTE: MANAGE EXPRESS.JS, ADD TABLES */}
          <Route path="/user" element={<ProtectedRoute role={2}><TenantDashboard /></ProtectedRoute>}>

            <Route index element={<FirstPage />} />
            <Route path="home" element={<FirstPage />} />
            <Route
              path="search"
              element={<BrowseProperties />}
            />
            <Route
              path="booking"
              element={<BookProperty />}
            />
            <Route
              path="manageprofile"
              element={<ManageProfile />}
            />
            <Route
              path="viewhistory"
              element={<ViewTokenPayments />}
            />
            <Route
              path="logout"
              element={<LogoutComp />}
            />
          </Route>
          {/* <Route path="search" element={<BrowseProperties />} />
            <Route path="ManageProfile" element={<ManageProfile />} />
            <Route path="booking" element={<BookProperty />} />
            <Route path="viewhistory" element={<ViewTokenPayments />} />
            <Route path="logout" element={<LogoutComp />} /> */}
          {/* </Route> */}

          {/* Landlord Dashboard NOTE:MANGE EXPRESS.JS AND REFRESH COMPONENTS, ADD TABLES*/}
          <Route path="/landlord" element={<ProtectedRoute role={3}><LandlordDashboard /></ProtectedRoute>}>
            <Route path="Add property" element={<h1> Users</h1>} />
            <Route path="reports" element={<h1> Reports</h1>} />
            <Route path="logout" element={<LogoutComp />} />
          </Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
