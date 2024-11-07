# services.py
import json
from models import Recipe

class RecipeService:
    def __init__(self, data_file):
        self.data_file = data_file
        self.recipes = self.load_recipes()

    def load_recipes(self):
        """Load recipes from the JSON file and return them as a list of Recipe objects."""
        try:
            with open(self.data_file, 'r') as file:
                recipes_data = json.load(file)
                return [Recipe(**data) for data in recipes_data]
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error loading recipes: {e}")
            return []

    def get_all_recipes(self):
        """Return all recipes as a list of dictionaries."""
        return [recipe.to_dict() for recipe in self.recipes]

    def get_recipe_by_id(self, recipe_id):
        """Return a single recipe by ID as a dictionary, or None if not found."""
        for recipe in self.recipes:
            if recipe.id == recipe_id:
                return recipe.to_dict()
        return None