from flask import Flask, jsonify, request
from flask_cors import CORS
from services import RecipeService
import os

app = Flask(__name__)
CORS(app)

# Initialize RecipeService with the path to the JSON file
DATA_FILE = os.path.join(os.path.dirname(__file__), 'recipes.json')
recipe_service = RecipeService(DATA_FILE)

@app.route('/recipes', methods=['GET'])
def get_recipes():
    """Endpoint to get all recipes."""
    recipes = recipe_service.get_all_recipes()
    return jsonify(recipes), 200

@app.route('/recipes', methods=['POST'])
def add_recipe():
    data = request.json
    new_recipe = recipe_service.add_recipe(data)
    return jsonify(new_recipe), 201

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """Endpoint to get a recipe by ID."""
    recipe = recipe_service.get_recipe_by_id(recipe_id)
    if recipe:
        return jsonify(recipe), 200
    else:
        return jsonify({"error": "Recipe not found"}), 404

@app.route('/favorites', methods=['GET'])
def get_favorites():
    """Get all favorite recipes for a specific user."""
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    favorite_ids = recipe_service.get_favorites(user_id)
    favorite_recipes = [recipe_service.get_recipe_by_id(recipe_id) for recipe_id in favorite_ids]
    return jsonify(favorite_recipes), 200

@app.route('/favorites', methods=['POST'])
def add_favorite():
    """Add a recipe to user's favorites."""
    data = request.get_json()
    user_id = data.get('user_id')
    recipe_id = data.get('recipe_id')

    if not user_id or not recipe_id:
        return jsonify({"error": "User ID and Recipe ID are required"}), 400

    recipe_service.add_favorite(user_id, recipe_id)
    return jsonify({"message": "Recipe added to favorites"}), 201

@app.route('/favorites/<int:recipe_id>', methods=['DELETE'])
def remove_favorite(recipe_id):
    """Remove a recipe from user's favorites."""
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    recipe_service.remove_favorite(user_id, recipe_id)
    return jsonify({"message": "Recipe removed from favorites"}), 200

if __name__ == '__main__':
    app.run(debug=True)