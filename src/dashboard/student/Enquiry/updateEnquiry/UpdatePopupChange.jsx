import React, { useContext, useState } from "react";
import AuthContext from "../../../../services/AuthContext";
import './UpdateEnquiry.css';

const UpdatePopupChange = (props) => {
    const { update } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const enquiryId = e?.target.Enquiry_id.value;
        const status = e?.target.status.value;
        
        if (!enquiryId || !status) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const courseData = {
            'Enquiry_id': enquiryId,
            'status': status
        };

        try {
            await update(courseData, 'update_enquiry_registration', '/student/Enquiry');
            props.toggle();
            setErrorMessage('');
        } catch (error) {
            console.error('Failed to update registration:', error);
            setErrorMessage('Failed to update registration. Please try again.');
        }
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="bs-toast toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <div className="me-auto card-header">
                            <h3>Change Registration</h3>
                        </div>
                        
                        <button type="button" className="btn-close" onClick={props.toggle} data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                    <h5>
                        Are you sure you <br/> want to change Registration?
                    </h5>
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                
                                <div className="mb-3">
                                    <input
                                        type="hidden"
                                        name="Enquiry_id"
                                        className="form-control"
                                        id="Enquiry_id"
                                        defaultValue={props.data.Enquiry_id}
                                        placeholder="Enter Course Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="hidden"
                                        name="status"
                                        className="form-control"
                                        id="status"
                                        value="Registration"
                                        placeholder="Enter Course Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn rounded-pill btn-outline-primary">Change Registration</button>
                                </div>
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePopupChange;
