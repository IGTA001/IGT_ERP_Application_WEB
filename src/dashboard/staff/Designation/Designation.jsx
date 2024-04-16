import React, { useState, useContext, useEffect } from "react";
import './designation.css';
import Adddesignation from './Adddesignation/Adddesignation';
import AuthContext from "../../../services/AuthContext";
import Deletedesignation from './deletedesignation/deletedesignation';
import Updatedesignation from "./updatedesignation/updatedesignation";

function Designation() {
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [updatePopupVisible, setUpdatePopupVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // Current page state

  const { getData } = useContext(AuthContext);

  const [designations, setdesignations] = useState([]);
  const [value, setValue] = useState(null); // State for storing value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("fetch_Designation_detail");
        if (Array.isArray(data)) {
          setdesignations(data);
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

  // Calculate designations to display based on current page
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentdesignations = designations.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle click on "Edit" button
  const handleDetele = (designationId) => {

    setValue(designationId); 
    toggleDeletePopup();
  };
  const handleUpdate = (designationdetail) =>{

    setValue(designationdetail);
    toggleUpdatePopup();
  }
  return (
    
      <div className="container-xxl flex-grow-1 container-p-y">
        
        <h4 className="fw-semibold py-3 mb-4">Designation </h4>
        <div className="card mb-4">
          <div className="card">
            <div className="card-header">
              <h1>Designation</h1> 
              <button onClick={toggleAddPopup} className="btn rounded-pill btn-outline-primary">
                <span className="tf-icons bx bxs-file-plus bx-burst"></span>&nbsp; Add Designation
              </button>
              {addPopupVisible && <Adddesignation toggle={toggleAddPopup} />}
            </div>
            <div className="table-responsive text-nowrap">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Designation name</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {currentdesignations.map((designation, index) => (
                    <tr key={index}>
                      <td>{designation.Designation_id}</td>
                      <td>{designation.Designation_name}</td>
                    
                      <td>
                        <button onClick={() => handleUpdate(designation)} className="btn rounded-pill btn-icon btn-outline-success">
                          <span className="tf-icons bx bxs-edit bx-tada"></span>
                        </button>  
                        {updatePopupVisible && <Updatedesignation toggle={toggleUpdatePopup} data={value} />}
                      </td>
                      <td>
                        <button onClick={() => handleDetele(designation.Designation_id)} className="btn rounded-pill btn-icon btn-outline-danger">
                          <span className="tf-icons bx bx-trash bx-tada"></span>
                        </button>
                        {deletePopupVisible && <Deletedesignation toggle={toggleDeletePopup} data={value}   />}
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
                          <button className="page-link" onClick={nextPage} disabled={indexOfLastItem >= designations.length}>
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

export default Designation;
