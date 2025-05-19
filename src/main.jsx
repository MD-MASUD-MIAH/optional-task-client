import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './components/Root.jsx'
import Home from './components/Home.jsx'
import Adduser from './components/Adduser.jsx'
import Updateuser from './components/Updateuser.jsx'
import Alluser from './components/Alluser.jsx'


const router = createBrowserRouter([


  {path:'/',Component:Root,children:[


  {index:true , Component:Home},
  {path:'/adduser',Component:Adduser},
  {path:'/update/:id',
    
   loader:({params})=>fetch(`http://localhost:4000/user/${params.id}`),
    Component:Updateuser},
  {path:'/alluser',
    
    loader:()=>fetch('http://localhost:4000/user'),
    Component:Alluser}
  ]}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
