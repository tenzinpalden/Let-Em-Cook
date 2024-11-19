from abc import ABC, abstractmethod

class RecipeInterface(ABC):
    @abstractmethod
    def to_dict(self):
        pass

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

class Ingredient:
    def __init__(self, name, quantity=None, price=None):
        self.name = name
        self.quantity = quantity
        self.price = price

    def to_dict(self):
        return {
            "name": self.name,
            "quantity": self.quantity,
            "price": self.price
        }

class Favorite(Recipe):
    def __init__(self, user_id):
        self.user_id = user_id

    def to_dict(self):
        return {
            "user_id": self.user_id,
        }