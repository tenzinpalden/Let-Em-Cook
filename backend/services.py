import json
from models import *

# service to help manage recipes
class RecipeService:
    def __init__(self, data_file):
        self.data_file = data_file
        self.recipes = self.load_recipes()
        self.favorites = {}  # Use a dictionary to map user_id to a list of favorite recipe IDs

    # load all of the recipes from the json file and create recipe objects
    def load_recipes(self):
        try:
            with open(self.data_file, 'r') as file:
                recipes_data = json.load(file)
                recipes = []
                for data in recipes_data:
                    ingredients = [
                        Ingredient(
                            name=item['name'], 
                            quantity=item.get('quantity', ''),
                            price=item.get('price', 0)
                        ) for item in data.get("ingredients", [])
                    ]
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

    # saves a recipe to the json file
    def save_recipes(self):
        try:
            with open(self.data_file, 'w') as file:
                json.dump([recipe.to_dict() for recipe in self.recipes], file, indent=4)
        except IOError as e:
            print(f"Error saving recipes: {e}")

    # returns a list of dictionaries for each recipe objects
    def get_all_recipes(self):
        return [recipe.to_dict() for recipe in self.recipes]

    # gets a recipe by id
    def get_recipe_by_id(self, recipe_id):
        for recipe in self.recipes:
            if recipe.id == recipe_id:
                return recipe.to_dict()
        return None
    
    # adds a recipe to the json
    def add_recipe(self, data):
        ingredients = []
        # Split ingredients by comma and process each part
        raw_ingredients = data.get("ingredients", "").split(',')
        for i in range(0, len(raw_ingredients), 2):
            if i + 1 < len(raw_ingredients):
                ingredients.append({
                    "name": raw_ingredients[i + 1].strip(),
                    "quantity": raw_ingredients[i].strip(),
                    "price": None
                })
        
        new_recipe = Recipe(
            id=max(recipe.id for recipe in self.recipes) + 1 if self.recipes else 1,
            title=data["title"],
            image=data["image"],
            ingredients=[Ingredient(name=ing['name'], quantity=ing['quantity']) for ing in ingredients],
            instructions=data["instructions"],
            estimatedPrice=data["estimatedPrice"],
            cookTime=data["cookTime"],
            additionalTips=data["additionalTips"],
            labels=data["labels"]
        )
        self.recipes.append(new_recipe)
        self.save_recipes()
        return new_recipe.to_dict()

    # gets a favorite recipe
    def get_favorites(self, user_id):
        return self.favorites.get(user_id, [])

    # adds a recipe to favorite
    def add_favorite(self, user_id, recipe_id):
        if user_id not in self.favorites:
            self.favorites[user_id] = []
        if recipe_id not in self.favorites[user_id]:
            self.favorites[user_id].append(recipe_id)

    # removes a recipe from favorite
    def remove_favorite(self, user_id, recipe_id):
        if user_id in self.favorites and recipe_id in self.favorites[user_id]:
            self.favorites[user_id].remove(recipe_id)
