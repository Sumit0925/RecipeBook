import React, { useState, useEffect } from "react";
// import { Plus, ChefHat } from "lucide-react";
import Header from "@/components/Header";
import RecipeGrid from "@/components/RecipeGrid";
import RecipeForm from "@/components/RecipeForm";
import RecipeDetail from "@/components/RecipeDetail";
import EmptyState from "@/components/EmptyState";

const initialFormState = {
  name: "",
  ingredients: "",
  steps: "",
  image: "",
  cookTime: "",
  servings: "",
  category: "Main Course",
};

const sampleRecipes = [
  {
    id: 1,
    name: "Classic Chocolate Chip Cookies",
    ingredients: [
      "2 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips",
    ],
    steps:
      "1. Preheat oven to 375°F. 2. Mix dry ingredients in a bowl. 3. Cream butter and sugars, add eggs and vanilla. 4. Combine wet and dry ingredients, fold in chocolate chips. 5. Drop spoonfuls on baking sheet. 6. Bake for 9-11 minutes until golden brown.",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
    cookTime: "25 min",
    servings: "24 cookies",
    category: "Dessert",
  },
  {
    id: 2,
    name: "Mediterranean Pasta Salad",
    ingredients: [
      "1 lb pasta",
      "1 cup cherry tomatoes",
      "1/2 cup olives",
      "1/2 cup feta cheese",
      "1/4 cup red onion",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "2 tsp oregano",
      "Salt and pepper",
    ],
    steps:
      "1. Cook pasta according to package directions and cool. 2. Chop all vegetables and combine in large bowl. 3. Whisk together olive oil, lemon juice, and oregano. 4. Toss pasta with vegetables and dressing. 5. Add feta cheese and season with salt and pepper. 6. Chill for 1 hour before serving.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
    cookTime: "20 min",
    servings: "6 people",
    category: "Main Course",
  },
];

export default function RecipeBookApp() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // Load sample recipes
  useEffect(() => {
    setRecipes(sampleRecipes);
  }, []);

  // Validation
  const validateForm = (recipe) => {
    const newErrors = {};
    if (!recipe.name.trim() ) newErrors.name = "Recipe name is required";
    if (!recipe.ingredients.trim())
      newErrors.ingredients = "Ingredients are required";
    if (!recipe.steps.trim())
      newErrors.steps = "Preparation steps are required";
    return newErrors;
  };

  // Add a new recipe
  const handleAddRecipe = () => {
    const validationErrors = validateForm(newRecipe);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const recipe = {
      id: Date.now(),
      ...newRecipe,
      ingredients: newRecipe.ingredients
        .split("\n")
        .filter((ing) => ing.trim()),
      image:
        newRecipe.image ||
        "https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop",
    };
    setRecipes([...recipes, recipe]);
    setNewRecipe(initialFormState);
    setErrors({});
    setShowAddForm(false);
  };

  // Edit a recipe
  const handleEditRecipe = () => {
    const validationErrors = validateForm(editingRecipe);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const updatedRecipe = {
      ...editingRecipe,
      ingredients:
        typeof editingRecipe.ingredients === "string"
          ? editingRecipe.ingredients.split("\n").filter((ing) => ing.trim())
          : editingRecipe.ingredients,
    };
    setRecipes(
      recipes.map((r) => (r.id === editingRecipe.id ? updatedRecipe : r))
    );
    setEditingRecipe(null);
    setSelectedRecipe(updatedRecipe);
    setErrors({});
  };

  // Delete a recipe
  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    setSelectedRecipe(null);
    setEditingRecipe(null);
  };

  // Filtered recipes
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setShowAddForm={setShowAddForm}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* No recipes or empty state */}
        {filteredRecipes.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            recipes={recipes}
            onAddFirstRecipe={() => setShowAddForm(true)}
          />
        ) : (
          <RecipeGrid
            recipes={filteredRecipes}
            onRecipeClick={(r) => setSelectedRecipe(r)}
          />
        )}
      </div>

      {/* Modals */}
      {showAddForm && (
        <RecipeForm
          recipe={newRecipe}
          setRecipe={setNewRecipe}
          onSave={handleAddRecipe}
          onCancel={() => {
            setShowAddForm(false);
            setErrors({});
          }}
          errors={errors}
          title="Add New Recipe"
          editingRecipe={null}
        />
      )}

      {editingRecipe && (
        <RecipeForm
          recipe={editingRecipe}
          setRecipe={setEditingRecipe}
          onSave={handleEditRecipe}
          onCancel={() => {
            setEditingRecipe(null);
            setErrors({});
          }}
          errors={errors}
          title="Edit Recipe"
          editingRecipe={editingRecipe}
        />
      )}

      {selectedRecipe && !editingRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onEdit={() => {
            setEditingRecipe(selectedRecipe);
            setSelectedRecipe(null);
          }}
          onDelete={handleDeleteRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
