# models.py
class Recipe:
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
            "ingredients": self.ingredients,
            "instructions": self.instructions,
            "estimatedPrice": self.estimated_price,
            "cookTime": self.cook_time,
            "additionalTips": self.additional_tips,
            "labels": self.labels,
        }