import React, { useEffect, useState } from 'react'
import './CustomerLogin.css'
import { TextField } from '@mui/material'
import { Link } from 'react-router-dom';
export default function CustomerLogin() {
    const [togglepass, settogglepass] = useState(false);
    
    const handleTogglePassword = ()=> {
        settogglepass(!togglepass);
    }
    return (
        <div className='wrapper light-container'>
            <div className="login-container">
                <h2 className="login-head">Login</h2>
                <div className="mail-container">
                    <TextField id="outlined-basic" label="Email ID" variant="outlined" fullWidth />
                </div>
                <div className="pw-container">
                    <TextField type={togglepass?"text":"password"}id="outlined-basic" label="Password" variant="outlined" fullWidth />
                </div>
                <div className="wrapper">
                    <p className="toggle-pass" onClick={handleTogglePassword}>
                        {togglepass?"Hide Password":"Show Password"}
                    </p>
                </div>
                <div className="wrapper">
                    <button className="login-btn">Login</button>
                </div>

                <div className="wrapper">
                    <p className="newuser-msg">New User?</p>
                    <Link to="custRegister" className='newuser-link'>Register</Link>
                </div>
            </div>
        </div>
    )
}
