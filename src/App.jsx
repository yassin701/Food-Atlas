import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";          // ممكن تتركو فالبداية فارغ
import Recipes from "./pages/Recipes";    // ممكن زملائك يصاوبوها من بعد
import Details from "./pages/Details";
import AddRecipe from "./pages/AddRecipes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/recipes" element={<Recipes />} /> 
        <Route path="/recipes/:id" element={<Details />} /> 
         <Route path="/admin/add" element={<AddRecipe />} />
    
      </Routes>
    </Router>
  );
import Details from "./pages/Details"; 

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './Components/Navbar'

function App() {
import { BrowserRouter , Routes , Route  } from 'react-router';
import Home from './pages/Home';
import Recipes from './pages/Recipes';


function App() {
  return (
    
     <Router>
      <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
      </>
     </Router>
    
  )
}

export default App;
