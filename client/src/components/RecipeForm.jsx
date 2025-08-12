import React from "react";
import { X } from "lucide-react";

const RecipeForm = ({
  recipe,
  setRecipe,
  onSave,
  onCancel,
  errors,
  title,
  editingRecipe,
}) => {
  // Helpers for controlled components
  const handleChange = (field, value) => {
    setRecipe({
      ...recipe,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Name *
              </label>
              <input
                type="text"
                value={recipe.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter recipe name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            {/* Cook Time, Servings, Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cook Time
                </label>
                <input
                  type="text"
                  value={recipe.cookTime}
                  onChange={(e) => handleChange("cookTime", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30 min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servings
                </label>
                <input
                  type="text"
                  value={recipe.servings}
                  onChange={(e) => handleChange("servings", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4 people"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={recipe.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Appetizer">Appetizer</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
            </div>
            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={recipe.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {/* Ingredients */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients * (one per line)
              </label>
              <textarea
                value={
                  Array.isArray(recipe.ingredients)
                    ? recipe.ingredients.join("\n")
                    : recipe.ingredients
                }
                onChange={(e) => handleChange("ingredients", e.target.value.split("\n"))}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.ingredients ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="2 cups flour&#10;1 tsp salt&#10;3 eggs"
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients}
                </p>
              )}
            </div>
            {/* Steps */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Steps *
              </label>
              <textarea
                value={recipe.steps}
                onChange={(e) => handleChange("steps", e.target.value)}
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.steps ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="1. Preheat oven to 350°F&#10;2. Mix ingredients in a bowl&#10;3. Bake for 25 minutes"
              />
              {errors.steps && (
                <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
            <button
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingRecipe ? "Update Recipe" : "Add Recipe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
