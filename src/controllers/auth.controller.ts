import { Router } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken";
import Url from "../models/Url";
import View from "../models/View";
import bcrypt from 'bcrypt';

const router: Router = Router();

// POST /api/auth/register
// Create user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ email, hash });
    await User.create({ email, hash });
    res.json({ success: true, data: user }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

// POST /api/auth/sign-in
// Assign JWT token and return user data
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for user email and password
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ success: false, message: "Wrong email or password" }).status(400);
    }
    const authSuccess = await bcrypt.compare(password, user.hash);
    if (!authSuccess) {
        return res.json({ success: false, message: "Wrong email or password" }).status(400);
    }

    // Assign JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.json({ success: false, message: "JWT_SECRET not set" }).status(400);
    }

    const token = jwt.sign({ id: user._id }, jwtSecret);
    // Find user in database
    res.json({ success: true, data: { token, user } }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

// TODO: move to different controller
// GET /api/auth/urls
// Get urls created by current logged in user
router.get("/urls", verifyToken, async (req, res) => {
  try {
    // Find user related urls
    const urls = await Url.find({ user_id: req.user.id });
    // Find urls related views
    const urlsWithViews = [];
    for (const url of urls) {
      const viewsCount = await View.find({ url_id: url._id }).count();
      urlsWithViews.push({ ...url.toObject(), views: viewsCount })
    }
    res.json({ success: true, data: urlsWithViews }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

export default router;