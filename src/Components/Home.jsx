import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ProductItem from './ProductItem'
import './Home.css'
export default function Home() {
	const [allproducts, setallproducts] = useState([])
	const[login, setlogin] = useState(null)
	useEffect(()=>{
		if(localStorage.getItem("vastrikaUser")!==null){
			setlogin(JSON.parse(localStorage.getItem("vastrikaUser")))
		}
		fetch(process.env.REACT_APP_BACKEND+"product/getAll",{
			headers:{"content-type":"application/json"},
			method: "GET"
		}).then((res)=>res.json()).then((data)=>setallproducts(data))
	},[])
	return (
		<div className='super-nonflex-container'>
			<div className="all-prod-container">
			{
				allproducts.map((item)=>{
					return <><ProductItem item={item}/></>
				})
			}
			</div>
		</div>
	)
}
