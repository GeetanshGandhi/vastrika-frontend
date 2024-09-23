import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
    const navigate = useNavigate();
    const [login, setlogin] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")));
        }
    },[])
    const dologout = () => {
        localStorage.removeItem("vastrikaUser");
        navigate("/")
        window.location.reload();
    }
    return (
        <nav>
            <div className="wrapper left">
                <img id="nav-logo" src={require("../images/logo.webp")} alt="logo" />
                <h1 className="title-bigletter">V</h1>
                <div style={{padding:"0"}}>
                    <h1 className="title">astrika</h1>
                    <h2 className="punchline">Threads of Tradition</h2>
                </div>
            </div>
            <div className="search-bar">
                    <img src={require("../images/icons/searchIcon.png")} alt="si"/>
                    <p>I</p>
                    <input placeholder="Search for an item or more..." id="search-inp" name="search-inp"/>
                </div>
            <div className="right">
                {
                login===null?
                <>
                    <button onClick={()=>navigate("/custLogin")} className='gotologin-btn'>Login</button>
                    <Link className="gotoregister-link" to='/custRegister'>Register</Link>
                </>
                :<div className='wrapper'>
                    <Link className='cart-link' to="/cart">
                        <img id='cart-icon' src={require("../images/icons/cartIcon.png")} alt="" />
                        <p className="cart-msg">Your cart</p>
                    </Link>
                    <button onClick={dologout} className="logout-btn">Log out</button>
                </div>
                }
            </div>
        </nav>
    )
}
