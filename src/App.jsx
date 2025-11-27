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
}

export default App;
