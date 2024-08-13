import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
    const navigate = useNavigate();
    const [login, setlogin] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem("slelo_logindata")!==null){
            setlogin(JSON.parse(localStorage.getItem("slelo_logindata")));
        }
    },[])
    return (
        <nav>
            <div className="wrapper left">
                <img id="nav-logo" src={require("../images/logo.webp")} alt="logo" />
                <h1 className="title">Saree Lelo</h1>
            </div>
            <div className="right">
                {
                login===null?
                <>
                    <button onClick={navigate("/custLogin")} className='login-btn'>Login</button>
                    <Link className="register-link" to='/custRegister'>Register</Link>
                </>
                :<>
                </>
                }
            </div>
        </nav>
    )
}
