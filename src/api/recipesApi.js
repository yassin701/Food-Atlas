import axios from "axios";

const BASE_URL = "http://localhost:3002";

export const getRecipes = async () => {
  const res = await axios.get(`${BASE_URL}/recipes`);
  return res.data;
};

export const getRecipeById = async (id) => {
  const res = await axios.get(`${BASE_URL}/recipes/${id}`);
  return res.data;
};

export const addRecipe = async (recipe) => {
  const res = await axios.post(`${BASE_URL}/recipes`, recipe);
  return res.data;
};
