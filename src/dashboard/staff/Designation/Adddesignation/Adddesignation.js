import React, { useContext } from "react";
import AuthContext from "../../../../services/AuthContext";
import './adddesignation.css';

const AddDesignation = (props) => {
    const { insert } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const designationData = {
            'Designation_name': e?.target.designation_name.value,
            
        };
       
        console.log(designationData);
        
        try {
            await insert(designationData,'Designation_create','/staff/Designation');
            props.toggle();
           
        } catch (error) {
            console.error('Failed to insert designation:', error);
        }
    };


    return (
        <div className="popup">
          
            <div className="popup-inner">
                <div className="bs-toast toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <div className="me-auto card-header "> <h1>Add designation </h1></div>
                        <button type="button" className="btn-close" onClick={props.toggle} data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="designation_name" className="form-label">Designation Name</label>
                                    <input
                                        type="text"
                                        name="designation_name"
                                        className="form-control"
                                        id="designation_name"
                                        placeholder="Enter Designation Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn rounded-pill btn-outline-primary">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDesignation;