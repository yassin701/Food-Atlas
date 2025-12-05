import { useEffect, useState } from "react";
import RecipeCard from "../Components/RecipeCard";
import axios from "axios";
import { motion } from "framer-motion";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [countryFilter, setCountryFilter] = useState("ALL");

  useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Erreur :", error));
  }, []);

  const filteredRecipes =
    countryFilter === "ALL"
      ? recipes
      : recipes.filter((recipe) => recipe.country === countryFilter);

  // Function to get a random delay for each card
  const getRandomDelay = () => Math.random() * 0.5; // random between 0 and 0.5 sec

  return (
    <div className="p-6">
      <div className="mb-6 mx-12 flex justify-between items-center">
        <select
          className="border border-zinc-200 p-2.5 rounded-lg bg-white shadow-sm text-zinc-600
          transition-colors duration-200 cursor-pointer"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        >
          <option value="ALL">All Countries</option>
          <option value="Morocco">Morocco</option>
          <option value="Italy">Italy</option>
          <option value="Spain">Spain</option>
          <option value="France">France</option>
          <option value="Turkey">Turkey</option>
          <option value="Mexico">Mexico</option>
          <option value="Japan">Japan</option>
          <option value="Thailand">Thailand</option>
          <option value="USA">USA</option>
          <option value="Lebanon">Lebanon</option>
          <option value="India">India</option>
          <option value="UK">UK</option>
          <option value="Tunisia">Tunisia</option>
        </select>
      </div>

      <div className="mb-6 mx-12 justify-between items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }} // animation can repeat
            transition={{ duration: 0.5, delay: getRandomDelay() }}
          >
            <RecipeCard recipe={recipe} isAdmin={false} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}