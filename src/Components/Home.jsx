import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ProductItem from './ProductItem'
import './Home.css'
import { Link } from 'react-router-dom'
export default function Home() {
	const [allproducts, setallproducts] = useState([])
	const[login, setlogin] = useState(null)
	const [allCity, setAllCity] = useState([])
	useEffect(()=>{
		if(localStorage.getItem("vastrikaUser")!==null){
			setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
		}
		fetch(process.env.REACT_APP_BACKEND+"product/getAll",{
			headers:{"content-type":"application/json"},
			method: "GET"
		}).then((res)=>res.json()).then((data)=>setallproducts(data))
		.then(()=>{
			fetch(process.env.REACT_APP_BACKEND+"city/getAll",{
				headers: {"content-type":"application/json"},
				method: "GET"
			}).then((res)=>res.json()).then((data)=>setAllCity(data))
		})
	},[])
	useEffect(()=>{
		if(allCity.length<=5){
			document.querySelector(".city-slide").style.animationPlayState = "paused";
			document.querySelector(".city-scroll").style.width = "100%";
			document.querySelector(".arrows").style.display = "none";
		}
	}, [allCity])
	//right scroll function
	const rightScroll = () => {
		document.querySelector(".city-scroll").scrollBy({left: 150, behavior: 'smooth'})
	}
	return (
		<div className='super-nonflex-container'>
			<p className="explore-heritage-msg">Explore your Heritage</p>
			<div className="city-container">
				<div className="city-scroll">
					<div className="city-slide">
						{	
							allCity.filter((city)=>{
								return city["pinCode"]!=="000000"
							}).map((city)=>{
								return <Link className='city-item' to="./exploreCity" state={{city: city}}>
									<img className='city-image'  src={`data:image/png;base64,${city.icon}`} alt="" />
									<p className="cityitem-name">{city["cityName"]}</p>
								</Link>
							})
						}
					</div>
					
					{
						allCity.length>5 &&
					
					<div className="city-slide">
						{	
							allCity.filter((city)=>{
								return city["pinCode"]!=="000000"
							}).map((city)=>{
								return <Link className='city-item' to="./exploreCity" state={{city: city}}>
									<img className='city-image' src={`data:image/png;base64,${city.icon}`} alt="city" />
									<p className="cityitem-name">{city["cityName"]}</p>
								</Link>
							})
						}
					</div>	
					}
				</div>
				<div className="arrow-wrap" onClick={rightScroll}>
					<img className='arrows' src={require("../images/icons/rightScoll.webp")} alt="left"/>
				</div>
			</div>
			<div className="all-prod-container">
			{
				allproducts.map((item, index)=>{
					return <><ProductItem item={item} key={index}/></>
				})
			}
			</div>
		</div>
	)
}
