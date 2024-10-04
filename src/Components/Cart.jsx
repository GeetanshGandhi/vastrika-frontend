import React, { useEffect, useState } from 'react'
import './Cart.css'
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
    const [login, setlogin] = useState(null);
    const [cart_items, setCart_items] = useState([]);
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")));
            fetch(process.env.REACT_APP_BACKEND+"cart/getByCustomer",{
                headers: {"content-type":"application/json"},
                body: localStorage.getItem("vastrikaUser"),
                method: "POST"
            }).then((res)=>res.json()).then((data)=>{
                setCart_items(data);
            })
        }
    },[])
    const navigate = useNavigate();
    const removeProductFromCart = (item)=> {
        setCart_items(cart_items.filter((element)=>{
            return element!==item;
        }))
    }
    const updateQuantity = (cartItem, newQty)=>{
        for(let i = 0; i<cart_items.length; i++){
            if(cart_items[i]["product"]["productId"]===cartItem["product"]["productId"] && cart_items[i]["customer"]["customerEmail"]===cartItem["customer"]["customerEmail"]){
                console.log("hello")
                cart_items[i]["quantity"] = newQty;
                console.log(cart_items[i]["quantity"])
                break;
            }
        }
    }
    return (
        <>
        {
        login===null?
        <p className="gateway-error">Unauthorized Access</p>
        :
        <div className="super-nonflex-container">
            <p className="cart-head">Cart</p>
            {   
            cart_items.length===0?
            <p className="empty-cart-msg">- Add items to Cart to view them here -</p>
            :
            <>
            <div className="cartitem-box">
                {cart_items.map((item)=>{
                return  <CartItem item={item} removeProduct={removeProductFromCart} updateQuantity={updateQuantity}/>
                })
            }
            </div>
            <div className="wrapper">
            <button className='checkout-btn' onClick={()=>navigate("/bill", {state:{fromCart:true}})}>
                Check Out
                <img id='goahead-icon' src={require("../images/icons/goaheadIcon.png")} alt="" />
            </button>
            </div>
            </>

            }
        </div>
        }
        </>
    )
}
