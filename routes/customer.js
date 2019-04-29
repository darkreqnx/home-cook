const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const Customer = require("../models/Users");
const Menu = require("../models/menuSchema");
const Order = require("../models/orderSchema");

/// @route POST api/customer/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  // const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  Customer.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        address: req.body.address,
        mobile: req.body.mobile,
        type: req.body.type
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST customer/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  // const { errors, isValid } = validateLoginInput(req.body);
  // // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Customer.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          type: user.type
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// @route   POST /customer/menu/
// @desc    Create a menu item
// @access  Public
router.get("/menu/", async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.send({ menus });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/menu/:id
// @desc    Get a specific menu item
// @access  Public
router.get("/menu/:id", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    res.send({ menu });
  } catch (err) {
    res.status(404).send({ message: "Menu item not found!" });
  }
});

// @route   POST /api/menu/
// @desc    Create a menu item
// @access  Public
router.post("/menu/", async (req, res) => {
  try {
    const newMenu = await Menu.create({
      hkname: req.body.hkname,
      name: req.body.name,
      img: "",
      cost: req.body.cost,
      count: req.body.count
    });
    res.send({ newMenu });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   PUT /api/menu/:id
// @desc    Update a menu item
// @access  Public
router.put("/menu/:id", async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "The menu item was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/menu/:id
// @desc    Delete a menu item
// @access  Public
router.delete("/menu/:id", async (req, res) => {
  try {
    const removeMenu = await Menu.findByIdAndRemove(req.params.id);
    res.send({ message: "The menu item was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//for orderSchema

// @route   GET /api/order/
// @desc    Get all orders' details
// @access  Public
router.get("/order/", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send({ orders });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/order/:id
// @desc    Get a specific order's details
// @access  Public
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send({ order });
  } catch (err) {
    res.status(404).send({ message: "Order id not found!" });
  }
});

// @route   POST /api/order/
// @desc    Create an order
// @access  Public
router.post("/order/", async (req, res) => {
  try {
    const newOrder = await Order.create({
      cust_uname: req.body.cust_uname,
      hk_uname: req.body.hk_uname,
      del_uname: req.body.del_uname,
<<<<<<< HEAD
      food_details = req.body.food_details,
=======
      food_details: req.body.food_details,
>>>>>>> 12edabc5aeecaf32f1c813ae88abdf146556a3ed
      total: req.body.total,
      order_status: req.body.order_status
    });
    res.send({ newOrder });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   PUT /api/order/:id
// @desc    Update an order's details
// @access  Public
router.put("/order/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "The order's details were updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/order/:id
// @desc    Delete an order
// @access  Public
router.delete("/order/:id", async (req, res) => {
  try {
    const removeOrder = await Order.findByIdAndRemove(req.params.id);
    res.send({ message: "The order was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/delivery/
// @desc    Get all delivery personnel
// @access  Public
router.get("/delivery/", async (req, res) => {
  try {
    const deliveryDudes = await Customer.find({ type: "DELIVERY" });
    res.send({ deliveryDudes });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/delivery/:id
// @desc    Get a specific delivery personnel
// @access  Public
router.get("/delivery/:id", async (req, res) => {
  try {
    const deliveryDude = await Customer.findById(req.params.id);
    res.send({ deliveryDude });
  } catch (err) {
    res.status(404).send({ message: "Delivery personnel not found!" });
  }
});

// @route   PUT /api/delivery/:id
// @desc    Update a delivery personnel
// @access  Public
router.put("/delivery/:id", async (req, res) => {
  try {
    const updatedDeliveryDude = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ message: "The delivery personnel was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/delivery/:id
// @desc    Delete a delivery personnel
// @access  Public
router.delete("/delivery/:id", async (req, res) => {
  try {
    const removeDeliveryDude = await Customer.findByIdAndRemove(req.params.id);
    res.send({ message: "The delivery personnel was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//for hkSchema

// @route   GET /api/hk/
// @desc    Get all home kitchens
// @access  Public
router.get("/hk/", async (req, res) => {
  try {
    const hks = await Customer.find({ type: "HK" });
    res.send({ hks });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET /api/hk/:id
// @desc    Get a specific home kitchen
// @access  Public
router.get("/hk/:id", async (req, res) => {
  try {
    const hk = await Customer.findById(req.params.id);
    res.send({ hk });
  } catch (err) {
    res.status(404).send({ message: "Home kitchen not found!" });
  }
});

// @route   PUT /api/hk/:id
// @desc    Update a home kitchen
// @access  Public
router.put("/hk/:id", async (req, res) => {
  try {
    const updatedHK = await Customer.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "The home kitchen was updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/hk/:id
// @desc    Delete a home kitchen
// @access  Public
router.delete("/hk/:id", async (req, res) => {
  try {
    const removeHK = await Customer.findByIdAndRemove(req.params.id);
    res.send({ message: "The home kitchen was removed" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
