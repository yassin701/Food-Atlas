import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";          
import Recipes from "./pages/Recipes";    
import Details from "./pages/Details";
import AddRecipe from "./pages/AddRecipes";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/recipes" element={<Recipes />} /> 
        <Route path="/recipes/:id" element={<Details />} /> 
        <Route path="/admin/add" element={<AddRecipe />} />
        <Route path="/admin"  element={<Admin/>} />
    
      </Routes>
    </Router>
  );
}

export default App;
