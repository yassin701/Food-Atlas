
export default function RecipesCard({ recipe }) {
  return (
    <div>
      <img src={recipe.image} alt={recipe.name} />
      <h2>🍽️ {recipe.name}</h2>
      <p>🌍 {recipe.country} — {recipe.category}</p>
      <p>📝 {recipe.description}</p>
      <h3>🧂 Ingrédients :</h3>
      <ul>
        {recipe.ingredients.map((ing, index) => (
          <li key={index}> • {ing}</li>
        ))}
      </ul>
      <h3>👨‍🍳 Étapes :</h3>
      <p>{recipe.steps}</p>
    </div>
  );
}
