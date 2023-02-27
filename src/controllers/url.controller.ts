import { Router, Request } from "express";
import Url from "../models/Url";
import View from "../models/View";
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
    const viewsCount = await View.find({ url_id: id }).count();
    res.json({ success: true, data: url, views: viewsCount }).status(200);
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
    const urlDocument: any = {
      long_url,
      short_url: shortid.generate()
    }
    if (expires_at) {
      const now = new Date();
      const expirationTime = new Date(expires_at);
      const timeDiff = expirationTime.getTime() - now.getTime();
      urlDocument.expires_at = new Date(now.getTime() + timeDiff);
    }
    const newUrl = new Url(urlDocument);
    const data = await newUrl.save();
    res.json({ success: true, data }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

export default router;