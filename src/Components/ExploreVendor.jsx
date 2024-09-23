import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductItem from './ProductItem';
import './ExploreVendor.css'
export default function ExploreVendor() {
	const {state} = useLocation()
	const vendor = state["vendor"];
	const [products, setProducts] = useState([]);
	useEffect(()=>{
		fetch(process.env.REACT_APP_BACKEND+"product/getByOwner",{
			headers: {"content-type":"application/json"},
			body: vendor["ownerEmail"],
			method: "POST"			
		}).then((res)=>res.json()).then((data)=>setProducts(data))
	},[vendor])
	return (
		<div className='super-nonflex-container'>
		<p className="vendor-explore-name">{vendor["businessName"]}</p>
		<p className="vendor-explore-owner">By <u>{vendor["businessOwnerName"]}</u></p>
		{
			products.length===0?
			<p className="no-prods">This Business is not Offering any product at the moment.</p>
			:
		<>
			<p className="vendor-explore-head">Products Offered by {vendor["businessName"]}:</p>
			<div className="vendor-prod-container">
			{
				products.map((item)=>{
					return <ProductItem item={item}/>
				})
			}
			</div>
		</>
		}
		</div>
	)
}
