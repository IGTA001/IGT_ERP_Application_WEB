import React, { useContext} from "react";
import './updatecourse.css';
import AuthContext from "../../../services/AuthContext";


const Updatecourse = (props) => {
    const { update } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const courseData = {
            "Course_id" : e?.target.Course_id.value,
            "Course_name" : e?.target.Course_name.value,
            "Course_Fees" : e?.target.Course_Fees.value,
            "Course_Status" : e?.target.Course_Status.value
        };

        console.log(courseData);
        try {
            await update(courseData,'update_course_datail','/course');
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
                        <div className="me-auto card-header "> <h1>Update Course </h1></div>
                        <button type="button" className="btn-close" onClick={props.toggle} data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        <form onSubmit={handleSubmit}>
                                <input type="hidden"name="Course_id" defaultValue={props.data.Course_id}/>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="Course_name" className="form-label">Course Name</label>
                                        <input
                                            type="text"
                                            defaultValue={props.data.Course_name}
                                            className="form-control"
                                            name="Course_name"
                                            id="Course_name"
                                            placeholder="Enter Course Name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Course_Fees" className="form-label">Course Fees</label>
                                        <input
                                            type="text"
                                            defaultValue={props.data.Course_Fees}
                                            className="form-control"
                                            id="Course_Fees"
                                            name="Course_Fees"
                                            placeholder="Enter Course Fees"
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="Course_Status" className="form-label">Course Status</label>
                                        <select id="Course_Status" name="Course_Status" className="form-select" defaultValue={props.data.Course_Status}>
                                            <option disabled>Select Course Status</option>
                                            <option value="Active">Active</option>
                                            <option value="Deactive">Deactive</option>
                                        </select>

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

export default Updatecourse;
