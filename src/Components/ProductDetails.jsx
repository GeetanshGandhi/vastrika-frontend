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
        if(quantity>state.quantityAvailable){
            toast.error("Quantity greater than available stock!");
            return;
        }        
        if(quantity>5){
            toast.error("Can only add upto 5 pieces at a time!");
            return;
        }
        //processing add request
        let form = new FormData();
        form.append("customerEmail", login["customerEmail"])
        form.append("productId", state["productId"])
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
        <div className="prod-det-wrapper">
        <div className='prod-det-innerwrapper'>
            <img id='prod-image' src={`data:image/png;base64,${state.productImage}`} alt="" />
            <div className="prod-dets">
                <p className='saree-title'>{state.productName}</p>
                <p className="det-price">{
                    state.discount===0?
                    <span className='disc-new-price'>{state.price}</span>
                    :<div className='wrapper'>
                        <p className="disc-old-price">Rs. {state.price}/-</p>
                        <p className="disc-new-price">Rs. {Math.floor(state.price - (state.discount*state.price/100))}/-</p>
                        <p className="notax">(Incl. of all taxes)</p>
                    </div>
                }
                </p>
                <p className="city-name">Place of Origin: <span>{state.city.cityName}</span></p>
                <p className="addon-info"><b>Material:</b> {state.material}</p>
                <p className="addon-info"><b>Occasion Type:</b> {state.occasion}</p>
                <p className="addon-info"><b>Blouse Fabric Included:</b> {state.blousePiece?"Yes":"No"}</p>
                <p className="addon-info"><b>Length:</b> {state.length} meters</p>
                <p className="addon-info"><b>Pattern</b> {state.pattern}</p>
                <div className="wrapper">
                    <p className="select-qty-msg">Select Quantity (less than 5) to add: </p>
                    <input onChange={(e)=>handleChangeQty(e)} type="number" id='quantity-ip' min='1' max='5'/>
                </div>
                {
                    state.quantityAvailable===0?
                    <p className="unavailable">Currently Unavailable</p>
                    :<div className="wrapper">
                        <button onClick={handleAddToCartClick} className='addtocart-btn'>Add to Cart</button>
                    </div>
                }
            </div>       
        </div>
        <p className="prod-desc-head">Product Description:</p>
        <p className="saree-desc">{state.description}</p> 
        </div>
    )
}
