import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/Login.jsx'
import Home from '../pages/Home.jsx'
import Register from '../pages/Register.jsx'
import Layout from '../layout/layout.jsx'
import NotFound from '../pages/NotFound.jsx';
import StudentDashboardLayout from '../layout/Student/StudentDashboardLayout.jsx';
import StudentDashboard from '../components/Student/StudentDashboard.jsx';
import GuestLayout from '../layout/GuestLayout.jsx';

export const LOGIN_ROUTE = '/login' 
export const STUDENT_DASHBOARD_ROUTE  = '/student/dashboard'
export const HOME_ROUTE = '/'
export const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '*',
          element: <NotFound/>
        },
      ]
    },
    {
      element: <GuestLayout/>,
      children: [
        {
          path: LOGIN_ROUTE,
          element: <Login/>
        },
      ]
    },
    {
      element: <StudentDashboardLayout/>,
      children: [
        {
          path: STUDENT_DASHBOARD_ROUTE,
          element: <StudentDashboard/>
        },
      ]
    },
]
)