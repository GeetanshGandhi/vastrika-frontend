import React from 'react'
import './CartItem.css'
import { toast } from 'react-toastify';
export default function CartItem({ item, removeProduct }) {
    const handleRemoveFromCart = async()=> {
        let form = new FormData();
        form.append("customerEmail", item["customer"]["customerEmail"]);
        form.append("productId", item["product"]["productId"])
        const res = await fetch(process.env.REACT_APP_BACKEND+"cart/delete",{
            method: 'POST', body: form
        })
        const response = await res.text();
        if(response==="Success"){
            removeProduct(item)
            toast.success("Product removed!");
        }
        
        else{
            toast.error("Could not remove the item from cart!");
        }
    }
    return (
        <div className='cartitem-container'>
            <div className="wrapper">
                <img className='cartitem-img'
                src={require("../../../backend/product_images/"+item["product"]["productId"]+".jpg")} alt="" />
            </div>
            <p className="cartitem-name">{item["product"]["productName"]}</p>
            <div className="wrapper">
                <button className='cartitem-remove-btn' onClick={handleRemoveFromCart}>Remove</button>
            </div>
        </div>
    )
}
