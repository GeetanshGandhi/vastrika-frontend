import React, { useEffect, useState } from 'react'
import './CustomerRegistration.css'
import { locationData } from '../stateCityData'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function CustomerRegistration() {
	let regDetails = {
		firstName:'',
		lastName:'',
		customerEmail:'',
		mobile:'',
		houseNumber:'',
		streetBuildingName:'',
		landmark:'',
		city:'',
		state:'',
		password: ''
	}
	useEffect(()=>{
		const stateselect = document.getElementById("selectstate");
		const cityselect = document.getElementById("selectcity");
		const statelist = Object.keys(locationData);
		for(let i = 0; i<statelist.length; i++){
			let option = `<option ${statelist[i]==="MP"? "selected":""}
						  value=${statelist[i]}>${locationData[statelist[i]][0]}</option>`;
			stateselect.insertAdjacentHTML("beforeend", option);
		}
		let initialStateCity = locationData["MP"][1];
		for(let i = 0; i<initialStateCity.length; i++){
			let option = `<option ${initialStateCity[i]===initialStateCity[0]? "selected":""}
						  value=${initialStateCity[i]}>${initialStateCity[i]}</option>`;
			cityselect.insertAdjacentHTML("beforeend", option);
		}
	},[])
	const handleStateChange = (e)=> {
		const currstatecities = locationData[e.target.value][1];
		const cityselect = document.getElementById("selectcity");
		cityselect.options.length = 0;
		for(let i = 0; i<currstatecities.length; i++){
			let option = `<option ${currstatecities[i]===currstatecities[0]? "selected":""}
						  value=${currstatecities[i]}>${currstatecities[i]}</option>`;
			cityselect.insertAdjacentHTML("beforeend", option);
		}
	}
	const [showpass, setshowpass] = useState(false);
	const handleTogglePass = () => {
		setshowpass(!showpass);
	}
	const navigate = useNavigate();
	const handleRegister = async()=> {
		const allinputs = document.querySelectorAll(".form-ip-input")
		for(let i = 0; i<allinputs.length; i++){
			if(allinputs[i].value.trim()===""){
				for(let j = 0; j<allinputs.length; j++){
					allinputs[j].style.border = "none";
					allinputs[j].style.borderBottom = "2px solid rgb(192, 133, 247)";
					allinputs[j].style.borderRadius = "0"
				}
				toast.error("Please Provide all the information!");
				allinputs[i].style.border = "2px solid red"
				allinputs[i].style.borderRadius = "7px"
				return;
			}
		}
		regDetails["firstName"] = document.getElementById("form-ip-fname").value
		regDetails["lastName"] = document.getElementById("form-ip-lname").value
		regDetails["customerEmail"] = document.getElementById("form-ip-email").value
		regDetails["mobile"] = document.getElementById("form-ip-mobile").value
		regDetails["houseNumber"] = document.getElementById("houseno").value
		regDetails["streetBuildingName"] = document.getElementById("streetname").value
		regDetails["landmark"] = document.getElementById("landmark").value
		regDetails["state"] = locationData[document.getElementById("selectstate").value][0]
		regDetails["city"] = document.getElementById("selectcity").value
		regDetails["password"] = document.getElementById("password").value
		console.log(regDetails)
		function isEveryCharDigit(str) {
			return str.split('').every(char => !isNaN(parseInt(char, 10)));
		}
		const mobile = document.getElementById("form-ip-mobile")
		if(regDetails["mobile"].length!=10 || !isEveryCharDigit(regDetails["mobile"])){
			toast.error("Invalid Mobile Number!");
			for(let j = 0; j<allinputs.length; j++){
				allinputs[j].style.border = "none";
				allinputs[j].style.borderBottom = "2px solid rgb(192, 133, 247)";
				allinputs[j].style.borderRadius = "0"
			}
			mobile.style.border = "2px solid red"
			mobile.style.borderRadius = "7px"
			return;
		}
		let res = await fetch(process.env.REACT_APP_BACKEND+"customer/registerCustomer",{
			headers:{"content-type":"application/json"},
			body: JSON.stringify(regDetails),
			method:"POST"
		})
		res = await res.text();
		if(res === "Exist"){
			toast.error("Customer with above email ID already exists!");
			return;
		}
		if(res === "Invalid Password"){
			for(let j = 0; j<allinputs.length; j++){
				allinputs[j].style.border = "none";
				allinputs[j].style.borderBottom = "2px solid rgb(192, 133, 247)";
				allinputs[j].style.borderRadius = "0"
			}
			toast.error("Invalid Password Format!");
			document.getElementById("pass-guide").style.color = "red";
			document.getElementById("pass-guide").style.fontWeight = "bold";
			document.getElementById("password").style.border = "2px solid red";
			document.getElementById("password").style.borderRadius = "7px";
		}
		else{
			toast.success("Registration Successful! Please log in to continue.");
			navigate("/custLogin")
		}
	}
	return (
		<div className='super-flex-container'>
			<div className="register-form">
				<p className="reg-head">Register</p>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" " id='form-ip-fname' type="text" className="form-ip-input" />
						<label htmlFor='form-ip-fname' className="form-ip-head">First Name</label>
					</div>
					<div className="form-ip">
						<input placeholder=" "  id="form-ip-lname" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-lname' className="form-ip-head">Last Name</label>
					</div>
				</div>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" "  id="form-ip-email" className="form-ip-input" />
						<label htmlFor='form-ip-email' className="form-ip-head">Email ID</label>
					</div>
					<div className="form-ip">
						<input placeholder=" "  id="form-ip-mobile" type="text" className="form-ip-input" />
						<label htmlFor='form-ip-mobile' className="form-ip-head">Mobile No.</label>
					</div>
				</div>
				<p className="add-details">Address Details:</p>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" "  id="houseno" type="text" className="form-ip-input" />
						<label htmlFor="houseno" className="form-ip-head">House/Flat Number</label>
					</div>
					<div className="form-ip">
						<input placeholder=" "  id="streetname" type="text" className="form-ip-input" />
						<label htmlFor="streetname" className="form-ip-head">Street/Building Name</label>
					</div>
				</div>
				<div className="form-row-wrap">
					<div className="form-ip">
						<input placeholder=" "  id="landmark" type="text" className="form-ip-input" />
						<label htmlFor="landmark" className="form-ip-head">Landmark</label>
					</div>
				</div>
				<div className="form-row-wrap">
					<div className="form-ip">
						<p className="select-msg">Select State/UT</p>
						<select onChange={(e)=>handleStateChange(e)} id="selectstate"></select>
					</div>
					<div className="form-ip">
						<p className="select-msg">Select City/region</p>
						<select id="selectcity"></select>
					</div>
				</div>
				<div className="form-row-wrap">
					<div className="createpass-left">
						<p className="createpass-msg">Create a Password</p>
						<p id="pass-guide">Password must be 8-16 characters long, must contain atleast one lowercase letter, one uppercase letter, one digit and one special character(@#$&^)</p>
					</div>
					<div className="form-ip">
						<input placeholder=" " id="password" type={showpass?"text":"password"} className="form-ip-input" />
						<label htmlFor="password" className='form-ip-head'>Password</label>
						<p className="show-pass" onClick={handleTogglePass}>{showpass?"Hide Password":"Show Password"}</p>
					</div>
				</div>
				<div className="wrapper">
					<button onClick={handleRegister} className="register-btn">Register</button>
				</div>
				<div className="wrapper">
					<p className="alry-reg">Already Registered?</p>
					<Link to="/custLogin"className="goto-login">Log in</Link>
				</div>
			</div>
		</div>
	)
}
