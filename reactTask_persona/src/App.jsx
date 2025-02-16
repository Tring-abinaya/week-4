import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Home.jsx';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import Persona from './Persona.jsx';

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Signin' element={<Signin />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Persona' element={<Persona />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
