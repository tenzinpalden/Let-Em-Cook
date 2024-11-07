# app.py
from flask import Flask, jsonify
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

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    """Endpoint to get a recipe by ID."""
    recipe = recipe_service.get_recipe_by_id(recipe_id)
    if recipe:
        return jsonify(recipe), 200
    else:
        return jsonify({"error": "Recipe not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)