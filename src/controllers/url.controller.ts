import { Router, Request } from "express";
import Url from "../models/Url";
import { IUrl } from "../types/models";
import shortid from "shortid";

const router: Router = Router();

router.get("/", async (req, res) => {
  try {
    const urls = await Url.find();
    res.json({ success: true, data: urls }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const url = await Url.findOne({ _id: id });
    if (url === null) {
      return res.json({ success: false, message: `Url with id: ${id} not found` }).status(404);
    }
    res.json({ success: true, data: url }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

router.post("/", async (req: Request<{}, {}, IUrl>, res) => {
  try {
    const { long_url, expires_at } = req.body;
    // Database long_url lookup
    const longUrlPresent = await Url.findOne({ long_url });
    if (longUrlPresent) {
      return res.json({ success: true, data: longUrlPresent }).status(200);
    }
    // Create new url record
    const newUrl = new Url({ long_url, expires_at, short_url: `${shortid.generate()}` });
    const data = await newUrl.save();
    res.json({ success: true, data }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

export default router;