import React, { useState, useContext, useEffect } from "react";
import './Course.css';
import Addcourse from './addcourse/Addcourse';
import Updatecourse from './updatecourse/Updatecourse';
import Deletecourse from './deletecourse/Deletecourse';
import AuthContext from '../../services/AuthContext';


function Course() {
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [updatePopupVisible, setUpdatePopupVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  
  const { getData } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [value, setValue] = useState(null); // State for storing value
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("fetch_course_datail");
        if (Array.isArray(data)) {
          setCourses(data);
         
        } else {
          console.error('getData did not return an array:', data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [getData]);

  function toggleAddPopup() {
    setAddPopupVisible(!addPopupVisible);
  }

  function toggleUpdatePopup() {
    setUpdatePopupVisible(!updatePopupVisible);
  }

  function toggleDeletePopup() {
    setDeletePopupVisible(!deletePopupVisible);
  }

  // Pagination handlers
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  // Calculate courses to display based on current page
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle click on "Edit" button
  const handleDetele = (courseId) => {

    setValue(courseId); 
    toggleDeletePopup();
  };
  const handleUpdate = (coursedetail) =>{

    setValue(coursedetail);
    toggleUpdatePopup();
  }
  return (
    
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-semibold py-3 mb-4">Course </h4>
        <div className="card mb-4">
          <div className="card">
            <div className="card-header">
              <h1>Course</h1> 
              <button onClick={toggleAddPopup} className="btn rounded-pill btn-outline-primary">
                <span className="tf-icons bx bxs-file-plus bx-burst"></span>&nbsp; Add Course
              </button>
              {addPopupVisible && <Addcourse toggle={toggleAddPopup} />}
            </div>
            <div className="table-responsive text-nowrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Course name</th>
                    <th>Course Fees</th>
                    <th>Course Date</th>
                    <th>Course Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {currentCourses.map((course, index) => (
                    <tr key={index}>
                      <td>{course.Course_id}</td>
                      <td>{course.Course_name}</td>
                      <td>{course.Course_Fees}</td>
                      <td>{new Date(course.Course_Create_date).toLocaleString()}</td>
                      
                      <td>
                        {course.Course_Status === "Active" ? (
                          <span className="badge bg-label-primary me-1">{course.Course_Status}</span>
                        ) : (
                          <span className="badge bg-label-warning me-1">{course.Course_Status}</span>
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleUpdate(course)} className="btn rounded-pill btn-icon btn-outline-success">
                          <span className="tf-icons bx bxs-edit bx-tada"></span>
                        </button>  
                        {updatePopupVisible && <Updatecourse toggle={toggleUpdatePopup} data={value} />}
                      </td>
                      <td>
                        <button onClick={() => handleDetele(course.Course_id)} className="btn rounded-pill btn-icon btn-outline-danger">
                          <span className="tf-icons bx bx-trash bx-tada"></span>
                        </button>
                        {deletePopupVisible && <Deletecourse toggle={toggleDeletePopup} data={value}   />}
                      </td>
                    </tr>
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
                          <button className="page-link" onClick={nextPage} disabled={indexOfLastItem >= courses.length}>
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
      </div>
   
  );
}

export default Course;
