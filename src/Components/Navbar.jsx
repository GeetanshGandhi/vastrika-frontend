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
    const toggleSubmenu = ()=> {
        document.getElementById("subMenuWrap").classList.toggle("submenu-open");
    }
    return (
        <nav>
            <Link to="/" className="nav-left-wrapper">
                <img id="nav-logo" src={require("../images/logo.png")} alt="logo" />
                <h1 className="title-bigletter">V</h1>
                <div style={{padding:"0"}}>
                    <h1 className="title">astrika</h1>
                    <h2 className="punchline">Threads of Tradition</h2>
                </div>
            </Link>
            <div className="search-bar">
                <img src={require("../images/icons/searchIcon.png")} alt="si"/>
                <p>I</p>
                <input placeholder="Search for an item or more..." id="search-inp" name="search-inp"/>
            </div>
            {
            login===null &&
            <div className='right'>
                <Link className="nolog-home-link" to="/">Home</Link>
                <button onClick={()=>navigate("/custLogin")} className='gotologin-btn'>Login</button>
                <Link className="gotoregister-link" to='/custRegister'>Register</Link>
            </div>
            }
            {
                login!==null &&
                <>
                <div className='wrapper'>
                    <Link className="home-link" to="/">Home</Link>
                    <p onClick={toggleSubmenu}className="dp-init">{login["firstName"].substring(0,1)+login["lastName"].substring(0,1)}</p>
                </div>
            <div className="submenu-wrap" id="subMenuWrap"><div className="submenu">
                <div className="profile">
                    <img className='dp' src={require("../images/icons/profilepic.png")} alt="dp" />
                    <div className="profile-info">
                        <p className="user-name">{login["firstName"]+" "+login["lastName"]}</p>
                        <p className="user-add">{login["houseNumber"]+", "+login["streetBuildingName"]+", "+login["landmark"]+", "+login["city"]+", "+login["state"]}</p>
                    </div>
                </div>
                <hr style={{borderBottom:"1px solid rgb(223,223,223)"}}/>
                <Link className='submenu-link' to='/myOrders'>
                    <div className="submenu-link-in">
                    <img className='submenu-link-img' src={require("../images/icons/orderIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>My Orders</p>
                    </div>
                </Link>
                <Link className='submenu-link' to='/updateAdd'>
                    <div className="submenu-link-in">
                        <img className='submenu-link-img' src={require("../images/icons/locationIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>Update Address</p>
                    </div>
                </Link>
                <Link className='submenu-link' to='/updatePhn'>
                    <div className="submenu-link-in">
                        <img className='submenu-link-img' src={require("../images/icons/phoneIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>Update Phone Number</p>
                    </div>
                </Link>
                <Link className='submenu-link'to='/cart'>
                    <div className="submenu-link-in">
                        <img className='submenu-link-img' src={require("../images/icons/cartIcon.png")} alt="loc" />
                        <p className='submenu-link-in-p'>Your Cart</p>
                    </div>
                </Link>
                <div className="wrapper">
                    <button className='logout-btn' onClick={dologout}>Log Out</button>
                </div>
            </div></div>
                </>
            }
        </nav>
    )
}
