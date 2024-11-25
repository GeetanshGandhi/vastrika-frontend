import React, { useEffect, useState } from 'react'
import './ProductItem.css'
import Popup from 'reactjs-popup'
import { useNavigate } from 'react-router-dom'
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
            <div className="proditemcontain-right">
            {
                item["quantityAvailable"]===0?
                <span className="stock-alert">Sold Out</span> :
                item["quantityAvailable"]<10 ?
                <span className="stock-alert">Only {item["quantityAvailable"]} left</span>
                : <></>
            }
                <Popup trigger={
                    <div className="wrapper">
                        <div className="zoomicon">
                            <img className="zoom-icon" src={require("../images/icons/zoomIcon.png")} alt="zoom-in" />
                        </div>
                        <img className='prod-img' src={`data:image/png;base64,${item.productImage}`} alt="pritem" />    
                    </div>
                    }
                    modal nested
                    contentStyle={{backgroundColor:"rgb(0,0,0,0)", outline:"none", border:"none"}}
                >
                    {
                        close=>(
                        <>                                          
                        <div className='wrapper'>
                            <img className='zoomed-img' src={`data:image/png;base64,${item.productImage}`} alt="zoom" />
                            <img onClick={close} className="close-icon" src={require("../images/icons/closeIcon.png")} alt="close" / >
                        </div>
                        </>
                    )}
                </Popup>
            </div>            
            <div className="proditemcontain-left">
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
            </div>
            
        </div>
    )
}
