import React, { useEffect, useState } from 'react'
import './ExploreCity.css'
import ProductItem from './ProductItem';
import { Link, useLocation } from 'react-router-dom'
import cityPop from '../cityPopularProducts';
export default function ExploreCity() {
	const { state } = useLocation();
	const city = state["city"];
	const [businesses, setBusinesses] = useState([])
	const [popProds, setPopProds] = useState([])
	useEffect(()=>{
		fetch(process.env.REACT_APP_BACKEND+"business/getByCity", {
			method: "POST", body: city["pinCode"],
			headers: {"content-type":"application/json"}
		}).then((res)=>res.json()).then((data)=>setBusinesses(data))
	},[city])
	useEffect(()=>{
		if(businesses[0] && businesses[0].city && businesses[0].city.pinCode && businesses[0].city.pinCode!==null){
			fetch(process.env.REACT_APP_BACKEND+"product/getByIds",{
				method: "POST",
				body: JSON.stringify(cityPop[businesses[0].city.pinCode]),
				headers: {"content-type":"application/json"}
			}).then((res)=>res.json()).then((data)=>setPopProds(data))
		}
	},[businesses])
	return (
		<div className='super-nonflex-container'>
			<div className="explore-city-title-wrapper">
				<div className="wrapper">
				<img className='explore-cityicon' src={`data:image/png;base64,${city.icon}`} alt="cityicon" />
				</div>
				<p className='explore-cityname'>{city["cityName"]}</p>
			</div>
			<p className="explore-citydesc">{city["description"]}</p>
			{
				popProds && popProds!==null && popProds.length!==0 &&
				<>
				<p className="vendor-head">Popular Products from {city["cityName"]}</p>
				<div className="vendor-container">
				{
					popProds.map((item)=>{
						return <ProductItem item={item}/>
					})
				}
				</div>				
				</>
			}
			<p className="vendor-head">Find your Favourite Vendor in {city["cityName"]}:</p>
			{
				businesses.length===0?
				<p className="no-vendor">No vendor in {city["cityName"]} at the moment.</p>
				:
				<div className="vendor-container">
				{
					businesses.map((item)=>{
						return <Link className="vendor" to="/exploreVendor" state={{vendor:item}}>
							<p className="vendor-name">{item["businessName"]}</p>
							<p className="vendor-owner">by <u>{item["businessOwnerName"]}</u></p>
							<div className="det-wrapper">
								<img className="det-icon" src={require("../images/icons/locationIcon.png")} alt="ph" />
								<p className="vendor-address">{item["address"]}</p>
							</div>
							<div className="det-wrapper">
								<img className="det-icon" src={require("../images/icons/phoneIcon.png")} alt="ph" />
								<p className="vendor-address">{item["contactNo"]}</p>
							</div>
						</Link>						
					})
				}
			</div>
			}			
		</div>
	)
}
