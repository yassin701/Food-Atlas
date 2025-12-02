import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Phone,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import videoBg from '../../public/Hero_Video_Generation_for_Food_Atlas.mp4'
// import db from '../../db.json'; // Un-comment if needed for fallback, but we are using fetch now

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

 
  // Helper to map country names to ISO 2-letter codes for flagsapi
  const getCountryCode = (countryName) => {
    const codes = {
      Morocco: "MA",
      Mexico: "MX",
      Italy: "IT",
      Japan: "JP",
      Thailand: "TH",
      USA: "US",
      Lebanon: "LB",
      Spain: "ES",
      India: "IN",
      UK: "GB",
      Turkey: "TR",
      France: "FR",
      Tunisia: "TN",
    };
    return codes[countryName] || "US"; // Default fallback
  };

  // Load and randomize recipes on mount
  useEffect(() => {
    // Replace 3001 with your actual JSON Server port
    fetch("http://localhost:3001/recipes")
      .then((res) => res.json())
      .then((data) => {
        // Shuffle and pick 4
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setFeaturedRecipes(shuffled.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching recipes:", err));
  }, []);

  const reviews = [
    {
      name: "Ahmed El Mansouri",
      initials: "AE",
      bgColor: "bg-yellow-500",
      text: "Découvrir des recettes du monde entier n'a jamais été aussi facile ! Les détails sont parfaits et les instructions claires. J'adore Food Atlas !",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      initials: "MR",
      bgColor: "bg-green-400",
      text: "Una experiencia culinaria increíble. Las recetas son auténticas y fáciles de seguir. He preparado varios platillos mexicanos e italianos con gran éxito.",
      rating: 5,
    },
    {
      name: "Fatima Zahra",
      initials: "FZ",
      bgColor: "bg-orange-400",
      text: "En tant que passionnée de cuisine marocaine, je suis ravie de trouver des recettes traditionnelles si bien documentées. Merci Food Atlas !",
      rating: 5,
    },
    {
      name: "Giovanni Rossi",
      initials: "GR",
      bgColor: "bg-zinc-600",
      text: "Authentic Italian recipes that remind me of my nonna's cooking! The ingredient lists are detailed and the steps are easy to follow. Bellissimo!",
      rating: 5,
    },
  ];

  // Carousel auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* The Overlay (Optional: makes text more readable) */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* The Video */}
        <video 
          src={videoBg} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* The Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-8 text-center">
          <h1 className="text-5xl sm:text-7xl font-serif font-bold mb-6">Welcome to Food Atlas</h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-2xl">Discover authentic recipes from around the world</p>
          <a 
            href="/recipes"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200"
          >
            Explore Recipes
          </a>
        </div>
      </section>

      {/* Discover Recipes Section (Updated) */}
      <section className="py-16 px-8 sm:px-20 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl sm:text-5xl font-serif text-stone-750 mb-4">
            Discover Our Recipes
          </h2>
          <p className="text-center text-zinc-600 mb-12 max-w-3xl mx-auto">
            Journey through diverse culinary traditions and discover authentic
            dishes from around the world
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Image Section - Flag removed from here */}
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>

                {/* Content Section */}
                <div className="p-6 flex flex-col gap-3 ">
                  {/* Header Row: Title & Flag */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col">
                      <h5 className="text-xl font-serif font-bold text-zinc-950 line-clamp-1">
                        {recipe.name}
                      </h5>
                      <span className="text-xs font-medium uppercase tracking-wider text-yellow-600">
                        {recipe.category}
                      </span>
                    </div>
                    {/* Flag in its own block without background */}
                    <div className="shrink-0">
                      <img
                        src={`https://flagsapi.com/${getCountryCode(
                          recipe.country
                        )}/flat/64.png`}
                        alt={recipe.country}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>

                  <p className="text-zinc-600 text-sm line-clamp-2 grow mt-2">
                    {recipe.description}
                  </p>

                  <div className="tt-4">
                    <a
                      href={`/recipes/${recipe.id}`}
                      className="text-yellow-500 font-medium hover:text-yellow-600 flex items-center gap-1 group transition-colors"
                    >
                      <span>View Recipe</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-8 sm:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl sm:text-5xl font-serif text-stone-750 mb-4">
            What Our Community Says
          </h2>
          <p className="text-center text-zinc-600 mb-12 max-w-2xl mx-auto">
            Real experiences from food enthusiasts worldwide
          </p>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div key={index} className="min-w-full px-4">
                    <div className="bg-white border rounded-xl p-8 shadow-sm max-w-3xl mx-auto">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-16 h-16 rounded-full ${review.bgColor} flex items-center justify-center text-white text-2xl font-bold`}
                        >
                          {review.initials}
                        </div>
                        <div>
                          <h4 className="text-xl font-medium text-zinc-950">
                            {review.name}
                          </h4>
                          <div className="flex gap-1 mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-zinc-700 text-lg italic">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-3 shadow-lg hover:bg-yellow-500 hover:text-white transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full p-3 shadow-lg hover:bg-yellow-500 hover:text-white transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index ? "bg-yellow-500" : "bg-zinc-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {
        <footer className="border-t border-zinc-950 px-8 sm:px-12">
          <div className="sm:flex justify-between sm:gap-8 py-8 sm:px-20">
            <div className="left max-w-md">
              <div className="text-3xl font-serif font-bold text-zinc-950 mb-4">
                Food Atlas
              </div>
              <p className="font-serif text-lg text-zinc-700">
                Bringing the world's flavors to your kitchen with authentic
                recipes and detailed instructions.
              </p>
            </div>
            <div className="right mt-8 flex gap-8 sm:gap-20">
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-medium">Pages</h1>
                <a
                  href="/"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Home</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="/recipes"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Recipes</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="/contact"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Contact</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <a
                  href="/admin"
                  className="hover:text-yellow-500 text-lg flex items-center gap-2 group underline"
                >
                  <span>Admin</span>
                  <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>
          <p className="text-center py-4 text-zinc-600 border-t border-zinc-200">
            © 2025 Food Atlas. All rights reserved.
          </p>
        </footer>
      }
    </div>
  );
}
