import React, { useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './UpdateEnquiry.css';

import AuthContext from "../../../../services/AuthContext";
import userAvatar from '../../../../assets/img/avatars/1.png';

const UpdateEnquiry = (props) => {
    const [step, setStep] = useState(1);
   
    const { getData,Fetch,update } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [Designations, setDesignations] = useState([]);
    const [courses_Detail, setCourses_Detail] = useState([]);
    

    const location = useLocation();


    let Enquiry_data = location.state ? location.state.enquiryId : null;
    let Qualification_detail = location.state ?location.state.qualificationDetail : null;
    
    


    useEffect(() => {
      const fetchData = async () => {
       
       
        try {
          // Fetching data
          const course = await getData("fetch_course_datail");
          const Designation = await getData("fetch_Designation_detail");
          
          
          // Updating state
          if (Array.isArray(course) && Array.isArray(Designation)) {
            setCourses(course);
            setDesignations(Designation);
          } else {
            console.error('getData did not return an array:', course);
            console.error('getData did not return an array:', Designation);
          }
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
      
      fetchData();
    }, [getData, Fetch, Enquiry_data.Qualification_code]); // Added Enquiry_data.Qualification_code to the dependency array
    
    console.log(Qualification_detail);
    
    const [course_fees,setcourse_fees] = useState(Enquiry_data.Course_fee);
    const [Discounts,setDiscounts] = useState(Enquiry_data.Discount_fee)
    const [Total_fee,setTotal_fee] = useState(Enquiry_data.Total_course_fee)

    const [formData, setFormData] = useState({
      Enquiry_id : Enquiry_data.Enquiry_id,
      Enquiry_date : Enquiry_data.Enquiry_date,
      First_name : Enquiry_data.Student_name.split(" ")[0],
      last_name: Enquiry_data.Student_name.split(" ")[1],
      Date_Birth : Enquiry_data.Date_birth,
      Gender : Enquiry_data.Gender,
      Blood_Group :Enquiry_data.Blood_group,
      Marital_status : Enquiry_data.Marital_status,
      Phone_number:Enquiry_data.Phone_number,
      Email:Enquiry_data.Email,
      Father_name: Enquiry_data.Father_name,
      ADDRESS: Enquiry_data.Address,
      City: Enquiry_data.City,
      state:Enquiry_data.State,
      zipCode:Enquiry_data.zipCode,

      Institute_class_10: Qualification_detail.Class_10_Institute,
      Mark_class_10: Qualification_detail.Class_10_Mark,
      Passout_class_10: Qualification_detail.Class_10_Passout,
      Institute_class_12: Qualification_detail.Class_12_Institute,
      Mark_class_12: Qualification_detail.Class_12_Mark,
      Passout_class_12: Qualification_detail.Class_12_Passout,
      Institute_UG: Qualification_detail.PG_Institute,
      Mark_UG: Qualification_detail.PG_Mark,
      Passout_UG: Qualification_detail.PG_Passout,
      Institute_PG: Qualification_detail.UG_Institute,
      Mark_PG: Qualification_detail.UG_Mark,
      Passout_PG: Qualification_detail.UG_Passout,

      // course fee
      // Designation_name:Enquiry_data.Designation_name,
      Counsellor_name:Enquiry_data.Counsellor_name,
      Reference_name:Enquiry_data.Reference_name,
      Course_name:Enquiry_data.Course_name,
      Course_Fees:course_fees,
      Discount:Enquiry_data.Discount,
      Discount_value:Discounts,
      Total_value:Total_fee
    });
console.log(formData)

const [experience, setExperience] = useState([
  { id: 1, company: '', designation: '', years: '' }
  ]);     
  console.log(formData);


// Function to add a new row to the experience table
const addExperienceRow = () => {
    const newExperience = {
        id: experience.length + 1,
        company: '',
        designation: '',
        years: ''
    };
    setExperience([...experience, newExperience]);
};

const deleteExperienceRow = (index) => {
  const updatedExperience = [...experience];
  updatedExperience.splice(index, 1);
  setExperience(updatedExperience);
};

    const handlesubmit = async(e) =>{
      try {
     
        // await update(Student,'update_enquiry_datail','/student/Enquiry');
        // await update(Qualification,'update_Student_Qualification_datail','/student/Enquiry')
       
    } catch (error) {
        console.error('Failed to insert course:', error);
    }

    }
  

   
    

    const onClick_Course = async (courseId,fee) => {
      // Handle onClick logic here
      // console.log(courseId);
      try {
        const Get_course = {
          "Course_id":courseId
        }
       

        const course_detail = await Fetch(Get_course,"get_course_datail");
        
        if (Array.isArray(course_detail)) {
          setCourses_Detail(course_detail);
        
          setcourse_fees(fee);
          
         
        } else {
          console.error('getData did not return an array:', course_detail);
          
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    const onClick_Discount = (Discount,Course_Fees) =>{
      const value = Course_Fees*Discount/100
      setDiscounts(value)
      
      Total_fee_amount(value,Course_Fees)
      
    }

    const Total_fee_amount = (Discount_Fees,Course_Fees) =>{
      const value = Course_Fees - Discount_Fees;
      setTotal_fee(value)
      // console.log(value)
    }


    
    

    const Student = {
        "Enquiry_id" : formData.Enquiry_id,
        "Enquiry_date":formData.Enquiry_date,
        "Student_name":formData.First_name + " " + formData.last_name,
        "Father_name" : formData.Father_name,
        "Date_birth" : formData.Date_Birth ,
        "Gender" : formData.Gender,
        "Blood_group" : formData.Blood_Group,
        "Address":formData.ADDRESS,
        "City" : formData.City,
        "State" : formData.state,
        "zipCode": formData.zipCode,
        "Phone_number" : formData.Phone_number,
        "Email" : formData.Email,
        "Marital_status" : formData.Marital_status,

        "Counsellor_name": formData.Counsellor_name,
        "Reference_name" : formData.Reference_name,
        "Course_name" : formData.Course_name,
        "Course_fee" :course_fees,
        "Discount" : formData.Discount,
        "Discount_fee" : Discounts,
        "Total_course_fee":Total_fee
    }


    const Qualification = {
      "Qualification_code":Enquiry_data.Qualification_code,
      "Student_name" : formData.First_name + " " + formData.last_name,
      "Qualification_name" : {
      
        
        "Class_10_Institute":formData.Institute_class_10,
        "Class_10_Mark":formData.Mark_class_10,
        "Class_10_Passout":formData.Passout_class_10,
      
        
        "Class_12_Institute":formData.Institute_class_12,
        "Class_12_Mark":formData.Mark_class_12,
        "Class_12_Passout":formData.Passout_class_12,

        "UG_Institute":formData.Institute_UG,
        "UG_Mark":formData.Mark_UG,
        "UG_Passout":formData.Passout_UG,
        
        "PG_Institute":formData.Institute_PG,
        "PG_Mark":formData.Mark_PG,
        "PG_Passout":formData.Passout_PG,
      }
    }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };

    const handleSubmit = (e) => {
          e.preventDefault();
        
        if (step < 5) {
            setStep(step + 1);
            
        } 
         else {
          
            props.onSubmit(formData);
        }
    };
    
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <section>
                       <ul className="nav nav-pills flex-column flex-md-row mb-3">
                            <li className="nav-item">
                                <i className="nav-link active"><i className='bx bx-user-circle bx-tada me-1' ></i>Student Details</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bxs-book-content me-1"></i>Qualification Details</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bxs-book-content me-1"></i> Experiance</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bx-collection  me-1"></i>Course Details</i>
                            </li>
                        </ul>
                        <div className=" mb-2">
                    <h5 className="card-header">Student Details</h5>
                   
                    <div className="card-body mb-0">
                    
                      
                      <div className="row">
                        <div className="mb-1 col-md-2">
                        <img
                          src={userAvatar}
                          alt="user-avatar"
                          className="d-block rounded"
                          height="80"

                          id="uploadedAvatar"
                        />
                        </div>
                        <div className="mb-1 col-md-4 me-5">
                        <label htmlFor="upload" className="btn btn-primary me-5 mb-4" tabIndex="0">
                            <span className="d-none d-sm-block">Upload new photo</span>
                            <i className="bx bx-upload d-block d-sm-none"></i>
                            <input
                              type="file"
                              id="upload"
                              className="account-file-input"
                              hidden
                              accept="image/png, image/jpeg"
                            />
                          </label>
                        </div>
                        <div className="mb-1 col-md-3">
                        <label htmlFor="Enquiry_id" className="form-label">Enquiry Id</label>
                            <input className="form-control" type="text"   name="Enquiry_id" id="Enquiry_id" placeholder="Enter Enquiry Id" value={formData.Enquiry_id}  onChange={handleInputChange}/>
                        </div>
                        <div className="mb-1 col-md-2">
                        <label htmlFor="Enquiry_date" className="form-label">Enquiry Date</label>
                        <input
                              type="date"
                              id="Enquiry_date"
                              name="Enquiry_date"
                              value={formData.Enquiry_date}
                              className="form-control"
                              onChange={handleInputChange}
                            />
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <hr className="my-0" />
                    <div className="card-body">
                  
                        <div className="row">
                        <div className="mb-4 col-md-2">
                            <label htmlFor="Title" className="form-label">title</label>
                            <select className="form-select" name="Title" id="Title"defaultValue="Select Title"   aria-label="Default select example">
                                <option value="">Select Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                                <option value="Mrs">Mrs</option>
                            </select>
                          </div>
                          <div className="mb-3 col-md-5">
                            <label htmlFor="First_name" className="form-label">First Name</label>
                            <input
                              className="form-control"
                              type="text"
                              id="First_name"
                              name="First_name"
                              placeholder="Enter First Name"
                              value={formData.First_name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3 col-md-5">
                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input className="form-control" type="text"   name="last_name" id="last_name" placeholder="Enter Last Name" value={formData.last_name} onChange={handleInputChange}  />
                          </div>
                          <div className="mb-4 col-md-4">
                            <label htmlFor="Phone_number" className="form-label">Phone Number</label>
                            <input className="form-control"  type="text" name="Phone_number" id="Phone_number" value={formData.Phone_number} onChange={handleInputChange} placeholder="Enter Phone Number" />
                          </div>
                          <div className="mb-4 col-md-4">
                            <label htmlFor="Email" className="form-label">Email </label>
                            <input className="form-control" type="text" name="Email" id="Email" value={formData.Email} onChange={handleInputChange} placeholder="Enter Email" />
                          </div>
                          <div className="mb-4 col-md-4">
                            <label htmlFor="Father_name" className="form-label">Father Name</label>
                            <input className="form-control"  type="text" name="Father_name" id="Father_name" value={formData.Father_name}onChange={handleInputChange} placeholder="Enter Father Name" />
                          </div>
                          
                          </div>
        </div>
        <div className="col-xl-12">
          <div className="card-body">
            <div className="mb-3 row">
              <div className="mb-4 col-md-5 ms-5"> 
                <div className="mb-4 col-md-10">
                            <label htmlFor="Date_Birth" className="form-label">Date Birth</label>
                            <input 
                                className="form-control" 
                                type="date" 
                                
                                id="Date_Birth" 
                                name="Date_Birth"
                                value={formData.Date_Birth}
                                onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-4 col-md-10">
                            <label htmlFor="Gender" className="form-label">Gender</label>
                            <select className="form-select"  id="Gender" name="Gender" defaultValue={formData.Gender} onChange={handleInputChange} aria-label="Default select example">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                          </div>
                          <div className="mb-4 col-md-10">
                            <label htmlFor="Blood_Group"  className="form-label">Blood Group</label>
                            <input className="form-control" type="text" name="Blood_Group" id="Blood_Group" value={formData.Blood_Group} onChange={handleInputChange} placeholder="Blood Group" />
                          </div>
                          <div className="mb-4 col-md-10">
                            <label htmlFor="Marital_status" className="form-label">Marital status</label>
                            <select className="form-select"  id="Marital_status" name="Marital_status" defaultValue={formData.Marital_status} onChange={handleInputChange} aria-label="Default select example">
                                <option value="">Select Marital status </option>
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                            </select>
                          </div>
                          </div>

                          

                          <div className="mb-4 col-md-6"> 
                <div className="mb-4 col-md-10">
                            <label htmlFor="ADDRESS" className="form-label">ADDRESS</label>
                            <input className="form-control"  type="text" id="ADDRESS" name="ADDRESS" value={formData.ADDRESS}onChange={handleInputChange} placeholder="Enter ADDRESS" />
                          </div>

                          <div className="mb-4 col-md-">
                            <label htmlFor="City" className="form-label">City</label>
                            <input className="form-control"  type="text" id="City" name="City"value={formData.City}onChange={handleInputChange} placeholder="Enter City" />
                          </div>

                          <div className="mb-4 col-md-10">
                            <label htmlFor="state" className="form-label">State</label>
                            <input className="form-control"  type="text" id="state" name="state" value={formData.state}onChange={handleInputChange} placeholder="Enter state" />
                          </div>
                          
                          <div className="mb-4 col-md-10">
                            <label htmlFor="zipCode" className="form-label">Zip Code</label>
                            <input
                              type="text"
                              className="form-control"
                              id="zipCode"
                              name="zipCode"
                              placeholder="231465"
                              maxLength="6"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                       </div>
                      </div>
                     </div>
                    </div>
                   </section>
                );
            case 2:
                return (
                    <section>
                        <ul className="nav nav-pills flex-column flex-md-row mb-4">
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bx-user-circle me-1"></i>Student Details</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link active"><i className='bx bxs-book-content bx-tada me-1' ></i>Qualification Details</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bxs-book-content me-1"></i> Experiance</i>
                            </li>
                            
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bx-collection me-1"></i> Course Details</i>
                            </li>
                        </ul>
                        <div className="mb-4">
                 
                    <h5 className="card-header">Qualification Details</h5>
                    <div className="card-body">
                      
                      <div className="error"></div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-striped table-borderless border-bottom">
                        <thead>
                          <tr>
                            <th className="text-nowrap">Qualification</th>
                            <th className="text-nowrap text-center">Institute</th>
                            <th className="text-nowrap text-center">Mark</th>
                            <th className="text-nowrap text-center">Passout</th>

                          </tr>
                        </thead>
                       
                        <tbody >
                         
                            
                          <tr>
                            <td className="text-nowrap">Class 10</td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Institute_class_10" name="Institute_class_10"onChange={handleInputChange} value={formData.Institute_class_10}  />
                              </div>
                            </td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Mark_class_10" name="Mark_class_10" onChange={handleInputChange}  value={formData.Mark_class_10}  />
                              </div>
                            </td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Passout_class_10" name="Passout_class_10" onChange={handleInputChange}  value={formData.Passout_class_10}  />
                              </div>
                            </td>
                         
                          </tr>
                          <tr>
                            <td className="text-nowrap">Class 12</td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Institute_class_12" name="Institute_class_12"onChange={handleInputChange} value={formData.Institute_class_12}  />
                              </div>
                            </td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Mark_class_12" name="Mark_class_12"onChange={handleInputChange}  value={formData.Mark_class_12} />
                              </div>
                            </td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Passout_class_12" name="Passout_class_12"value={formData.Passout_class_12} onChange={handleInputChange}  />
                              </div>
                            </td>
                           
                          </tr>
                          <tr>
                            <td className="text-nowrap">UG</td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Institute_UG" name="Institute_UG" onChange={handleInputChange}  value={formData.Institute_UG} />
                              </div>
                            </td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Mark_UG" name="Mark_UG"  onChange={handleInputChange}value={formData.Mark_UG} />
                              </div>
                            </td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Passout_UG" name="Passout_UG" onChange={handleInputChange}value={formData.Passout_UG} />
                              </div>
                            </td>
                            
                          </tr>
                          <tr>
                            <td className="text-nowrap">PG</td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Institute_PG" name="Institute_PG" onChange={handleInputChange} value={formData.Institute_PG} />
                              </div>
                            </td>
                            <td>
                              <div className="form-check d-flex justify-content-center">
                                <input className="form-control" type="tel" id="Mark_PG" name="Mark_PG" onChange={handleInputChange} value={formData.Mark_PG} />
                              </div>
                            </td>
                            <td>
                            <div className="form-check d-flex justify-content-center">
                              <input 
                                className="form-control" 
                                type="tel" 
                                id="Passout_PG" 
                                name="Passout_PG" 
                                value={formData.Passout_PG}  
                                onChange={handleInputChange}  
                              />
                            </div>
                            </td>
                            
                          </tr>    
                         
                                   
                        </tbody> 
                      </table>
                    </div>
                    </div>
                    </section>
                );
                case 3:
                  return (
                    <section>
                        {/* Your existing JSX code for the experience section */}
                        <ul className="nav nav-pills flex-column flex-md-row mb-4">
                                <li className="nav-item">
                                    <i className="nav-link"><i className="bx bx-user-circle me-1"></i>Student Details</i>
                                </li>
                                <li className="nav-item">
                                    <i className="nav-link "><i className="bx bxs-book-content me-1"></i>Qualification Details</i>
                                </li>
                                <li className="nav-item">
                                    <i className="nav-link active"><i className="bx bxs-book-content bx-tada  me-1"></i> Experiance</i>
                                </li>
                                <li className="nav-item">
                                    <i className="nav-link "><i className="bx bx-collection me-1"></i> Course Details</i>
                                </li>
                            </ul>
                        <h5 className="card-header">Experience Details</h5>
                        <div className="card-body">
                            <div className="row">
                                {experience.map((exp, index) => (
                                    <div key={exp.id} className="row mb-4 align-items-center">
                                        <div className="col-md-3">
                                            <label htmlFor={`Company${exp.id}`} className="form-label">Company</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id={`Company${exp.id}`}
                                                name={`Company${exp.id}`}
                                               
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="Enter Company Name"
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor={`Designation${exp.id}`} className="form-label">Designation</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id={`Designation${exp.id}`}
                                                name={`Designation${exp.id}`}
                                                
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="Enter Designation"
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor={`Years${exp.id}`} className="form-label">Years of Experience</label>
                                            <input
                                                className="form-control"
                                                type="number"
                                                id={`Years${exp.id}`}
                                                name={`Years${exp.id}`}
                                               
                                                onChange={(e) => handleInputChange(e)}
                                                placeholder="Enter Years of Experience"
                                            />
                                        </div>
                                        <div className="col-md-3 d-flex align-items-center ">
                                            <button
                                                type="button"
                                                className="btn btn-primary me-2"
                                                onClick={addExperienceRow}
                                            >
                                                <i className="bx bx-plus"></i> 
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => deleteExperienceRow(index)}
                                            >
                                                <i className="bx bx-trash"></i> 
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Button to add a new row */}
                            
                        </div>
                    </section>
                );
            case 4:
                return (
                    <section>
                        <ul className="nav nav-pills flex-column flex-md-row mb-3">
                          <li className="nav-item">
                                <i className="nav-link "><i className='bx bx-user-circle bx-tada me-1' ></i>Student Details</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bxs-book-content me-1"></i>Qualification Details</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link"><i className="bx bxs-book-content me-1"></i> Experiance</i>
                            </li>
                            <li className="nav-item">
                                <i className="nav-link active"><i className='bx bx-collection bx-tada me-1' ></i> Course Details</i>
                            </li>
                        </ul>

                        <h3 className="card-header">Counsellor Details</h3>
                        <div className="card-body">
                     
                        <div className="row">
                        <div className="mb-1 col-md-3">
                        <label htmlFor="Designation_name" className="form-label">Designation name</label>
                            <select className="form-select" id="Designation_name"  name="Designation_name"  defaultValue={formData.Designation_name} onChange={handleInputChange} aria-label="Default select example">
                                <option value="">Select Designation name </option>
                                {Designations.map((designation, index) => (
                                  
                                    <option key={index} value={designation.Designation_name}>
                                      {designation.Designation_name}
                                    </option>
                                  
                                ))}
                            </select>
                          </div>
                          <div className="mb-1 col-md-3">
                          <label htmlFor="Counsellor_name" className="form-label">Counsellor name</label>
                          <select className="form-select" id="Counsellor_name" name="Counsellor_name"  defaultValue={formData.Counsellor_name} onChange={handleInputChange} aria-label="Default select example">
                                <option value="">Select Counsellor name </option>
                                <option value="Married">c++</option>
                                <option value="Single">Python</option>
                            </select>
                            {/* <select className="form-control" id="Counsellor_name"  name="Counsellor_name"  defaultValue="Select Designation name" aria-label="Default select example">
                          {courses_Detail.map((course_detail, index) => (
                              <option key={index} value={course_detail.Course_Fees}>
                              {course_detail.Course_Fees}
                            </option>
                            ))}
                          </select> */}
                          </div>
                          
                          <div className="mb-1 col-md-4">
                          <label htmlFor="Reference_name" className="form-label">Reference name</label>
                          <input className="form-control" type="tel" id="Reference_name" name="Reference_name" value={formData.Reference_name} onChange={handleInputChange}  placeholder="Enter Reference name" />
                          </div>
                         
                          </div>
                          </div>
                          <h3 className="card-header">Course Details</h3>
                        <div className="card-body">
                     
                        <div className="row">
                        <div className="mb-4 col-md-4">
                        <label htmlFor="Course_name" className="form-label">Course name</label>
                       
                          
                        <label htmlFor="Course_name" className="form-label">Course Name</label>
                        <select 
                          className="form-select" 
                          id="Course_name"
                          name="Course_name" 
                          value={formData.Course_name }
                          
                          onChange={(e) => {
                              handleInputChange(e);
                              const selectedCourse = courses.find(course => course.Course_name === e.target.value);
                              if (selectedCourse) {
                                  onClick_Course(selectedCourse.Course_id,selectedCourse.Course_Fees);
                              }
                          }}
                          aria-label="Default select example"
                      >
                          <option value="">Select Course name</option>
                          {courses.map((course, index) => (
                              course.Course_Status === "Active" && (
                                  <option key={index} value={course.Course_name}>
                                      {course.Course_name}
                                  </option>
                              )
                          ))}
                      </select>


                          </div>
                          {courses_Detail.map((course_detail, index) => (
    <React.Fragment key={index}>
        <div className="mb-3 col-md-5">
            <label htmlFor="Course_Fees" className="form-label">Course Fee</label>
            <input
                id="Course_Fees"
                name="Course_Fees"
                onChange={(e) => { 
                    handleInputChange(e);
                    // console.log(e.target.value);
                }} 
                value={course_fees || ''} 
                className="form-control"
            />
        </div>

        <div className="mb-4 col-md-4">
            <label htmlFor="Discount" className="form-label">Discount</label>
            <select 
                className="form-select" 
                id="Discount" 
                name="Discount" 
                defaultValue={formData.Discount}
                onChange={(e) => {
                    handleInputChange(e);
                    const selectedDiscount = e.target.value;
                    
                    // Check if Course_fee is defined
                    if (course_detail.Course_Fees) {
                        onClick_Discount(selectedDiscount, course_detail.Course_Fees);
                    } else {
                        // Log the course_detail object for debugging
                        console.log("course_detail:", course_detail);
                        console.error("Course_fee is not defined for the selected course");
                    }
                }}
                aria-label="Default select example"
            >
                <option value="">Select Discount</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
            </select>
        </div>
    </React.Fragment>
))}



                          <div className="mb-4 col-md-5">
                            <label htmlFor="Discount_value" className="form-label">Discount value</label>
                          
                            <input
                              id="Discount_value"
                              name="Discount_value"
                              value={Discounts} 
                              className="form-control"
                              onChange={(e)=>handleInputChange(e)}
                            />
                            
                          </div>
                          <div className="mb-4 col-md-4">
                            <label htmlFor="Total_value" className="form-label">Total value</label>
                          
                            <input
                              id="Total_value"
                              name="Total_value"
                              value={Total_fee}
                              className="form-control"
                              onChange={handleInputChange}
                            />
                         
                          </div>
                          </div>

                         
                          
                        </div>
                    </section>
                );
            
            default:
                return null;
        }
    };

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y ">
            <div className="card">
              <div className="row  mb-2">
                <div className="col-md-12">
                  
            
                <form className="form-register" onSubmit={handleSubmit}>
                    {renderStepContent()}
                    <div className="buttons">
                        {step > 1 && (
                            <button type="button" className="btn btn-primary me-5" onClick={() => setStep(step - 1)}>Previous</button>
                        )}
                        {step < 4 && (
                            <button type="submit" className="btn btn-info">Next</button>
                        )}
                        {step === 4 && (
                            <button type="submit" onClick={handlesubmit} className="btn btn-info">Submit</button>
                        )}
                    </div>

                </form>
                </div>
                </div>
                </div>
            </div>
        </div>
          
    );
};

export default UpdateEnquiry;
