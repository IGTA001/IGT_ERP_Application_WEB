import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../services/AuthContext';

import { Link } from 'react-router-dom';


function Registration() {
  const [currentPage, setCurrentPage] = useState(1);
  const { getData } = useContext(AuthContext);
  const [enquirys, setenquirys] = useState([]);
 

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enquiry = await getData("fetch_enquiry_datail");
        if (Array.isArray(enquiry)) {
          setenquirys(enquiry);
        } else {
          console.error('getData did not return an array:', enquiry);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [getData]);



  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = enquirys.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-semibold py-3 mb-4">Registration </h4>
      <div className="card mb-4">
        <div className="card-header">
          <h1>Registration</h1>
          <Link to={{ pathname: "/student/Enquiry/addEnquiry" }} className="btn rounded-pill btn-outline-primary">
            <span className="tf-icons bx bxs-file-plus bx-burst"></span>&nbsp; Create Enquiry
          </Link>
        </div>
        <div className="table-responsive text-nowrap">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Student name</th>
                <th>Enquiry Date</th>
                <th>Phone number</th>
                <th>Course name</th>
                <th>Course fee</th>
                <th>Counsellor name</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
            {currentCourses.map((enquiry) => (
                  enquiry.status === "Registration" ? (
                    <tr key={enquiry.Enquiry_id}>
                      <td>{enquiry.Enquiry_id}</td>
                      <td>{enquiry.Student_name}</td>
                      <td>{new Date(enquiry.Enquiry_date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                      <td>{enquiry.Phone_number}</td>
                      <td>{enquiry.Course_name}</td>
                      <td>{enquiry.Course_fee}</td>
                      <td>{enquiry.Counsellor_name}</td>
                     
                      <td>
                        <button className="btn rounded-pill btn-icon btn-outline-success custom-edit-link">
                          <span className="tf-icons bx bxs-edit bx-tada"></span>
                        </button>
                      </td>
                      <td>
                        <button className="btn rounded-pill btn-icon btn-outline-danger">
                          <span className="tf-icons bx bx-trash bx-tada"></span>
                        </button>
                      </td>
                    </tr>
                  ) : null
                ))}


            </tbody>
          </table>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <div className="demo-inline-spacing">
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li className="page-item">
                      <button className="page-link" onClick={prevPage} disabled={currentPage === 1}>
                        <i className="tf-icon bx bx-chevrons-left"></i>previous
                      </button>
                    </li>
                    <li className="page-item">
                      <button className="page-link" onClick={nextPage} disabled={indexOfLastItem >= enquirys.length}>
                        next<i className="tf-icon bx bx-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
