
import { RouterProvider } from 'react-router-dom'
import './App.css'
import {router} from './router/index.jsx'
import UserContext  from './context/ClientContext.jsx'

function App() {


  return (
    <>
    <UserContext>
    <RouterProvider router={router} />
    </UserContext>
    </>
  )
}

export default App;
