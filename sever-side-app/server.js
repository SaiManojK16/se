const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use('/uploads', express.static('uploads'));

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/api/calculate', (req, res) => {
  const { A, B } = req.body;
  const sum = parseFloat(A) + parseFloat(B);
  res.json({ sum });
});


// Connect to MongoDB
const mongoURI = 'mongodb://mongo:27017/SE-LAB';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'SE-LAB',
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error(err));

// Define item schema and model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  image: { type: String },
});
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
});


const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


// Registration route
app.post('/api/register', async (req, res) => {
  const { username, password, confirmPassword, firstName, lastName, email } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});


app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});


// Routes
app.post('/api/items/create', upload.single('image'), async (req, res) => {
  const { name, quantity } = req.body;
  let imageUrl;

  try {
    if (req.file) {
      imageUrl = `/${req.file.filename}`;
    }

    const newItem = new Item({ name, quantity, image: imageUrl });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating item' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, quantity }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating item' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting item' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
