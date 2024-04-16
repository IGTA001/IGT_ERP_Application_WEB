import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../../services/AuthContext';
import DeleteEnquiry from './deteleEnquiry/DeleteEnquiry';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UpdatePopupChange from './updateEnquiry/UpdatePopupChange';

function Enquiry() {
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [updatePopupVisible, setUpdatePopupVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const { getData,Fetch } = useContext(AuthContext);
  const [enquirys, setenquirys] = useState([]);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  function toggleUpdatePopup() {
    setUpdatePopupVisible(!updatePopupVisible);
  }

  const handleClick = async (id) => {
    try {
      // Assign the id to enquiryId
      const enquiryId = id;
  
      // Define the request body for fetching qualification details
      const getQualification = {
        Qualification_code: enquiryId.Qualification_code
      };
  
      // Fetch qualification details
      const qualificationDetail = await Fetch(getQualification, "get_Student_Qualification_datail");
  
      // Validate qualificationDetail and extract the first element if it's an array
      const qualificationDetailValue = Array.isArray(qualificationDetail) && qualificationDetail.length > 0 ? qualificationDetail[0] : null;
  
      // Define state object with enquiryId and qualificationDetailValue.Qualification_name
      const state = { enquiryId, qualificationDetail: qualificationDetailValue.Qualification_name };
  
  
      // Navigate to the updateEnquiry path with state
      navigate('/student/Enquiry/updateEnquiry', { state });
  
    } catch (error) {
      // Handle any errors that occur during the async operations
      console.error("Error in handleClick:", error);
      // Optionally, you can notify the user about the error
      alert("An error occurred while processing your request. Please try again.");
    }
  };
  


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

  const toggleDeletePopup = () => {
    setDeletePopupVisible(!deletePopupVisible);
  };

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = enquirys.slice(indexOfFirstItem, indexOfLastItem);

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
      <h4 className="fw-semibold py-3 mb-4">Enquiry </h4>
      <div className="card mb-4">
        <div className="card-header">
          <h1>Enquiry</h1>
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
                <th>Change Registration</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {currentCourses.map((enquiry, index) => (
                 enquiry.status === "Enquiry" ? (
                <tr key={index}>
                  <td>{enquiry.Enquiry_id}</td>
                  <td>{enquiry.Student_name}</td>
                  <td>{new Date(enquiry.Enquiry_date).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                  <td>{enquiry.Phone_number}</td>
                  <td>{enquiry.Course_name}</td>
                  <td>{enquiry.Total_course_fee}</td>
                  <td>{enquiry.Counsellor_name}</td>
                  <td>
                    <button onClick={() => handleUpdate(enquiry)} className="btn rounded-pill btn-icon btn-outline-success custom-edit-link" >
                    <span className="tf-icons bx bxs-comment-check bx-tada"></span>
                    
                    </button>
                    {updatePopupVisible && <UpdatePopupChange toggle={toggleUpdatePopup} data={value} />}
                  </td>
                  <td>
                    <button
                      onClick={() => handleClick(enquiry)}
                      
                      className="btn rounded-pill btn-icon btn-outline-success custom-edit-link"
                    >
                      <span className="tf-icons bx bxs-edit bx-tada"></span>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDetele(enquiry.Enquiry_id)} className="btn rounded-pill btn-icon btn-outline-danger">
                      <span className="tf-icons bx bx-trash bx-tada"></span>
                    </button>
                    {deletePopupVisible && <DeleteEnquiry toggle={toggleDeletePopup} data={value} />}
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

export default Enquiry;
