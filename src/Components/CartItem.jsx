import React, { useEffect, useState } from 'react'
import './CartItem.css'
import { toast } from 'react-toastify';
export default function CartItem({ item, removeProduct }) {
    const[login, setlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")));
        }
    },[])
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
    const enableEditQuantity = ()=> {
        const allitems = document.querySelectorAll(".set-qty-wrap");
        for(let i = 0; i< allitems.length; i++){
            if(allitems[i].role==item["product"]["productId"]){
                console.log("hello")
                allitems[i].style.display = "block";
                document.getElementById("updated-qty").value = 1
                break;
            }
        }
    }

    const [updatedQty, setUpdatedQty] = useState(-1)
    const editQuantityInCart = async()=>{
        let newqty = document.getElementById("updated-qty").value;
        if(newqty>5){
            toast.error("Quantity less than orequal to allowed!");
            return;
        }
        let form = new FormData();
        form.append("customerEmail", item["customer"]["customerEmail"])
        form.append("productId", item["product"]["productId"])
        form.append("newQty", newqty)
        const res = await fetch(process.env.REACT_APP_BACKEND+"cart/updateQty",{
            method: 'POST', body: form
        })
        const response = await res.json()
        if(res.status===200){
            if(response!==null && response["customer"]!==null){
                toast.success("Quantity Updated")
                setUpdatedQty(response["quantity"])
            }
        }
        const allitems = document.querySelectorAll(".set-qty-wrap");
        for(let i = 0; i<allitems.length; i++){
            if(allitems[i].role==item["product"]["productId"]){
                allitems[i].style.display = "none";
                break;
            }
        }
    }
    return (
        <div className='cartitem-container'>
            <div className="wrapper">
                <img className='cartitem-img'
                src={`data:image/png;base64,${item.product.productImage}`} alt="" />
            </div>
            <p className="cartitem-name">{item["product"]["productName"]}</p>
            <p className="cartitem-qty">Qty: {updatedQty===-1?item["quantity"]:updatedQty}</p>
            <div className="set-qty-wrap" role={item["product"]["productId"]}>
                <div className="wrapper">
                <p className="set-qty-msg">Set Qty:</p>
                <input id="updated-qty" type="number" min="1" max="5"/>
                </div>
                <div className="wrapper">
                    <button onClick={editQuantityInCart} className='update-qty-btn'>Update</button>
                </div>
            </div>
            <div className="wrapper">
                <button className='cartitem-remove-btn' onClick={handleRemoveFromCart}>Remove</button>
            </div>
            <div className="wrapper">
                <button onClick={enableEditQuantity} className='cartitem-edit-btn'>Edit Quantity</button>
            </div>
        </div>
    )
}
