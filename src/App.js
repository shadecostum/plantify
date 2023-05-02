// import Banner from "./Components/Banner/Banner";
// import Navbar from "./Components/Navbar/Navbar";
// import Rowcard from "./Components/Rowcard/Rowcard";
import Signup from './Components/Signup/Signup'
import { ImageUpload } from "./home";
// import { actions } from "./Components/Constents/url";
import {BrowserRouter as Rowder,Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Create from './Components/Create/Create';
import Loginnn from  './Loginnn';
import Sighnupp from './Sighnupp';


function App() {
  
  return  (
  
    <Rowder>
      <Routes>
     
      <Route path="/" element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<ImageUpload />}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/loginn' element={<Loginnn/>}/>
      <Route path='/Signupp' element={<Sighnupp/>}/>
     
      </Routes>
    
    </Rowder>
 
  )
}

export default App;
