import React from "react";
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Landingpage from "./pages/Landingpage.jsx";
const App = () => {
  return (
   <>
   <Router>
    <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/Landingpage" element={<Landingpage/>}/>
    </Routes>
   </Router>
   </>
  )
}

export default App