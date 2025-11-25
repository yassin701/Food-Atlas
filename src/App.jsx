import Details from "./pages/Details"; 

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
import { BrowserRouter , Routes , Route  } from 'react-router';
import Home from './pages/Home';
import Recipes from './pages/Recipes';


function App() {
  return (
  <BrowserRouter>
  <Routes>

       <Route path="/recipes/:id" element={<Details />} />
  </Routes>
  </BrowserRouter>
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/Recipes' element={<Recipes/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
