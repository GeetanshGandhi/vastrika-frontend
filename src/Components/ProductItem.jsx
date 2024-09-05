import React, { useEffect, useState } from 'react'
import './ProductItem.css'
import Popup from 'reactjs-popup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function ProductItem({item, itemState}) {
    const [login, setlogin] = useState(null)
    const [cartItem, setCartItem] = useState({
        customer: null, product: null, quantity: 0
    })
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
            setCartItem({...cartItem, "customer":JSON.parse(localStorage.getItem("vastrikaUser"))})
        }
    },[])
    const [quantity, setquantity] = useState(0);
    const handleChangeQty = (e)=>{
        setquantity(e.target.value);
    }
    const navigate = useNavigate();
    const handleAddToCartClick = async()=> {
        if(login==null){
            navigate("/custLogin")
            toast.warn("Please Log In to continue.");
            return;
        }
        const qty = document.getElementById("quantity-ip")
        const addbtn = document.querySelector(".addtocart-btn")
        if(quantity==0){
            qty.style.display="block";
            qty.value = 1;
            qty.focus();
            addbtn.style.backgroundColor= "rgb(226,255,220)"
            addbtn.style.color="rgb(0,50,0)"
            addbtn.style.borderColor="rgb(0,50,0)"
            setquantity(1);
            return;
        }
        let form = new FormData();
        form.append("customer", JSON.stringify(login))
        form.append("product", JSON.stringify(item))
        form.append("quantity", document.getElementById("quantity-ip").value.toString())
        const res = await fetch(process.env.REACT_APP_BACKEND+"cart/add",{
            method: "POST",
            body: form
        })
        const response = await res.text(); 
        if(res.status==500){
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
        <div className='prod-item-container'>
            <Popup trigger={
                <div className="wrapper">
                    <img className='prod-img' src={require("../../../backend/product_images/"+item["productId"]+".jpg")} alt="pritem" />    
                </div>
                }
                modal nested
                contentStyle={{backgroundColor:"rgb(0,0,0,0)", outline:"none", border:"none"}}
            >
                {
                    close=>(                     
                    <div className='wrapper'>
                        <img className='zoomed-img' src={require("../../../backend/product_images/"+item["productId"]+".jpg")} alt="zoom" />
                        <img onClick={close} className="close-icon" src={require("../images/icons/closeIcon.png")} alt="close" / >
                    </div>
                )}
            </Popup>
            <p className="owner-name">{item["business"]["businessName"]}</p>
            <p className="prod-name">{item["productName"]}</p>
            {
                item["discount"]!==0?
            <div className="wrapper">
                <p className="disc-price">₹{Math.floor(item["price"]-(item["discount"]*item["price"]/100))}/-</p>
                <p className="price">₹{item["price"]}/-</p>
            </div>:
            <div className="wrapper">
                <p className="orig-price">₹{item["price"]}/-</p>
            </div>            
            }
            <div className="wrapper">
                <input onChange={handleChangeQty} id='quantity-ip' type="number" min="1" max="5" />
            </div>
            <div className="wrapper">
                <button onClick={handleAddToCartClick} className='addtocart-btn'>Add to Cart</button>
            </div>
        </div>
    )
}
