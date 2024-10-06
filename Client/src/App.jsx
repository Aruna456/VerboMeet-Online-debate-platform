import React from "react";
import { BrowserRouter,Routes , Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Auth from "./pages/Auth.jsx"
import Profile from "./pages/Profile.jsx";
import Feed from "./pages/Feed.jsx";
const App = () => {
  return (
   <>
   <BrowserRouter>
    <Routes>
     <Route  path='/' element={<Home/>}/>
     <Route  path='/About' element={<About/>}/>
     <Route  path='/Contact' element={<Contact/>}/>
     <Route path='/Auth' element={<Auth/>}/>
     <Route path='/Profile' element={<Profile/>}/>
     <Route path='/Feed' element={<Feed/>}/>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App