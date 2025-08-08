import React, { useState, useEffect } from 'react';
import { Search, Plus, X, Edit2, Trash2, Clock, Users, ChefHat } from 'lucide-react';

const RecipeBookApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Sample recipes to start with
  useEffect(() => {
    const sampleRecipes = [
      {
        id: 1,
        name: "Classic Chocolate Chip Cookies",
        ingredients: ["2 cups all-purpose flour", "1 tsp baking soda", "1 tsp salt", "1 cup butter", "3/4 cup granulated sugar", "3/4 cup brown sugar", "2 large eggs", "2 tsp vanilla extract", "2 cups chocolate chips"],
        steps: "1. Preheat oven to 375°F. 2. Mix dry ingredients in a bowl. 3. Cream butter and sugars, add eggs and vanilla. 4. Combine wet and dry ingredients, fold in chocolate chips. 5. Drop spoonfuls on baking sheet. 6. Bake for 9-11 minutes until golden brown.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
        cookTime: "25 min",
        servings: "24 cookies",
        category: "Dessert"
      },
      {
        id: 2,
        name: "Mediterranean Pasta Salad",
        ingredients: ["1 lb pasta", "1 cup cherry tomatoes", "1/2 cup olives", "1/2 cup feta cheese", "1/4 cup red onion", "1/4 cup olive oil", "2 tbsp lemon juice", "2 tsp oregano", "Salt and pepper"],
        steps: "1. Cook pasta according to package directions and cool. 2. Chop all vegetables and combine in large bowl. 3. Whisk together olive oil, lemon juice, and oregano. 4. Toss pasta with vegetables and dressing. 5. Add feta cheese and season with salt and pepper. 6. Chill for 1 hour before serving.",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
        cookTime: "20 min",
        servings: "6 people",
        category: "Main Course"
      }
    ];
    setRecipes(sampleRecipes);
  }, []);

  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    steps: '',
    image: '',
    cookTime: '',
    servings: '',
    category: 'Main Course'
  });

  const [errors, setErrors] = useState({});

  const validateForm = (recipe) => {
    const newErrors = {};
    if (!recipe.name.trim()) newErrors.name = 'Recipe name is required';
    if (!recipe.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!recipe.steps.trim()) newErrors.steps = 'Preparation steps are required';
    return newErrors;
  };

  const handleAddRecipe = () => {
    const validationErrors = validateForm(newRecipe);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const recipe = {
      id: Date.now(),
      ...newRecipe,
      ingredients: newRecipe.ingredients.split('\n').filter(ing => ing.trim()),
      image: newRecipe.image || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=400&h=300&fit=crop'
    };

    setRecipes([...recipes, recipe]);
    setNewRecipe({
      name: '',
      ingredients: '',
      steps: '',
      image: '',
      cookTime: '',
      servings: '',
      category: 'Main Course'
    });
    setErrors({});
    setShowAddForm(false);
  };

  const handleEditRecipe = () => {
    const validationErrors = validateForm(editingRecipe);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedRecipe = {
      ...editingRecipe,
      ingredients: typeof editingRecipe.ingredients === 'string' 
        ? editingRecipe.ingredients.split('\n').filter(ing => ing.trim())
        : editingRecipe.ingredients
    };

    setRecipes(recipes.map(recipe => 
      recipe.id === editingRecipe.id ? updatedRecipe : recipe
    ));
    setEditingRecipe(null);
    setSelectedRecipe(updatedRecipe);
    setErrors({});
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
    setSelectedRecipe(null);
    setEditingRecipe(null);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => 
      ing.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const RecipeCard = ({ recipe }) => (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={() => setSelectedRecipe(recipe)}
    >
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-700">
          {recipe.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{recipe.name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.cookTime || 'N/A'}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {recipe.servings || 'N/A'}
          </div>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">
          {recipe.ingredients.slice(0, 3).join(', ')}
          {recipe.ingredients.length > 3 && '...'}
        </p>
      </div>
    </div>
  );

  const RecipeForm = ({ recipe, onSave, onCancel, title }) => (
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipe Name *</label>
              <input
                type="text"
                value={recipe.name}
                onChange={(e) => {
                  if (editingRecipe) {
                    setEditingRecipe({...editingRecipe, name: e.target.value});
                  } else {
                    setNewRecipe({...newRecipe, name: e.target.value});
                  }
                  setErrors({...errors, name: ''});
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter recipe name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cook Time</label>
                <input
                  type="text"
                  value={recipe.cookTime}
                  onChange={(e) => {
                    if (editingRecipe) {
                      setEditingRecipe({...editingRecipe, cookTime: e.target.value});
                    } else {
                      setNewRecipe({...newRecipe, cookTime: e.target.value});
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30 min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servings</label>
                <input
                  type="text"
                  value={recipe.servings}
                  onChange={(e) => {
                    if (editingRecipe) {
                      setEditingRecipe({...editingRecipe, servings: e.target.value});
                    } else {
                      setNewRecipe({...newRecipe, servings: e.target.value});
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 4 people"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={recipe.category}
                  onChange={(e) => {
                    if (editingRecipe) {
                      setEditingRecipe({...editingRecipe, category: e.target.value});
                    } else {
                      setNewRecipe({...newRecipe, category: e.target.value});
                    }
                  }}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={recipe.image}
                onChange={(e) => {
                  if (editingRecipe) {
                    setEditingRecipe({...editingRecipe, image: e.target.value});
                  } else {
                    setNewRecipe({...newRecipe, image: e.target.value});
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients * (one per line)</label>
              <textarea
                value={typeof recipe.ingredients === 'string' ? recipe.ingredients : recipe.ingredients.join('\n')}
                onChange={(e) => {
                  if (editingRecipe) {
                    setEditingRecipe({...editingRecipe, ingredients: e.target.value});
                  } else {
                    setNewRecipe({...newRecipe, ingredients: e.target.value});
                  }
                  setErrors({...errors, ingredients: ''});
                }}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.ingredients ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="2 cups flour&#10;1 tsp salt&#10;3 eggs"
              />
              {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preparation Steps *</label>
              <textarea
                value={recipe.steps}
                onChange={(e) => {
                  if (editingRecipe) {
                    setEditingRecipe({...editingRecipe, steps: e.target.value});
                  } else {
                    setNewRecipe({...newRecipe, steps: e.target.value});
                  }
                  setErrors({...errors, steps: ''});
                }}
                rows={8}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.steps ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="1. Preheat oven to 350°F&#10;2. Mix ingredients in a bowl&#10;3. Bake for 25 minutes"
              />
              {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
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
              {editingRecipe ? 'Update Recipe' : 'Add Recipe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RecipeDetail = ({ recipe }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button 
            onClick={() => setSelectedRecipe(null)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
            </div>

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.name}</h1>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {recipe.category}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingRecipe(recipe);
                      setSelectedRecipe(null);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteRecipe(recipe.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{recipe.cookTime || 'N/A'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{recipe.servings || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <ChefHat className="w-5 h-5 mr-2" />
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Instructions</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{recipe.steps.split('\n')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <ChefHat className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-800">Recipe Book</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recipes, ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                />
              </div>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Recipe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredRecipes.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try adjusting your search terms or add a new recipe</p>
          </div>
        )}

        {filteredRecipes.length === 0 && !searchTerm && recipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No recipes yet</h3>
            <p className="text-gray-500 mb-6">Start building your recipe collection by adding your first recipe</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Recipe
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      {/* Modals */}
      {showAddForm && (
        <RecipeForm
          recipe={newRecipe}
          onSave={handleAddRecipe}
          onCancel={() => {
            setShowAddForm(false);
            setErrors({});
          }}
          title="Add New Recipe"
        />
      )}

      {editingRecipe && (
        <RecipeForm
          recipe={editingRecipe}
          onSave={handleEditRecipe}
          onCancel={() => {
            setEditingRecipe(null);
            setErrors({});
          }}
          title="Edit Recipe"
        />
      )}

      {selectedRecipe && !editingRecipe && (
        <RecipeDetail recipe={selectedRecipe} />
      )}
    </div>
  );
};

export default RecipeBookApp;