import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
	// useEffect(() => {
	// 	if(localStorage.getItem("vastrikaLoginToast")!==null){
	// 		toast.success("Login Successful!");
	// 		localStorage.removeItem("vastrikaLoginToast");
	// 	}
	// }, [])
	return (
		<div>
			<p>home page</p>
		</div>
	)
}
