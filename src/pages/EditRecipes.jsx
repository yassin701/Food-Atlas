import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const { id } = useParams(); // id de la recette à éditer
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState(null); 

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Charger les données existantes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/recipes/${id}`);
        const data = res.data;
        setName(data.name);
        setCountry(data.country);
        setCategory(data.category);
        setDescription(data.description);
        setIngredients(data.ingredients);
        setPreview(data.image); // image actuelle en base64 ou URL
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    let newErrors = {};

    if (!name.trim()) { newErrors.name = "Le nom est obligatoire."; isValid = false; }
    if (!country.trim()) { newErrors.country = "Le pays est obligatoire."; isValid = false; }
    if (!category.trim()) { newErrors.category = "La catégorie est obligatoire."; isValid = false; }
    if (!description.trim()) { newErrors.description = "La description est obligatoire."; isValid = false; }
    if (!ingredients.trim()) { newErrors.ingredients = "Les ingrédients sont obligatoires."; isValid = false; }

    setErrors(newErrors);
    if (!isValid) return;

    const updateRecipe = async (imgData) => {
      const recipeData = {
        name,
        country,
        category,
        description,
        ingredients,
        image: imgData || preview, // si nouvelle image, sinon garder l'ancienne
      };
      try {
        await axios.put(`http://localhost:3002/recipes/${id}`, recipeData);
        setSuccess("Recette mise à jour !");
        setTimeout(() => navigate("/recipes"), 1000);
      } catch (err) {
        console.log(err);
      }
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateRecipe(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      updateRecipe(null);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Modifier la recette</h2>

        {/* Name */}
        <label className="font-medium">Nom</label>
        <input
          className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2 focus:ring-2 focus:ring-orange-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du recette"
        />
        {errors.name && <p className="text-red-500 text-sm mb-3">{errors.name}</p>}

        {/* Country */}
        <label className="font-medium">Pays</label>
        <input
          className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2 focus:ring-2 focus:ring-orange-400"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Pays d'origine"
        />
        {errors.country && <p className="text-red-500 text-sm mb-3">{errors.country}</p>}

        {/* Category */}
        <label className="font-medium">Catégorie</label>
        <input
          className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2 focus:ring-2 focus:ring-orange-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Ex: Dessert, Plat..."
        />
        {errors.category && <p className="text-red-500 text-sm mb-3">{errors.category}</p>}

        {/* Description */}
        <label className="font-medium">Description</label>
        <textarea
          className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2 focus:ring-2 focus:ring-orange-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez la recette"
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mb-3">{errors.description}</p>}

        {/* Ingredients */}
        <label className="font-medium">Ingrédients</label>
        <textarea
          className="w-full border-2 border-gray-300 p-2 rounded-lg mb-2 focus:ring-2 focus:ring-orange-400"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Liste des ingrédients"
        ></textarea>
        {errors.ingredients && <p className="text-red-500 text-sm mb-3">{errors.ingredients}</p>}

        {/* Image Upload */}
        <label className="font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          className="w-full border-2 border-gray-300 p-2 rounded-lg cursor-pointer mb-2 bg-gray-50"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {/* Preview */}
        {preview && <img src={preview} className="w-full h-40 object-cover rounded-lg shadow mb-3" />}

        {/* Success */}
        {success && <p className="text-green-600 font-medium text-center mb-4">{success}</p>}

        {/* Submit */}
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold">
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
