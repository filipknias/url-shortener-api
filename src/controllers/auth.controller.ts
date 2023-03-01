import { Router, Request } from "express";
import User from "../models/User";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser } from '../types/models';

const router: Router = Router();

interface UserRequest extends Request {
  user: IUser;
}

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

router.post("/sign-in", passport.authenticate('local', { session: false }), async (req: any, res) => {
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.json({ success: false, message: "JWT_SECRET not set" }).status(400);
    }
    const token = jwt.sign({ id: req.user._id }, jwtSecret);
    res.json({ success: true, data: { token } }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

export default router;