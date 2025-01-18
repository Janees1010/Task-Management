import React from 'react'
import {Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AddTask from './pages/AddTask'
import EditTaskPage from './pages/EditTaskPage'
const App = () => {
  return (
     <>
      <Routes>
         <Route path='/' element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/add" element={<AddTask />} />
              <Route path='/edit/:id' element={<EditTaskPage />} />
         </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
     </Routes>
     </>
  )
}

export default App
