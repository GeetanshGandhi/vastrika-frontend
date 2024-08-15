import React, { useEffect, useState } from 'react'
import './CustomerLogin.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
export default function CustomerLogin() {
    const [creds, setcreds] = useState({
        customerEmail:'', password:''
    })
    const [togglepass, settogglepass] = useState(false);
    const handleTogglePassword = ()=> {
        settogglepass(!togglepass);
    }
    const handleFieldChange = (e, field) => {
        setcreds({...creds, [field]:e.target.value});
    }
    const dologin = async() => {
        if(creds["customerEmail"] === ''){toast.error("Please Provide an Email!"); return;}
        if(creds["password"] === ''){toast.error("Please Provide a Password!"); return;}
        let res = await fetch("http://localhost:8080/customer/loginCustomer",{
            headers: {"content-type":"application/json"},
            body: JSON.stringify(creds),
            method: "POST"
        })
        res = await res.text();
        if(res==="Not Found") {toast.error("User Not Found!"); return;}
        if(res==="Invalid") {toast.error("Invalid Password!");return;}
        else{
            toast.success("Login Successful!",{delay:2000});
        }
    }
    return (
        <div className='wrapper light-container'>
            <div className="login-container">
                <h2 className="login-head">Login</h2>
                <div className="mail-container">
                    <p className="ip-head">Email ID</p>
                    <input placeholder="Email ID" type="text" className='ip-input' 
                        onChange={(e)=>(handleFieldChange(e,"customerEmail"))} />
                </div>
                <div className="pw-container">
                    <p className="ip-head">Password</p>
                    <input placeholder="Password" className="ip-input" type={togglepass?"text":"password"} 
                        onChange={(e)=>handleFieldChange(e,"password")}/>
                </div>
                <div className="wrapper">
                    <p className="toggle-pass" onClick={handleTogglePassword}>
                        {togglepass?"Hide Password":"Show Password"}
                    </p>
                </div>
                <div className="wrapper">
                    <button onClick={dologin} className="login-btn">Login</button>
                </div>

                <div className="wrapper">
                    <p className="newuser-msg">New User?</p>
                    <Link to="custRegister" className='newuser-link'>Register</Link>
                </div>
            </div>
        </div>
    )
}
