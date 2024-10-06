import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

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
	useEffect(()=>{
		if(orders!==null){
			const alls = document.querySelectorAll(".prod-in-ord-item")
			let cancels = []			
			for(let i = 0; i<orders.length; i++){
				if(orders.productOrderedList && orders.productOrderedList!==null && orders.productOrderedList>0){
					for(let j = 0; j< orders.productOrderedList.length; j++){
						if(orders.productOrderedList[j].status==="Cancelled"){
							cancels.push(orders.productOrderedList[j].product.productId+","+orders.orders.orderId)
						}
					}
				}
			}
			console.log("cancelled"+cancels.toString())
			for(let i = 0; i<alls.length; i++){
				if(cancels.includes(alls[i].role)){
					alls[i].style.backgroundColor = "red";
				}
			}
		}
	},[orders])
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
	const [cancelreason, setcancelreason] = useState("")
	const [cancelrole, setcancelrole] = useState("")
	const [askreason, setaskreason] = useState(false)
	const handleCancelOrder = async(role)=> {
		let alls = document.querySelectorAll(".reason-wrap")
		let curr = null;
		for(let i = 0; i<alls.length; i++){
			if(alls[i].role===role){
				curr = alls[i];
				break;
			}
			else alls[i].style.display = "none";
		}
		if(askreason===false){
			curr.style.display = "block";
			setaskreason(true);
			setcancelrole(role);
			return;
		}
		if(askreason===true && cancelrole!==role){
			for(let i = 0; i<alls.length; i++){
				alls[i].style.display = "none";
			}
			curr.style.display = "block";
			setcancelrole(role);
			return;
		}
		if(cancelreason.trim()===""){
			toast.error("Enter a valid reason to cancel.");
			return;
		}
		if(cancelreason.length>200){
			toast.error("Reason length exceeded!");
			return;
		}
		toast.warn("Please Wait...");
		let info = role.split(",")
		let form = new FormData();
		form.append("productId", parseInt(info[0]));
		form.append("orderId", parseInt(info[1]));
		form.append("reason", cancelreason);
		const res = await fetch(process.env.REACT_APP_BACKEND+"prodOrd/cancel",{
			body: form, method:'POST'
		})
		if(res.status===200){
			const reply = await res.text();
			if(reply==="Success"){
				toast.success("Order Item Cancelled!");
				setTimeout(()=>{
					window.location.reload()
				}, 3000);
			}
			else toast.error("Could not cancel the order at the moment!");
		}
		else toast.error("Could not cancel the order at the moment!");
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
				!orders || orders.length===0 ?
				<p>~Orders Placed by you will appear here~</p>
				: <></>
			}
			{
				orders && orders.length>0 &&
				orders.map((item)=>{
					return <div className="order-item" role={item.orderId}>
						<div className="orditem-top-wrapper">
							<p className="placed-on">Placed On:<br/>
								{" "+item["orders"]["orderDateTime"].substring(8, 10)+" "+monthMapping[item["orders"]["orderDateTime"].substring(5, 7)]+", "+item["orders"]["orderDateTime"].substring(0, 4)}
							</p>
							<p className="total-amt" role={item.orderId}>Total Amount: <b><br />Rs. {item["orders"]["grandTotal"]}/-</b></p>
							<p className="ord-id">Order Id: <u>{item["orders"]["orderId"]}</u></p>
						</div>
						<hr style={{borderBottom:"1px solid grey"}} />
						{
						expandedOrder===item["orders"]["orderId"] &&
						<div className="orditem-btm-wrapper">

							<div className="prod-in-ord-container">
							{
								item["productOrderedList"].map((item1)=>{
									return <div className="prod-in-ord-item" role={item1.product.productId+","+item1.orders.orderId}>
										<div className="ord-prod-img-wrap">
											<img className='ord-prod-img' src={`data:image/png;base64,${item1.product.productImage}`} alt="prod" />
										</div>
										<div className="ord-prod-mid-wrap">
											<p className="ord-prod-name">{item1["product"]["productName"]}</p>
											<div className="wrapper">
												<button onClick={()=>navigate("/productDetails", {state:item1["product"]})} className='in-ord-btns view-prod'>View Product</button>
												{
													item["orders"]["status"]==="Complete" && 
													<button className='in-ord-btns review-prod'>Review Product</button>
												}
											</div>
										</div>
										<div className="ord-prod-right-wrap">
											<p className="ord-prod-qty">Qty: {item1["quantity"]} @ Rs. {item1["rate"]}/-</p>
											<p className="ord-prod-remark">{item1["status"]==="Cancelled"?"Order is cancelled by customer.":item1["remark"]}</p>
											<div className="reason-wrap" role={item1.product.productId+","+item1.orders.orderId}>
												<p className="reason">Reason of Cancellation:</p>
												<textarea onChange={(e)=>setcancelreason(e.target.value)} name="reason" id="reason-ip" rows="3"/>
											</div>
											{
												(item1.status==="Placed" || item1.status==="Packed") ?
											<button onClick={()=>handleCancelOrder(item1.product.productId+","+item1.orders.orderId)} className='cancel-prodord-btn'>Cancel</button>:
											item1.status==="Cancelled"?<></>:
											<p className="no-cancel-msg">This Order cannot be cancelled now.</p>
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
