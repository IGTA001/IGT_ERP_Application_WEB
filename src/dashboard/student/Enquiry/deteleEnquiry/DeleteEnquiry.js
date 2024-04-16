import React, { useContext} from "react";
import AuthContext from "../../../../services/AuthContext";
import './DeleteEnquiry.css'

const DeleteEnquiry = (props) => {
  const { Delete } = useContext(AuthContext);

  const handleSubmit = async () => {

   
    try {
      if (props.data && props.data) { 
        const EnquiryData = {
            "Enquiry_id" :  props.data,
        };
      
        await Delete(EnquiryData,"delete_enquiry_datail",'/student/Enquiry');
        props.toggle();
      } else {
        throw new Error('Missing or invalid data for deletion');
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
    }
  };


  return (
    <div className="popup">
     
      <div className="popup-inner">
        <div className="bs-toast toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
          
            <div className="me-auto card-header ">
              <h3>
                Warning Message
              </h3>
            </div>
            <button type="button" className="btn-close" onClick={props.toggle} data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            <h5>
              Are you sure you want to delete?
            </h5>
            <div>
              <button type="button" onClick={handleSubmit} className="btn rounded-pill btn-outline-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEnquiry;
