import { Router, Request, Response } from "express";
import Url from "../models/Url";
import View from "../models/View";
import { IUrl } from "../types/models";
import shortid from "shortid";
import verifyToken from '../middlewares/verifyToken';
import verifyAuthorization from '../middlewares/verifyAuthorization';

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

interface IUrlDocument {
  long_url: string;
  short_url: string;
  expires_at?: Date;
  user_id?: string;
}

router.post("/", verifyAuthorization, async (req: Request<{}, {}, IUrl>, res: Response) => {
  try {
    const { long_url, expires_at } = req.body;
    // Database long_url lookup
    if (!expires_at && !req.user) {
      const longUrlPresent = await Url.findOne({ 
        long_url,
        expires_at: { $exists: false }, 
        user_id: { $exists: false }
      });
      if (longUrlPresent) {
        return res.json({ success: true, data: longUrlPresent }).status(200);
      }
    }
    if (req.user && !expires_at) {
      const userUrlPresent = await Url.findOne({ 
        long_url,
        expires_at: { $exists: false }, 
        user_id: req.user.id,
      });
      if (userUrlPresent) {
        return res.json({ success: true, data: userUrlPresent }).status(200);
      }
    }
    // Create new url record
    const urlDocument: IUrlDocument = {
      long_url,
      short_url: shortid.generate()
    }
    if (expires_at) {
      const now = new Date();
      const expirationTime = new Date(expires_at);
      const timeDiff = expirationTime.getTime() - now.getTime();
      urlDocument.expires_at = new Date(now.getTime() + timeDiff);
    }
    if (req.user) {
      urlDocument.user_id = req.user.id;
    }
    const newUrl = new Url(urlDocument);
    const data = await newUrl.save();
    res.json({ success: true, data }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { long_url, expires_at } = req.body;
    const url = await Url.findByIdAndUpdate(req.params.id, { long_url, expires_at }, { new: true });
    res.json({ success: true, data: url }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ success: true }).status(200);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

export default router;