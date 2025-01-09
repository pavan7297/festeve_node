// routes/festivalRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Festival = require("../models/Festival");
const Purohit = require("../models/purohit");
const Product = require("../models/Product");
const addcart = require("../models/addcart");
const userSchema = require("../models/userSchema");

// Route to get today's festival
// router.get('/today', festivalController.getTodayFestival);

// Route to add a new festival
router.post("/add", async (req, res) => {
  const { date, name, shortdescription, description } = req.body;
  console.log("Received data:", req.body); // Log incoming data
  try {
    // Validate input data
    if (!date || !name || !shortdescription || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newFestival = new Festival({
      date,
      name,
      shortdescription,
      description,
    });
    await newFestival.save();
    res
      .status(201)
      .json({ message: "Festival added successfully", festival: newFestival });
  } catch (error) {
    console.error("Error adding festival:", error);
    res
      .status(500)
      .json({ error: "Error adding festival data", details: error.message });
  }
});

// Route to update an existing festival
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { date, name, shortdescription, description } = req.body;
  console.log("Received data for update:", req.body); // Log incoming data

  try {
    // Validate input data
    if (!date || !name || !shortdescription || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the festival by ID and update it
    const updatedFestival = await Festival.findByIdAndUpdate(
      id,
      { date, name, shortdescription, description },
      { new: true } // Return the updated document
    );

    if (!updatedFestival) {
      return res.status(404).json({ error: "Festival not found" });
    }

    res
      .status(200)
      .json({
        message: "Festival updated successfully",
        festival: updatedFestival,
      });
  } catch (error) {
    console.error("Error updating festival:", error);
    res
      .status(500)
      .json({ error: "Error updating festival data", details: error.message });
  }
});

// Route to get festivals by date
router.get("/date/:date", async (req, res) => {
  const { date } = req.params; // Extract date from request parameters
  try {
    // Query for festivals on the provided date
    let festivals = await Festival.find({ date }).sort({ date: 1 });

    // If no festivals found for the given date
    if (festivals.length === 0) {
      // Find the next available festival after the provided date
      festivals = await Festival.find({ date: { $gt: date } }).sort({ date: 1 }).limit(1);

      // If still no festivals found, return an appropriate response
      if (festivals.length === 0) {
        return res.status(404).json({ message: "No festivals found for the given or upcoming dates." });
      }

      // Return the next available festival
      return res.status(200).json({
        message: "No festivals found for the given date. Here is the next available festival:",
        festival: festivals[0],
      });
    }

    // Return the festivals for the given date
    res.status(200).json(festivals);
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res
      .status(500)
      .json({ error: "Error fetching festival data", details: error.message });
  }
});


// Route to get all festivals
router.get("/purohit", async (req, res) => {
  try {
    const festivals = await Puro.find(); // Query the database for all festivals
    if (festivals.length === 0) {
      return res.status(404).json({ message: "No festivals found." });
    }
    res.status(200).json(festivals); // Return all festivals
  } catch (error) {
    console.error("Error fetching festivals:", error);
    res
      .status(500)
      .json({ error: "Error fetching festival data", details: error.message });
  }
});

// Create a new Purohit
router.post("/purohits", async (req, res) => {
  try {
    const newPurohit = new Purohit(req.body);
    await newPurohit.save();
    res
      .status(201)
      .json({ message: "Purohit created successfully", data: newPurohit });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating Purohit", details: error.message });
  }
});

// Read all Purohits
router.get("/purohits", async (req, res) => {
  try {
    const purohits = await Purohit.find();
    res.status(200).json(purohits);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching Purohits", details: error.message });
  }
});

// Read a single Purohit by ID
router.get("/purohits/:id", async (req, res) => {
  try {
    const purohit = await Purohit.findById(req.params.id);
    if (!purohit) {
      return res.status(404).json({ message: "Purohit not found" });
    }
    res.status(200).json(purohit);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching Purohit", details: error.message });
  }
});

// Update a Purohit by ID
router.put("/purohits/:id", async (req, res) => {
  try {
    const updatedPurohit = await Purohit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPurohit) {
      return res.status(404).json({ message: "Purohit not found" });
    }
    res
      .status(200)
      .json({ message: "Purohit updated successfully", data: updatedPurohit });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating Purohit", details: error.message });
  }
});

// Delete a Purohit by ID
router.delete("/purohits/:id", async (req, res) => {
  try {
    const deletedPurohit = await Purohit.findByIdAndDelete(req.params.id);
    if (!deletedPurohit) {
      return res.status(404).json({ message: "Purohit not found" });
    }
    res.status(200).json({ message: "Purohit deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting Purohit", details: error.message });
  }
});

/// Route to add a new product
router.post("/addproducts", async (req, res) => {
  const { category, collection, productname, sizes, price, vendor } = req.body;
  console.log("Received data:", req.body); // Log incoming data
  try {
    // Validate input data
    if (!category || !collection || !productname || !sizes || !price || !vendor) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newProduct = new Product({
      category,
      collection,
      productname,
      sizes,
      price,
      vendor,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ error: "Error adding product data", details: error.message });
  }
});


// Route to get products by category
router.get("/products/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category: category });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category." });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res
      .status(500)
      .json({ error: "Error fetching products", details: error.message });
  }
});


router.get('/getproducts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        responseCode: 404,
        message: 'Product not found.',
      });
    }

    res.status(200).json({
      responseCode: 200,
      message: 'Product retrieved successfully',
      product, // Include the product data
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      responseCode: 500,
      message: 'Error fetching product',
      details: error.message,
    });
  }
});

/// Route to add a new product
router.post("/addcart", async (req, res) => {
  const { productId, addquantity} = req.body;
  console.log("Received data:", req.body); // Log incoming data
  try {
    // Validate input data
    if (!productId || !addquantity ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newaddcart = new addcart({
      productId,
      addquantity
    });
    await newaddcart.save();
    res
      .status(201)
      .json({ message: "cart added successfully", addcart: addcart });
  } catch (error) {
    console.error("Error adding cart:", error);
    res
      .status(500)
      .json({ error: "Error adding cart data", details: error.message });
  }
});




router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      emailid,
      phonenumber,
      password,
      specialday,
      nameofspecialperson,
      dateoftheday,
      relation,
      whatcanweremindyou,
    } = req.body;
    console.log("req body::::::::", req.body);

    // Validate required fields
    if (
      !name ||
      !emailid ||
      !phonenumber ||
      !password ||
      !specialday ||
      !nameofspecialperson ||
      !dateoftheday ||
      !relation ||
      !whatcanweremindyou
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ emailid });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userSchema({
      name,
      emailid,
      phonenumber,
      password: hashedPassword,
      specialday,
      nameofspecialperson,
      dateoftheday,
      relation,
      whatcanweremindyou,
    });

    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




// Login API
router.post("/login", async (req, res) => {
  try {
    const { emailid, password } = req.body;

    // Validate required fields
    if (!emailid || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const userschema = await userSchema.findOne({ emailid });
    if (!userschema) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, userschema.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Login successful, return user id and status code
    res.status(200).json({
      message: "Login successful",
      userId: userschema._id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
