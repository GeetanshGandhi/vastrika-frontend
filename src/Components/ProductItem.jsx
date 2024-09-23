import React, { useEffect, useState } from 'react'
import './ProductItem.css'
import Popup from 'reactjs-popup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function ProductItem({item, itemState}) {
    const [login, setlogin] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem("vastrikaUser")!==null){
            setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
        }
    },[])
    const navigate = useNavigate()
    const handleGoToProduct = ()=> {
        navigate("/productDetails", {state:item})
    }
    return (
        <div onClick={handleGoToProduct} className='prod-item-container'>
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
            {
                item["quantityAvailable"]<30?
            <div className='wrapper'>
                <p className="stock-alert">Only {item["quantityAvailable"]} left</p>
            </div> :<></>
            }
        </div>
    )
}
