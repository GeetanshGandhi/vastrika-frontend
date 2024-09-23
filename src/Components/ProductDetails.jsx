import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './ProductDetails.css'
export default function ProductDetails() {
    const [login, setlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
        }
    },[])
    const {state} = useLocation();
    const [item, setitem] = useState(state)

    const [quantity, setquantity] = useState(0)
    const handleChangeQty = (e)=>{
        setquantity(e.target.value)
    }
    const navigate = useNavigate();
    const handleAddToCartClick = async()=> {
        if(login==null){
            navigate("/custLogin")
            toast.warn("Please Log In to continue.");
            return;
        }
        //make user add quantity
        const qty = document.getElementById("quantity-ip")
        const addbtn = document.querySelector(".addtocart-btn")
        if(quantity===0){
            document.querySelector(".select-qty-msg").style.display = "block";
            qty.style.display="block";
            qty.value = 1;
            qty.focus();
            addbtn.style.backgroundColor= "rgb(226,255,220)"
            addbtn.style.color="rgb(0,50,0)"
            addbtn.style.borderColor="rgb(0,50,0)"
            setquantity(1)
            return;
        }        
        if(quantity>5){
            toast.error("Can only add upto 5 pieces at a time!");
            return;
        }
        //processing add request
        let form = new FormData();
        form.append("customerEmail", login["customerEmail"])
        form.append("productId", item["productId"])
        form.append("quantity", quantity)

        const res = await fetch(process.env.REACT_APP_BACKEND+"cart/add",{
            method: "POST",
            body: form
        })
        const response = await res.text(); 
        console.log(response);
        if(res.status===500){
            toast.error("Could not Add item to cart! Please Try again later.")
            return;
        }
        if(response==="Exist") {
            toast.error("This item already exists in your cart!");
            return;
        }
        qty.style.display="block";
        qty.value = 1;
        qty.focus();
        addbtn.style.backgroundColor= "rgb(226,255,220)"
        addbtn.style.color="rgb(0,50,0)"
        addbtn.style.borderColor="rgb(0,50,0)"
        toast.success("Item added to cart!")
    }
    return (
        <>
        <p>{JSON.stringify(item)}</p>
        <div className='prod-det-innerwrapper'>
            <img id='prod-image' src={require("../../../backend/product_images/"+item.productId+".jpg")} alt="" />
            <div className="prod-dets">
                <p className='saree-title'>{item.productName}</p>
                <p className="city-name">Place of Origin: <span>{item.city.cityName}</span></p>
                <p className="saree-desc">{item.description}</p>
                <div className="wrapper">
                    <p className="select-qty-msg">Select Quantity (less than 5) to add: </p>
                    <input onChange={(e)=>handleChangeQty(e)} type="number" id='quantity-ip' min='1' max='5'/>
                </div>
                <div className="wrapper">
                    <button onClick={handleAddToCartClick} className='addtocart-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
        </>
    )
}
