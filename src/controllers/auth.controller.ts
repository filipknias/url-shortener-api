import { Router, Request } from "express";
import User from "../models/User";
import passport from "passport";
import jwt from "jsonwebtoken";
import verifyToken from "../middlewares/verifyToken";
import verifyAuthorization from "../middlewares/verifyAuthorization";
import Url from "../models/Url";
import View from "../models/View";
import { IUrl } from "../types/models";

const router: Router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email });
    await User.register(user, password);
    res.json({ success: true, data: user }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

router.post("/sign-in", passport.authenticate('local', { session: false }), async (req, res) => {
  try {
    // Assign token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.json({ success: false, message: "JWT_SECRET not set" }).status(400);
    }
    const token = jwt.sign({ id: req.user.id }, jwtSecret);
    // Find user in database
    const user = await User.findById(req.user.id);
    res.json({ success: true, data: { token, user } }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

router.get("/urls", verifyToken, verifyAuthorization, async (req, res) => {
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