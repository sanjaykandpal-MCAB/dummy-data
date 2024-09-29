const mongoose = require('mongoose');
const { Item } = require('./models'); // Assuming the schemas are in a 'models.js' file

// MongoDB Atlas connection string (replace with your own)
const mongoURI = 'mongodb+srv://sanjaykandpal:sanj_979@cluster01.q8p8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));

// Function to generate a random item
function generateRandomItem() {
  const categories = ['Fruit', 'Vegetable', 'Non-veg', 'Breads', 'Other'];
  const fruits = ['Apple', 'Banana', 'Orange', 'Strawberry', 'Pineapple'];
  const vegetables = ['Carrot', 'Broccoli', 'Spinach', 'Tomato', 'Cucumber'];
  const nonVeg = ['Chicken', 'Beef', 'Fish', 'Pork', 'Lamb'];
  const breads = ['White Bread', 'Whole Wheat', 'Sourdough', 'Baguette', 'Rye Bread'];
  const other = ['Milk', 'Cheese', 'Yogurt', 'Eggs', 'Butter'];

  const category = categories[Math.floor(Math.random() * categories.length)];
  let name;
  switch (category) {
    case 'Fruit':
      name = fruits[Math.floor(Math.random() * fruits.length)];
      break;
    case 'Vegetable':
      name = vegetables[Math.floor(Math.random() * vegetables.length)];
      break;
    case 'Non-veg':
      name = nonVeg[Math.floor(Math.random() * nonVeg.length)];
      break;
    case 'Breads':
      name = breads[Math.floor(Math.random() * breads.length)];
      break;
    default:
      name = other[Math.floor(Math.random() * other.length)];
  }

  // Generate a random image ID for Picsum Photos
  const imageId = Math.floor(Math.random() * 1000);

  return {
    name,
    description: `Fresh ${name} from local suppliers`,
    price: parseFloat((Math.random() * 20 + 0.99).toFixed(2)),
    stockQuantity: Math.floor(Math.random() * 100) + 10,
    category,
    imageUrl: `https://picsum.photos/id/${imageId}/200/200`
  };
}

// Function to generate and store random items
async function generateAndStoreItems(count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(generateRandomItem());
  }

  try {
    await Item.insertMany(items);
    console.log(`${count} items have been successfully added to the database.`);
  } catch (error) {
    console.error('Error inserting items:', error);
  }
}

// Generate and store 60 random items
generateAndStoreItems(60)
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
  });