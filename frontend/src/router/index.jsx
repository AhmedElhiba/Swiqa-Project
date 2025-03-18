import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/Login.jsx'
import Home from '../pages/Home.jsx'
import Register from '../pages/Register.jsx'
 import Layout from '../layout/layout.jsx'
import NotFound from '../pages/NotFound.jsx';
import ClientDashboardLayout from '../layout/Client/ClientDashboardLayout.jsx';
import ClientDashboard from '../components/Client/ClientDashboard.jsx';
import GuestLayout from '../layout/GuestLayout.jsx';
import Products from '../pages/Products.jsx';
import Cart from '../pages/cart.jsx';
import Checkout from '../pages/Checkout.jsx';
export const LOGIN_ROUTE = '/login' 
export const CLIENT_DASHBOARD_ROUTE  = '/Client/dashboard'
export const HOME_ROUTE = '/'
export const REGISTER_ROUTE ='/register'
export const PRODUCTS_ROUTE ='/products'
export const CHECKOUT_ROUTE = '/checkout'
export const CART_ROUTE = '/cart'
export const router = createBrowserRouter([
    {
       element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: PRODUCTS_ROUTE,
          element: <Products/>
        },
        {
          path: '*',
          element: <NotFound/>
        },
        {
          path:CART_ROUTE,
          element: <Cart/>
        },
        {
          path:CHECKOUT_ROUTE,
          element: <Checkout/>
        }
      ]
    },
    {
      element: <GuestLayout showNavbar={false}/>,
      children: [
        {
          path: LOGIN_ROUTE,
          element: <Login/>
        },
        {
          path: REGISTER_ROUTE,
          element: <Register/>
        },
      ]
    },
    {
      element: <ClientDashboardLayout/>,
      children: [
        {
          path: CLIENT_DASHBOARD_ROUTE,
          element: <ClientDashboard/>
        },
      ]
    },
]
)