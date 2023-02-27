import { Router } from "express";
import Url from "../models/Url";

const router: Router = Router();

router.get("/:short_url", async (req, res) => {
  try {
    const short_url = req.params.short_url;
    const url = await Url.findOne({ short_url });
    if (url === null) {
      return res.json({ success: false, message: `Url with short_url: ${short_url} not found` }).status(404);
    }
    res.redirect(`https://${url.long_url}`);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

export default router;