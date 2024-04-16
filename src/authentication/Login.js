import './login.css'
import React, {useContext} from "react";
import AuthContext from '../services/AuthContext'

 
function Login() {
  const { loginUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Make sure to prevent the default form submission behavior
        const username = e.target.username.value;
        const password = e.target.password.value;

        await loginUser(e); // Pass the event object to the loginUser function

        console.log(username);
        console.log(password);
    };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
        
          <div className="card">
            <div className="card-body">
            
              <div className="app-brand justify-content-center">
                
                  
                  <span className="app-brand-text demo text-body  fw-bolder mb-4 ">igt</span>
              </div>
            
             

              <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit} >
              
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email or Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="username"
                    placeholder="Enter your email or username"
                    
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label" htmlFor="password">Password</label>
                    <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                      aria-describedby="password"
                    />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="remember-me" />
                    <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                  </div>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                </div>
              </form>

              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;

