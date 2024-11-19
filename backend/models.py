from abc import ABC, abstractmethod

# recipe interface, declares to_dict fucntion
class RecipeInterface(ABC):
    @abstractmethod
    def to_dict(self):
        pass

# recipe class inherits recipe interface
class Recipe(RecipeInterface):
    def __init__(self, id, title, image, ingredients, instructions, estimatedPrice, cookTime, additionalTips, labels):
        self.id = id
        self.title = title
        self.image = image
        self.ingredients = ingredients
        self.instructions = instructions
        self.estimated_price = estimatedPrice  
        self.cook_time = cookTime              
        self.additional_tips = additionalTips  
        self.labels = labels

    # converts the recipe object into a dictionary with all of its variables saved in a dict
    def to_dict(self):
        """Convert the Recipe object to a dictionary."""
        return {
            "id": self.id,
            "title": self.title,
            "image": self.image,
            "ingredients": [ing.to_dict() for ing in self.ingredients],
            "instructions": self.instructions,
            "estimatedPrice": self.estimated_price,
            "cookTime": self.cook_time,
            "additionalTips": self.additional_tips,
            "labels": self.labels,
        }

# ingredient class used in the recpie objects
class Ingredient:
    def __init__(self, name, quantity=None, price=None):
        self.name = name
        self.quantity = quantity
        self.price = price

    # converts the ingredient object into a dictionary with all of its variables saved in a dict
    def to_dict(self):
        return {
            "name": self.name,
            "quantity": self.quantity,
            "price": self.price
        }

# favorite class inherits the recipe that is favorited
class Favorite(Recipe):
    def __init__(self, user_id):
        self.user_id = user_id

    # converts the favorite object into a dictionary with all of its variables saved in a dict
    def to_dict(self):
        return {
            "user_id": self.user_id,
        }