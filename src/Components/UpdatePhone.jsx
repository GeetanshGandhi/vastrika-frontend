import React, { useEffect, useState } from 'react'
import './UpdateAddress.css'
import { toast } from 'react-toastify';
export default function UpdatePhone() {
    const [login, setlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
        }
    },[])
    const [phone, setphone] = useState("");
    const phoneChange = (e)=>{
        setphone(e.target.value);
    }
    const updatePhone = async()=>{
        if(phone.trim()===""){
            toast.error("Enter the new number!");
            return;
        }
        if(phone.length!=10 || !/^\d+$/.test(phone)){
            toast.error("Enter a valid Phone number!");
            return;
        }
        let form = new FormData();
        form.append("customerEmail", login.customerEmail)
        form.append("newNumber", phone);
        const res = await fetch(process.env.REACT_APP_BACKEND+"customer/updateMobile",{
            method:"POST", body: form
        })
        if(res.ok){
            const reply = await res.json();
            if(reply.customerEmail){
                toast.success("Updated Successfully!");
                localStorage.setItem("vastrikaUser", JSON.stringify(reply))
            }
            else toast.error("Cannot Update! Please try again later");
        }
        else toast.error("cannot update! Please try again later.")
    }
    return (
        <div className='super-flex-container'>
            <div className="update-container">
                <p className="updadd-head">Update Phone Number</p>
                <p className="updadd-subhead">Enter your new Phone Number</p>
                <div className="form-ip">
                    <input onChange={(e)=>phoneChange(e)} placeholder=" "  id="update-sbname" className="form-ip-input" />
                    <label htmlFor='update-sbname' className="form-ip-head">New Phone Number</label>
                </div>
                <div className="wrapper">
                    <button onClick={updatePhone} className='updadd-submit-btn'>Update</button>
                </div>
            </div>
        </div>
    )
}
