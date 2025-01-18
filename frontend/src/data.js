import D1 from "../src/components/Image/Pancakes.jpg";
import D2 from "../src/components/Image/Spaghetti Carbonara.jpg";
import D3 from "../src/components/Image/paneer butter masala.jpg";
import D4 from "../src/components/Image/samosa.jpg";
import D5 from "../src/components/Image/brownies.jpg";
import D6 from "../src/components/Image/khaman.jpg";

const recipesData = [
  {
    id: 1,
    title: "Delicious Pancakes",
    image: D1,
    ingredients: "Flour, Milk, Eggs, Baking Powder, Sugar, Salt, Butter",
    preparation:
      "1. Mix dry ingredients. 2. Add wet ingredients. 3. Cook on a hot griddle.",
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    image: D2,
    ingredients: "Spaghetti, Eggs, Parmesan Cheese, Pancetta, Black Pepper",
    preparation:
      "1. Cook spaghetti. 2. Mix eggs and cheese. 3. Combine with cooked spaghetti and pancetta.",
  },
  {
    id: 3,
    title: "Paneer Butter Masala",
    image: D3,
    ingredients: "Paneer, Butter, Tomato, Cream, Onion, Garlic, Ginger, Spices",
    preparation:
      "1. Sauté onions, garlic, and ginger. 2. Add tomatoes and spices. 3. Stir in paneer and cream. 4. Simmer until well-cooked.",
  },
  {
    id: 4,
    title: "Samosa",
    image: D4,
    ingredients: "Potatoes, Peas, Spices, Flour, Oil",
    preparation:
      "1. Prepare filling with potatoes and peas. 2. Make dough and shape into triangles. 3. Fill and seal samosas. 4. Fry or bake until golden brown.",
  },
  {
    id: 5,
    title: "Brownies",
    image: D5,
    ingredients: "Flour, Cocoa Powder, Sugar, Butter, Eggs, Vanilla Extract",
    preparation:
      "1. Mix dry ingredients. 2. Combine with melted butter and eggs. 3. Bake until set and a toothpick comes out with moist crumbs.",
  },
  {
    id: 6,
    title: "Khaman",
    image: D6,
    ingredients:
      "Besan (Chickpea Flour), Yogurt, Lemon Juice, Mustard Seeds, Green Chilies, Turmeric, Baking Soda, Sugar",
    preparation:
      "1. Mix besan with yogurt, lemon juice, and spices. 2. Pour into a greased tray and steam for about 15-20 minutes. 3. Temper with mustard seeds and green chilies. 4. Cut into pieces and serve.",
  },
];

export default recipesData;
