import { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import CustomerLogin from './Components/CustomerLogin';
import { ToastContainer, Bounce } from 'react-toastify';
import CustomerRegistration from './Components/CustomerRegistration';

function App() {
	const [login, setlogin] = useState(null);
	useEffect(() => {
		if(localStorage.getItem("logindata")!==null){
			setlogin(JSON.parse(localStorage.getItem("logindata")));
		}
	}, [])
	const router = createBrowserRouter([
		{
			path:'/', element: <><Navbar/><Home/><Footer/></>
		},
		{
			path:'/custLogin', element: <><Navbar/><CustomerLogin/><Footer/></>
		},
		{
			path:'custRegister', element: <><Navbar/><CustomerRegistration/><Footer/></>
		}
	])
	return (
		<div className="App">
			<RouterProvider router={router}/>
			<ToastContainer position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                        theme="light"
                        transition= {Bounce}/>
		</div>
	);
}

export default App;
