// import { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import CustomerLogin from './Components/CustomerLogin';
import { ToastContainer, Slide} from 'react-toastify';
import CustomerRegistration from './Components/CustomerRegistration';
import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css'
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import ExploreCity from './Components/ExploreCity';
import ExploreVendor from './Components/ExploreVendor';
import Bill from './Components/Bill';
import MyOrders from './Components/MyOrders';
import UpdateAddress from './Components/UpdateAddress';
import UpdatePhone from './Components/UpdatePhone';
function App() {
	// const [login, setlogin] = useState(null);
	// useEffect(() => {
	// 	if(localStorage.getItem("slelologindata")!==null){
	// 		setlogin(JSON.parse(localStorage.getItem("slelologindata")));
	// 	}
	// }, [])
	const router = createHashRouter([
		{
			path:'/', element: <><Navbar/><Home/><Footer/></>
		},
		{
			path:'/custLogin', element: <><Navbar/><CustomerLogin/><Footer/></>
		},
		{
			path:'/custRegister', element: <><Navbar/><CustomerRegistration/><Footer/></>
		},
		{
			path: '/productDetails', element: <><Navbar/><ProductDetails/><Footer/></>
		},
		{
			path: '/cart', element: <><Navbar/><Cart/></>
		},
		{
			path: '/exploreCity', element: <><Navbar/><ExploreCity/></>
		},
		{
			path: '/exploreVendor', element: <><Navbar/><ExploreVendor/></>
		},
		{
			path:'/bill', element: <><Navbar/><Bill/></>
		},
		{
			path:'/myOrders', element: <><Navbar/><MyOrders/><Footer/></>
		},
		{
			path:'/updateAdd', element: <><Navbar/><UpdateAddress/><Footer/></>
		},
		{
			path:'/updatePhn', element: <><Navbar/><UpdatePhone/><Footer/></>
		}
	])
	return (
		<div className="App">
			<RouterProvider router={router}/>
			<ToastContainer position="top-right"
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                        theme="light"
                        transition= {Slide}/>
		</div>
	);
}

export default App;
