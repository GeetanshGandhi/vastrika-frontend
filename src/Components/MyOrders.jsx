import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import { useNavigate } from 'react-router-dom'

const monthMapping = {
	"01":"January", "02":"February", "03":"March", "04":"April", "05":"May", "06":"June", 
	"07":"July", "08":"August", "09":"September", "10":"October", "11":"November", "12":"December"
}
export default function MyOrders() {
	const navigate = useNavigate();
	const [orders, setOrders] = useState([])
	const [login, setlogin] = useState(null)
	useEffect(()=>{
		if(localStorage.getItem("vastrikaUser")!==null){
			setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
			fetch(process.env.REACT_APP_BACKEND+"orders/getByCustomer",{
				headers: {"content-type":"application/json"},
				body: localStorage.getItem("vastrikaUser"),
				method: "POST"
			}).then((res)=>res.json()).then((data)=>setOrders(data))
		}
	},[])
	const [expandedOrder, setExpandedOrder] = useState(-1)
	const handleToggleExpansionOfOrder =(e, orderIdInp)=> {
		if(expandedOrder===-1){
			setExpandedOrder(orderIdInp);
			e.target.src = require("../images/icons/minusIcon.png")
		}
		else{
			setExpandedOrder(-1)
			e.target.src = require("../images/icons/plusIcon.png")
		}
	}
	return (
		<div className='super-nonflex-container'>
		{
				login===null? 
				<p className="gateway-error">Unauthorized Access!</p>
				:
		<>
			<p className="my-ord-head">My Orders</p>
			<div className="orders-container">
			{
				orders.length===0?
				<p className="no-ord">~Orders Placed by you will be shown here~</p>
				:
				orders.map((item)=>{
					return <div className="order-item">
						<div className="orditem-top-wrapper">
							<p className="placed-on">Placed On:<br/>
								{" "+item["orders"]["orderDateTime"].substring(8, 10)+" "+monthMapping[item["orders"]["orderDateTime"].substring(5, 7)]+", "+item["orders"]["orderDateTime"].substring(0, 4)}
							</p>
							<p className="ord-stat">Status: <b><span style={{color:item["orders"]["status"]==="Complete"?"green":"rgb(0, 102, 255)"}}>
								{item["orders"]["status"]}
								</span></b></p>
							<p className="ord-id">Order Id: <u>{item["orders"]["orderId"]}</u></p>
							<p className="total-amt">Total Amount: <b><br />Rs. {item["orders"]["grandTotal"]}/-</b></p>
						</div>
						<hr style={{borderBottom:"1px solid grey"}} />
						{
						expandedOrder===item["orders"]["orderId"] &&
						<div className="orditem-btm-wrapper">

							<div className="prod-in-ord-container">
							{
								item["productOrderedList"].map((item1)=>{
									return <div className="prod-in-ord-item">
										<div className="ord-prod-img-wrap">
											<img className='ord-prod-img' src={`data:image/png;base64,${item1.product.productImage}`} alt="prod" />
										</div>
										<p className="ord-prod-name">{item1["product"]["productName"]}</p>
										<div className="ord-prod-right-wrap">
											<p className="ord-prod-qty">Qty: {item1["quantity"]}</p>
											<button onClick={()=>navigate("/productDetails", {state:item1["product"]})} className='in-ord-btns view-prod'>View Product</button>
											{
												item["orders"]["status"]==="Complete" &&
												<button className='in-ord-btns review-prod'>Review Product</button>

											}
										</div>
									</div>
								})
							}
							</div>
						</div>
						}
						<div className="wrapper">
							<img onClick={(e)=>handleToggleExpansionOfOrder(e, item["orders"]["orderId"])}
								className='expand-btn' src={require("../images/icons/plusIcon.png")} alt="pl" />
						</div>						
					</div>
				})
			}
			</div>
		</>
	}
			

		</div>
	)
}
