import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import PrivateRoute from './services/PrivateRoute'
import Dashboard from './dashboard/Dashboard';
import Course from './dashboard/course/Course';
import Sidebar from './dashboard/sidebar/Sidebar';
import Login from './authentication/Login';
import Enquiry from './dashboard/student/Enquiry/Enquiry';
import Navbar from './dashboard/sidebar/Navbar';
import AddEnquiry from './dashboard/student/Enquiry/addEnquiry/AddEnquiry';
import UpdateEnquiry from './dashboard/student/Enquiry/updateEnquiry/UpdateEnquiry';
import Designation from './dashboard/staff/Designation/Designation'
import Registration from './dashboard/student/Registration/Registration';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="light-style layout-menu-fixed">
          <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/*" element={<ProtectedRoutes />} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

function ProtectedRoutes() {
  return (
    <>
    
      <Sidebar />
      <div className="layout-page">
      <Navbar />
      <div className="content-wrapper">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course" element={<Course />} />
          <Route path='/student/*' element={<StudentRoutes/>} />
          <Route path='/staff/*' element={<StaffRoutes/>} />
        </Route>
      </Routes>
      </div>
      </div>
    </>
  );
}
function StudentRoutes() {
  return(
    <>
    <Routes>
      <Route path='/Enquiry' element={<Enquiry/>} />
      <Route path='/Enquiry/addEnquiry' element={<AddEnquiry/>}/>
      <Route path='/Enquiry/updateEnquiry' element={<UpdateEnquiry/>}/>
      <Route path='/Registration' element={<Registration/>}/>
    </Routes>
    </>
  );
}

function StaffRoutes() {
    return(
      <>
        <Routes>
            <Route path='/Designation' element={<Designation/>} />
        </Routes>
      </>
    )
}

export default App;
