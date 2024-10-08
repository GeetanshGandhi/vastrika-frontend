import React, { useEffect, useState } from 'react'
import './UpdateAddress.css'
import { locationData } from '../stateCityData';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function UpdateAddress() {
  const [login, setlogin] = useState(null)
  const [details, setdetails] = useState({
    hno: '', sbname: '', lmark: '', city: '', state: ''
  })
  useEffect(()=>{
    if(localStorage.getItem("vastrikaUser")!==null) setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
  },[])
  useEffect(() => {
    const stateselect = document.getElementById("selectstate");
    const cityselect = document.getElementById("selectcity");
    const statelist = Object.keys(locationData);
    for (let i = 0; i < statelist.length; i++) {
      let option = `<option ${statelist[i] === "MP" ? "selected" : ""}
						  value=${statelist[i]}>${locationData[statelist[i]][0]}</option>`;
      stateselect.insertAdjacentHTML("beforeend", option);
    }
    let initialStateCity = locationData["MP"][1];
    for (let i = 0; i < initialStateCity.length; i++) {
      let option = `<option ${initialStateCity[i] === initialStateCity[0] ? "selected" : ""}
						  value=${initialStateCity[i]}>${initialStateCity[i]}</option>`;
      cityselect.insertAdjacentHTML("beforeend", option);
    }
    setdetails({...details, ["state"]:locationData["MP"][0], ["city"]:locationData["MP"][1][0]})
  }, [])
  const handleStateChange = (e) => {
    const currstatecities = locationData[e.target.value][1];
    const cityselect = document.getElementById("selectcity");
    cityselect.options.length = 0;
    for (let i = 0; i < currstatecities.length; i++) {
      let option = `<option ${currstatecities[i] === currstatecities[0] ? "selected" : ""}
						  value=${currstatecities[i]}>${currstatecities[i]}</option>`;
      cityselect.insertAdjacentHTML("beforeend", option);
    }
    setdetails({...details, ["state"]:locationData[e.target.value][0]})
  }

  const handleFieldChange = (e, field) => {
    setdetails({...details, [field]:e.target.value});
  }
  const navigate = useNavigate()
  const updateAddress = async()=> {
    if(details["hno"].trim()===""){
      toast.error("Please Enter a House Number!");
      return;
    }
    if(details["sbname"].trim()===""){
      toast.error("Please Enter Street/Building Name!");
      return;
    }
    if(details["lmark"].trim()===""){
      toast.error("Please Enter Landmark for hassle-free delivery!");
      return;
    }
    let form = new FormData();
    form.append("email", login["customerEmail"]);
    form.append("hno", details["hno"]);
    form.append("sbname", details["sbname"]);
    form.append("lmark", details["lmark"]);
    form.append("city", details["city"]);
    form.append("state", details["state"]);
    const res = await fetch(process.env.REACT_APP_BACKEND+"customer/updateAddress",{
      method: "POST", body: form
    })
    if(res.status===200){
      const output = await res.json()
      toast.success("Address Updated Successfully!");
      localStorage.setItem("vastrikaUser", JSON.stringify(output));
    }
    else toast.error("Updates Failed! Please try again later.");
    navigate(-1)
  }
  return (
    <div className='super-flex-container'>
      <div className="update-container">
        <p className="updadd-head">Update Address</p>
        <p className="updadd-subhead">Enter you new details</p>
        <div className="updform-ip-wrap">
          <div className="form-ip">
            <input onChange={(e)=>handleFieldChange(e, "hno")} placeholder=" "  id="update-hno" className="form-ip-input" />
            <label htmlFor='update-hno' className="form-ip-head">House Number</label>
          </div>
        </div>
        <div className="updform-ip-wrap">
          <div className="form-ip">
            <input onChange={(e)=>handleFieldChange(e, "sbname")} placeholder=" "  id="update-sbname" className="form-ip-input" />
            <label htmlFor='update-sbname' className="form-ip-head">Street/Building Name</label>
          </div>
        </div>
        <div className="updform-ip-wrap">
          <div className="form-ip">
            <input onChange={(e)=>handleFieldChange(e, "lmark")} placeholder=" "  id="update-lmark" className="form-ip-input" />
            <label htmlFor='update-lmark' className="form-ip-head">Landmark</label>
          </div>
        </div>
        <div className="updform-select-wrap">
          <select onChange={handleStateChange} name="state" id="selectstate"></select>
        </div>
        <div className="updform-select-wrap">
          <select onChange={(e)=>handleFieldChange(e, "city")} name="city" id="selectcity"></select>
        </div>
        <div className="wrapper">
          <button className='updadd-submit-btn' onClick={updateAddress}>Submit</button>
        </div>
      </div>
    </div>
  )
}
