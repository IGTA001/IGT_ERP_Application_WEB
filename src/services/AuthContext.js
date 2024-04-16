import React, { createContext, useState, useCallback } from 'react';
import {jwtDecode} from "jwt-decode"; // Correct import statement
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() => JSON.parse(localStorage.getItem('authTokens')) || null);
    const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access) : null);
    const history = useNavigate();

    const loginUser = useCallback(async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/adm/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': e?.target.username.value, 'password': e?.target.password.value})
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            const data = await response.json();
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            history('/dashboard');
        } catch (error) {
            history('/')
            console.error('Login failed:', error);
            
        }
    }, [history]);

    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens'); 
        history('/');
    }, [history]);

    

    const getData = async (urlpath) => { 
        try {
            const response = await fetch(`http://127.0.0.1:8000/adm/${urlpath}`,
            {method: 'Post'});
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data
           
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const insert = async (Data,urlpath,History = null) => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/adm/${urlpath}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data)
          });
      
          if (!response.ok) {
            throw new Error('Failed to create ');
          }
          history(History) 
        } catch (error) {
          console.error(' creation failed:', error);
        }
      };

      const update = async (Data,urlpath,History = null) => {
        
        try {
            const response = await fetch(`http://127.0.0.1:8000/adm/${urlpath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            });
            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to  update');
            }
            
            history(History);
        } catch (error) {
            console.error(' update failed:', error);
        
        }
    }
    
    
    const Delete = async (Data,urlpath,History=null) => {
        try {

                const response = await fetch(`http://127.0.0.1:8000/adm/${urlpath}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Data)
                });
                if (!response.ok) {
                    throw new Error('Failed to delete ');
                }
                history(History);
            
        } catch (error) {
            console.error('Delete operation failed:', error);
           
        }
    };
    
    const Fetch = async (Data,urlpath) => {
        try {

            const response = await fetch(`http://127.0.0.1:8000/adm/${urlpath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            return data
            
        } catch (error) {
            console.error('fetch data failed:', error);
           
        }
    };
   


    return (
        <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser, getData,insert,Delete,Fetch,update }}> {/* Provide getData in context value */}
            {children}
        </AuthContext.Provider>
    );
};
