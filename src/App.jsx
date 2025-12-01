import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";         
import Recipes from "./pages/Recipes";  
import Details from "./pages/Details";
import AddRecipe from "./pages/AddRecipes";
import Navbar from "./Components/Navbar";
import Contact from "./pages/Contact";
import EditRecipe from "./pages/EditRecipes";
import Admin from "./pages/Admin"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/recipes" element={<Recipes />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/recipes/:id" element={<Details />} /> 
        <Route path="/admin/add" element={<AddRecipe />} />
        <Route path="/admin/edit/:id" element={<EditRecipe />} />
        <Route path="/admin" element={<Admin/>}/>

    
      </Routes>
    </Router>
  );
}

export default App;
