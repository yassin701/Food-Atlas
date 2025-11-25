import axios from "axios";

const API_URL = "http://localhost:3002/recipes";

export const getRecipes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getRecipeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const addRecipe = async (newRecipe) => {
    const response = await axios.post(API_URL, newRecipe);
    return response.data;
};
