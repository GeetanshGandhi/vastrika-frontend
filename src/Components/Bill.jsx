import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './Bill.css'
import { toast } from 'react-toastify';
export default function Bill(props) {
    const [login, setlogin] = useState(null)
    const {state} = useLocation();
    const [prodToBuy, setProdToBuy] = useState([]);
    const [subtot, setSubtot] = useState(0)
    const [tax, setTax] = useState(0)
    const [grdtot, setGrdtot] = useState(0)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null) {
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")));
        }
    }, [])
    useEffect(()=>{
        fetch(process.env.REACT_APP_BACKEND+"cart/getByCustomer",{
            headers: {"content-type":"application/json"},
            body: localStorage.getItem("vastrikaUser"),
            method: "POST"
        }).then((res)=>res.json()).then((data)=>{
            let sub = 0
            let grd = 0
            let tex = 0
            for(let i = 0; i<data.length; i++){
                let curr = data[i]["product"]
                sub+=Math.floor((curr["price"] - (curr["price"]*curr["discount"]/100))*data[i]["quantity"])
            }
            tex = Math.round(0.05*sub*100)/100
            grd = tex+sub
            setProdToBuy(data);
            setGrdtot(grd)
            setSubtot(sub)
            setTax(tex)
        })
    },[login])
    const [paymeth, setPaymethod] = useState("COD")
    const changePaymethod = (e) => {
        setPaymethod(e.target.value)
        console.log(e.target.value)
        let codbtn = document.getElementById("complete-order")
        let onlinebtn = document.getElementById("goto-pay")
        if(e.target.value==="COD"){
            codbtn.style.display = "block"
            onlinebtn.style.display = "none"
        }
        else{
            onlinebtn.style.display = "block"
            codbtn.style.display = "none"
        }
    }
    const navigate = useNavigate()
    const completeOrderWithCOD = async()=>{
        let newOrderData = {
            cartItems : prodToBuy, subTotal: subtot, 
            tax : tax, grandTotal: grdtot, paymentMethod : "Cash on Delivery"
        }
        const res = await fetch(process.env.REACT_APP_BACKEND+"orders/add",{
            method: 'POST', body: JSON.stringify(newOrderData),
            headers : {"content-type":"application/json"}
        })
        const reply = await res.text()
        if(reply === "Success"){
            toast.success("Order Placed Successfully!");
            navigate("/myOrders");
        }
        else{
            toast.error(reply);
            navigate(-1);
        }
    }
    const gotoPayments = ()=>{

    }
    return (
        <div className='super-nonflex-container'>
        {
        state===null || state["fromCart"]===false ?
        <p className="gateway-error">Unauthorized Access!</p>
        :
        <>
        <p className="bill-head">Invoice</p>
        <div className="bill-prod-container">
            <table>
                <tr>
                    <th>Product</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Price</th>
                </tr>
            {
                prodToBuy.map((item)=>{
                    return <tr>
                        <td className="bill-item-name">{item["product"]["productName"]}</td>
                        <td className="bill-item-price">{Math.floor(item["product"]["price"] - (item["product"]["discount"]*item["product"]["price"]/100))}</td>                    
                        <td className='bill-item-qty'>{item["quantity"]}</td>
                        <td className="bill-item-price">{Math.floor((item["product"]["price"] - (item["product"]["discount"]*item["product"]["price"]/100)))*item["quantity"]}</td>
                    </tr>
                })
            }
            </table>
        </div>
        <div className="final-entry-wrapper">
            <div>
                <p className="delivery-head">Delivering to: </p>
                {
                    login!==null && <>
                    <p className="delivery-add">{login["houseNumber"]}, {login["streetBuildingName"]}</p>
                    <p className="delivery-add">{login["landmark"]}</p>
                    <p className="delivery-add">{login["city"]}, {login["state"]}</p>
                    </>
                }
            </div>
            <div>
                <p className="delivery-head">Choose Payment Method:</p>
                <div className="radio-wrapper">
                    <input id="COD" type="radio" value='COD' checked={paymeth==="COD"}
                        name='Paymethod' onChange={(e)=>changePaymethod(e)}/>
                    <label className='paymeth' htmlFor="COD">Cash on Delivery</label><br />
                </div> 
                <div className="radio-wrapper">
                    <input id='online' type="radio" value='online' checked={paymeth==="online"}
                        name='Paymethod' onChange={(e)=>changePaymethod(e)}/>
                    <label className='paymeth' htmlFor="online">Online Payments</label><br />
                </div>
            </div>
            <div>
                <p className="final-entries">Sub Total: <b><u>{subtot}</u>/-</b></p>
                <p className="final-entries">GST @5%: <b><u>{tax}</u>/-</b></p>
                <p className="final-entries">Grand Total: <b><u>{grdtot}</u>/-</b></p>
            </div>
        </div>
        <div className="wrapper">
            <button onClick={completeOrderWithCOD} id='complete-order' className='place-order-btn'>Place Order with COD</button>
            <button onClick={gotoPayments} id='goto-pay' className='place-order-btn'>Pay Now and Place Order</button>
        </div>
        </>
        }
        </div>
    )
}
