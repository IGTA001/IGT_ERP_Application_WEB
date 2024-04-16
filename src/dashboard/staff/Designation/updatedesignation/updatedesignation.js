import React, { useContext} from "react";
import './updatedesignation.css';
import AuthContext from "../../../../services/AuthContext";


const Updatedesignation = (props) => {
    const { update } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const designationData = {
            "Designation_id" : e?.target.designation_id.value,
            "Designation_name" : e?.target.designation_name.value,
    
        };

        console.log(designationData);
        try {
            await update(designationData,'update_Designation_detail','/staff/Designation');
            props.toggle();
        } catch (error) {
            console.error('Update operation failed:', error);
        }
    };

    return (
        <div className="popup">
         
            <div className="popup-inner">
                <div className="bs-toast toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <div className="me-auto card-header "> <h1>Update designation </h1></div>
                        <button type="button" className="btn-close" onClick={props.toggle} data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        <form onSubmit={handleSubmit}>
                                <input type="hidden"name="designation_id" defaultValue={props.data.Designation_id}/>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="designation_name" className="form-label">designation Name</label>
                                        <input
                                            type="text"
                                            defaultValue={props.data.Designation_name}
                                            className="form-control"
                                            name="designation_name"
                                            id="designation_name"
                                            placeholder="Enter Designation Name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn rounded-pill btn-outline-success">Submit</button>
                                    </div>
                                </div>
                       
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Updatedesignation;
