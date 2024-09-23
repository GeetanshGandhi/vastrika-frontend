import React, { useEffect, useState } from 'react'
import './Cart.css'
import CartItem from './CartItem';
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

    const removeProductFromCart = (item)=> {
        setCart_items(cart_items.filter((element)=>{
            return element!==item;
        }))
    }
    return (
        <>
        {
        login===null?
        <p className="gateway-error">Unauthorized Access</p>
        :
        <div className="super-nonflex-container">
            <p className="login-user">Logged in as: <span className='user-email'>{login.customerEmail}</span></p>
            <p className="cart-head">Cart</p>
            <div className="cartitem-box">
                {   
                    cart_items.length===0?
                    <p className="empty-cart-msg">- Add items to Cart to view them here -</p>
                    :
                    cart_items.map((item)=>{
                        return <CartItem item={item} removeProduct={removeProductFromCart}/>
                    })
                } 
            </div>
        </div>
        }
        </>
    )
}
