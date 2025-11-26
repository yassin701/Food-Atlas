import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  const getCountryCode = (countryName) => {
    const codes = {
      "Morocco": "MA",
      "Mexico": "MX",
      "Italy": "IT",
      "Japan": "JP",
      "Thailand": "TH",
      "USA": "US",
      "Lebanon": "LB",
      "Spain": "ES",
      "India": "IN",
      "UK": "GB",
      "Turkey": "TR",
      "France": "FR",
      "Tunisia": "TN"
    };
    return codes[countryName] || "US";
  };

  useEffect(() => {
    fetch('http://localhost:3002/recipes')
      .then(res => res.json())
      .then(data => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setFeaturedRecipes(shuffled.slice(0, 4));
      })
      .catch(err => console.error("Error fetching recipes:", err));
  }, []);

  const reviews = [
    { name: "Ahmed El Mansouri", initials: "AE", bgColor: "bg-yellow-500", text: "Découvrir des recettes...", rating: 5 },
    { name: "Maria Rodriguez", initials: "MR", bgColor: "bg-green-400", text: "Una experiencia culinaria...", rating: 5 },
    { name: "Fatima Zahra", initials: "FZ", bgColor: "bg-orange-400", text: "En tant que passionnée...", rating: 5 },
    { name: "Giovanni Rossi", initials: "GR", bgColor: "bg-zinc-600", text: "Authentic Italian recipes...", rating: 5 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="hero flex items-center justify-center relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col justify-center text-center px-4 py-56 sm:p-0 max-w-md sm:max-w-3xl text-white">
          <h1 className="font-serif font-medium text-4xl sm:text-6xl mb-4">
            Discover World Cuisines from Your Kitchen
          </h1>
          <p className="mb-6 max-w-2xl mx-auto text-lg">
            Explore authentic recipes from Morocco, Italy, Mexico, and beyond.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              to="/recipes" 
              className="bg-yellow-500 font-medium px-6 py-3 text-white rounded-lg hover:bg-white hover:text-zinc-950 border-2 border-yellow-500 hover:border-zinc-950 transition-all duration-200"
            >
              Browse Recipes
            </Link>
            <Link 
              to="/contact" 
              className="bg-white font-medium px-6 py-3 text-zinc-950 rounded-lg border-2 border-white hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Discover Recipes Section */}
      <section className="py-16 px-8 sm:px-20 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl sm:text-5xl font-serif text-stone-750 mb-4">
            Discover Our Recipes
          </h2>
          <p className="text-center text-zinc-600 mb-12 max-w-3xl mx-auto">
            Journey through diverse culinary traditions...
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                <div className="p-6 flex flex-col gap-3 flex-grow">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col">
                      <h5 className="text-xl font-serif font-bold text-zinc-950 line-clamp-1">{recipe.name}</h5>
                      <span className="text-xs font-medium uppercase tracking-wider text-yellow-600">{recipe.category}</span>
                    </div>
                    <div className="shrink-0">
                      <img 
                        src={`https://flagsapi.com/${getCountryCode(recipe.country)}/flat/64.png`} 
                        alt={recipe.country}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-zinc-600 text-sm line-clamp-2 flex-grow mt-2">{recipe.description}</p>
                  
                  <div className="tt-4">
                    <Link 
                      to={`/recipes/${recipe.id}`} 
                      className="text-yellow-500 font-medium hover:text-yellow-600 flex items-center gap-1 group transition-colors"
                    >
                      <span>View Recipe</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-8 sm:px-20">
        {/* ...rest of reviews carousel... */}
      </section>
    </div>
  );
}
