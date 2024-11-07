# services.py

class RecipeService:
    def __init__(self, data_file):
        self.data_file = data_file
        self.recipes = self.load_recipes()
        self.favorites = {}  # Use a dictionary to map user_id to a list of favorite recipe IDs

    def load_recipes(self):
        # Load recipes from JSON as before
        try:
            with open(self.data_file, 'r') as file:
                recipes_data = json.load(file)
                return [Recipe(**data) for data in recipes_data]
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

    # Favorite feature methods
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