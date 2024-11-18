import json
from models import *

class RecipeService:
    def __init__(self, data_file):
        self.data_file = data_file
        self.recipes = self.load_recipes()
        self.favorites = {}  # Use a dictionary to map user_id to a list of favorite recipe IDs

    def load_recipes(self):
        try:
            with open(self.data_file, 'r') as file:
                recipes_data = json.load(file)
                recipes = []
                for data in recipes_data:
                    ingredients = [Ingredient(name=item) for item in data.get("ingredients", [])]
                    recipe = Recipe(
                        id=data["id"],
                        title=data["title"],
                        image=data["image"],
                        ingredients=ingredients,
                        instructions=data["instructions"],
                        estimatedPrice=data["estimatedPrice"],
                        cookTime=data["cookTime"],
                        additionalTips=data["additionalTips"],
                        labels=data["labels"]
                    )
                    recipes.append(recipe)
                return recipes
        except (FileNotFoundError, json.JSONDecodeError) as e:
            print(f"Error loading recipes: {e}")
            return []

    def get_all_recipes(self):
        return [recipe.to_dict() for recipe in self.recipes]

    def get_recipe_by_id(self, recipe_id):
        for recipe in self.recipes:
            if recipe.id == recipe_id:
                return recipe.to_dict()
        return None

    def get_favorites(self, user_id):
        return self.favorites.get(user_id, [])

    def add_favorite(self, user_id, recipe_id):
        if user_id not in self.favorites:
            self.favorites[user_id] = []
        if recipe_id not in self.favorites[user_id]:
            self.favorites[user_id].append(recipe_id)

    def remove_favorite(self, user_id, recipe_id):
        if user_id in self.favorites and recipe_id in self.favorites[user_id]:
            self.favorites[user_id].remove(recipe_id)