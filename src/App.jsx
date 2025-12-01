import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";         
import Recipes from "./pages/Recipes";  
import Details from "./pages/Details";
import AddRecipe from "./pages/AddRecipes";
import Navbar from "./Components/Navbar";
import Contact from "./pages/Contact";
import EditRecipe from "./pages/EditRecipes";
import Admin from "./pages/Admin";
import DeleteRecipe from "./pages/DeleteRecipe";
import { Toaster } from "react-hot-toast";


function App() {
  return (

    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/recipes" element={<Recipes />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/recipes/:id" element={<Details />} /> 
        <Route path="/admin/add" element={<AddRecipe />} />
        <Route path="/admin/edit" element={<EditRecipe />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/delete/:id" element={<DeleteRecipe />} />
    
      </Routes>
    </Router>
  );
}

export default App;
